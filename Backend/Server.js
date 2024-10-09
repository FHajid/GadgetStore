import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Getting __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const saltRounds = 8; // Bcrypt salt rounds

app.use(express.json());
app.use(cors({ 
    origin: 'http://localhost:3000', 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
}));

app.use(cookieParser());
dotenv.config(); 

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gadgetstore"
});

db.query('SELECT * FROM Categories', (err, results) => {
    if (err) {
        console.error('Error fetching categories:', err);
    } else {
        console.log('Categories:', results);
    }
});


// Log SQL errors in detail
db.on('error', (err) => {
    console.error('MySQL error:', err);
});

// Define the full path for the uploads
const UPLOADS_DIR = 'D:\\Projects\\Gadgetstore\\Web\\frontend\\public\\uploads\\'; // Use double backslashes


// Set up multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Save the file with a unique name
    }
});

const upload = multer({ storage: storage });
// Serve the uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Sign-up Route
app.post('/Sign-up', (req, res) => {
    const { name, email, password, confpassword } = req.body;

    // Ensure all fields are filled out
    if (!name || !email || !password || !confpassword) {
        return res.json({ status: "Error", message: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confpassword) {
        return res.json({ status: "Error", message: "Passwords do not match" });
    }

    // Hash the password before saving
    bcrypt.hash(password.toString(), saltRounds, (err, hashedPassword) => {
        if (err) return res.json({ status: "Error", message: "Error hashing password" });

        const sql = "INSERT INTO Login (Name, Email, Password) VALUES (?)";
        const values = [name, email, hashedPassword];

        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('SQL Error:', err);
                return res.json({ status: "Error", message: "Server error during signup" });
            }
            return res.json({ status: "Success", message: "Sign-up successful" });
        });
    });
});

// POST route to handle contact form submissions
app.post('/api/contact', (req, res) => {
    console.log('Incoming request:', req.body); // Debug log

    const { name, emailOrPhone, message } = req.body;

    // Validate form data
    if (!name || !emailOrPhone || !message) {
        return res.status(400).json({ status: 'Error', message: 'All fields are required.' });
    }

    // Insert the message into the database
    const query = 'INSERT INTO messages (name, email_or_phone, message) VALUES (?, ?, ?)';
    db.query(query, [name, emailOrPhone, message], (err, result) => {
        if (err) {
            console.error('Error inserting message:', err); // Log detailed error
            return res.status(500).json({ status: 'Error', message: 'Failed to submit message.' });
        }

        console.log('Message inserted successfully:', result); // Success log
        res.status(200).json({ status: 'Success', message: 'Message sent successfully.' });
    });
});



// API endpoint to get all messages
app.get('/api/messages', (req, res) => {
    const query = 'SELECT * FROM messages ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching messages:', err);
            return res.status(500).json({ status: 'Error', message: 'Failed to retrieve messages.' });
        }
        res.status(200).json(results);
    });
});

// API endpoint to delete a message
app.delete('/api/contact/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM messages WHERE Id = ?'; // Ensure the correct column name
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting message:', err);
            return res.status(500).json({ message: 'Error deleting message' });
        }
        res.status(200).json({ message: 'Message deleted successfully' });
    });
});


// Login Route
app.post('/Login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ status: "Error", message: "Email and password are required" });
    }

    const sql = "SELECT * FROM Login WHERE Email = ?";
    db.query(sql, [email], (err, data) => {
        if (err) {
            console.error("Database query error:", err);
            return res.json({ status: "Error", message: "Server error. Please try again later." });
        }

        if (data.length > 0) {
            bcrypt.compare(password.toString(), data[0].Password, (err, isMatch) => {
                if (err) {
                    console.error("Password comparison error:", err);
                    return res.json({ status: "Error", message: "Server error during password validation." });
                }

                if (isMatch) {
                    const userId = data[0].Login_Id;
                    const isAdmin = data[0].isAdmin;
                    const token = jwt.sign(
                        { userId: userId, isAdmin: isAdmin },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: '1h' }
                    );

                    res.cookie('token', token, { httpOnly: true });
                    return res.json({ status: "Success", message: "Login successful", isAdmin: isAdmin, Login_Id: userId });
                } else {
                    return res.json({ status: "Error", message: "Incorrect password" });
                }
            });
        } else {
            return res.json({ status: "Error", message: "Email not found" });
        }
    });
});



// Admin Verification Middleware
const isAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ status: "Error", message: "No token provided" });

    jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
        if (err) return res.status(401).json({ status: "Error", message: "Failed to authenticate token" });

        const sql = "SELECT isAdmin FROM Login WHERE id = ?";
        db.query(sql, [decoded.userId], (err, results) => {
            if (err) return res.status(500).json({ status: "Error", message: "Server error" });

            if (results.length > 0 && results[0].isAdmin) {
                next();
            } else {
                return res.status(403).json({ status: "Error", message: "Not authorized" });
            }
        });
    });
};

app.get('/check-auth', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ status: "error", message: "No token provided" });

    jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
        if (err) {
            console.error("JWT verification error:", err);  // Log JWT verification errors
            return res.status(401).json({ status: "error", message: "Failed to authenticate token" });
        }

        const sql = "SELECT Name, isAdmin FROM Login WHERE id = ?";
        db.query(sql, [decoded.userId], (err, results) => {
            if (err) {
                console.error("Database query error:", err);  // Log database query errors
                return res.status(500).json({ status: "error", message: "Server error" });
            }

            if (results.length > 0) {
                const user = results[0];
                res.json({ status: "success", name: user.Name, isAdmin: user.isAdmin });
            } else {
                res.status(403).json({ status: "error", message: "User not found" });
            }
        });
    });
});
// Profile
// Fetch User Data
app.get('/user/:Login_Id', (req, res) => {
    const { Login_Id } = req.params;
    const sql = `
        SELECT l.Name AS name, l.Email AS email, 
               p.address 
        FROM Login l 
        LEFT JOIN payment p ON l.Login_Id = p.Login_Id 
        WHERE l.Login_Id = ? 
        LIMIT 1`;
    
    db.query(sql, [Login_Id], (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).json({ status: "Error", message: "Server error fetching user data" });
        }
        
        if (results.length > 0) {
            return res.json({
                name: results[0].name,
                email: results[0].email,
                address: results[0].address || ''  // Handle null address case
            });
        } else {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }
    });
});


// Update User Data
// Endpoint to update user data
// Endpoint to update user data
app.put('/user/:Login_Id', (req, res) => {
    const { Login_Id } = req.params;
    const { name, email } = req.body; // Exclude address

    const sql = "UPDATE Login SET Name = ?, Email = ? WHERE Login_Id = ?";
    const values = [name, email, Login_Id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating user data:', err);
            return res.status(500).json({ status: "Error", message: "Server error updating user data" });
        }

        if (result.affectedRows > 0) {
            return res.json({ status: "Success", message: "User data updated successfully" });
        } else {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }
    });
});




// Endpoint to fetch user's orders
app.get('/orders/:Login_Id', (req, res) => {
    const { Login_Id } = req.params;
    const sql = `SELECT Payment_Id, Transaksi_Id, Price, orderStatus, address, phoneNumber, expiryDate 
                 FROM payment WHERE Login_Id = ?`;

    db.query(sql, [Login_Id], (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).json({ status: "Error", message: "Server error fetching orders" });
        }
        
        res.json(results);
    });
});


// Get Wishlist Route
app.get('/wishlist/:LoginId', (req, res) => {
    const { LoginId } = req.params;
    console.log('Fetching wishlist for LoginId:', LoginId); // Log the received parameter

    const sql = `
        SELECT w.wishlist_Id, p.*, w.size, w.color, w.quantity
        FROM Wishlist w
        JOIN product p ON w.Product_Id = p.Product_Id
        WHERE w.Login_Id = ?
    `;
    db.query(sql, [LoginId], (err, result) => {
        if (err) {
            console.error('SQL Error:', err);
            return res.status(500).json({ status: "Error", message: "Server error while retrieving wishlist" });
        }
        console.log('Retrieved wishlist:', result); // Log the retrieved data
        res.json(result);
    });
});

// Item Produk
app.get('/product/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM product WHERE Product_Id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).json({ status: "Error", message: "Server error while fetching product" });
        }
        res.json(result[0]);
    });
});

app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { Name, Price, quantity } = req.body;
    
    const query = `UPDATE Product SET Name = ?, Price = ?, quantity = ? WHERE Product_id = ?`;

    db.query(query, [Name, Price, quantity, id], (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            return res.status(500).json({ status: "Error", message: "Failed to update product" });
        }
        if (result.affectedRows > 0) {
            return res.json({ status: "Success", message: "Product updated successfully" });
        } else {
            return res.status(404).json({ status: "Error", message: "Product not found" });
        }
    });
});


app.post('/wishlist', (req, res) => {

    const { Login_Id, Product_Id, size, color, quantity, Name } = req.body;

        const missingFields = [];
        if (!Login_Id) missingFields.push("Login_Id");
        if (!Product_Id) missingFields.push("Product_Id");
        if (!size) missingFields.push("size");
        if (!color) missingFields.push("color");
        if (!quantity) missingFields.push("quantity");
        if (!Name) missingFields.push("Name");

        if (missingFields.length > 0) {
            return res.status(400).json({ status: "Error", message: `Missing required fields: ${missingFields.join(", ")}` });
        }


    const sql = `
        INSERT INTO wishlist (Login_Id, Product_Id, size, color, quantity, Name) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [Login_Id, Product_Id, size, color, quantity, Name];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('SQL Error:', err.message);
            return res.status(500).json({ status: "Error", message: "Server error during addition to wishlist", error: err.message });
        }
        return res.json({ status: "Success", message: "Item added to wishlist" });
    });
});



// Remove an item from the wishlist
app.delete('/wishlist/:wishlist_Id', (req, res) => {
    const { wishlist_Id } = req.params;
    console.log('Received wishlist_Id:', wishlist_Id); // Log the ID
    
    const sql = "DELETE FROM Wishlist WHERE wishlist_Id = ?";
    db.query(sql, [wishlist_Id], (err, result) => {
        if (err) {
            console.error('SQL Error:', err);
            return res.status(500).json({ status: "Error", message: "Server error during removal from wishlist" });
        }
        console.log('SQL Deletion Result:', result); // Log the SQL result
        return res.json({ status: "Success", message: "Item removed from wishlist" });
    });
});

// Procdut going to Cart
app.post('/cart', (req, res) => {
    const { Login_Id, Product_Id, Name, Price, size, color, quantity } = req.body;

    if (!Login_Id || !Product_Id || !Name || !Price || !size || !color || !quantity) {
        return res.status(400).json({ status: "Error", message: "Missing required fields" });
    }

    const sql = `
        INSERT INTO Cart (Login_Id, Product_Id, Name, Price, size, color, quantity)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + ?
    `;

    db.query(sql, [Login_Id, Product_Id, Name, Price, size, color, quantity, quantity], (err, result) => {
        if (err) {
            console.error('SQL Error:', err.message);
            return res.status(500).json({ status: "Error", message: "Server error during addition to cart", error: err.message });
        }
        return res.json({ status: "Success", message: "Item added to cart" });
    });
});


app.get('/cart/:Login_Id', (req, res) => {
    const { Login_Id } = req.params;
    const sql = `
        SELECT c.*, p.Image_url FROM Cart c
        JOIN product p ON c.Product_Id = p.Product_Id
        WHERE c.Login_Id = ?
    `;
    db.query(sql, [Login_Id], (err, result) => {
        if (err) {
            console.error('SQL Error:', err);
            return res.status(500).json({ status: "Error", message: "Server error while retrieving cart" });
        }
        res.json(result);
    });
});

// Update the quantity of a cart item
app.put('/cart/:Cart_Id', (req, res) => {
    const { Cart_Id } = req.params;
    const { quantity } = req.body;

    // Validate quantity input
    if (!quantity || quantity <= 0) {
        return res.status(400).json({ status: "Error", message: "Invalid quantity" });
    }

    // First, check the available stock for the product
    const sqlCheckStock = `SELECT p.quantity 
                            FROM Product p 
                            JOIN Cart c ON p.Product_Id = c.Product_Id 
                            WHERE c.Cart_Id = ?`;
    
    db.query(sqlCheckStock, [Cart_Id], (err, results) => {
        if (err) {
            console.error('Error checking stock:', err);
            return res.status(500).json({ status: "Error", message: "Server error while checking stock" });
        }

        if (results.length === 0) {
            return res.status(404).json({ status: "Error", message: "Cart item not found" });
        }

        const availableQuantity = results[0].quantity;

        // Check if requested quantity exceeds available stock
        if (quantity > availableQuantity) {
            return res.status(400).json({ status: "Error", message: "Requested quantity exceeds available stock" });
        }

        // If valid, proceed to update the cart
        const sqlUpdateCart = `UPDATE Cart SET quantity = ? WHERE Cart_Id = ?`;
        db.query(sqlUpdateCart, [quantity, Cart_Id], (err, result) => {
            if (err) {
                console.error('SQL Error:', err);
                return res.status(500).json({ status: "Error", message: "Server error while updating cart" });
            }

            if (result.affectedRows > 0) {
                return res.json({ status: "Success", message: "Cart updated successfully" });
            } else {
                return res.status(404).json({ status: "Error", message: "Cart item not found" });
            }
        });
    });
});


// Assuming you have set up your database connection above this code
app.delete('/cart/:Cart_Id', (req, res) => {
    const { Cart_Id } = req.params;

    console.log(`Attempting to delete cart item for Cart_Id: ${Cart_Id}`);  // Debugging log

    const query = `DELETE FROM cart WHERE Cart_Id = ?`;

    db.query(query, [Cart_Id], (err, result) => {
        if (err) {
            console.error('Error clearing cart:', err);  // Log any error
            return res.status(500).json({ status: 'Error', message: 'Failed to clear cart' });
        }

        if (result.affectedRows > 0) {
            console.log('Cart item deleted successfully in the database:', result);  // Success log
            res.json({ status: 'Success', message: 'Cart item deleted successfully' });
        } else {
            console.log('No cart items found for this Cart_Id:', Cart_Id);  // Handle empty result
            res.status(404).json({ status: 'Error', message: 'No cart item found for this Cart_Id' });
        }
    });
});

//CART login
app.delete('/cart/login/:Login_Id', (req, res) => {
    const { Login_Id } = req.params;
    console.log(`Attempting to delete all cart items for Login_Id: ${Login_Id}`);

    const query = `DELETE FROM cart WHERE Login_Id = ?`;

    db.query(query, [Login_Id], (err, result) => {
        if (err) {
            console.error('Error clearing cart for Login_Id:', err);
            return res.status(500).json({ status: 'Error', message: 'Failed to clear cart for Login_Id' });
        }

        if (result.affectedRows > 0) {
            console.log(`All cart items for Login_Id ${Login_Id} deleted successfully:`, result);
            res.json({ status: 'Success', message: `All cart items for Login_Id ${Login_Id} deleted successfully` });
        } else {
            console.log(`No cart items found for Login_Id ${Login_Id}`);
            res.status(404).json({ status: 'Error', message: `No cart items found for Login_Id: ${Login_Id}` });
        }
    });
});


// Payment endpoint
app.post('/payment', async (req, res) => {
    try {
        console.log("Payment info received:", req.body);

        const { loginId, cartId, cardNumber, expiryDate, cvv, cardHolderName, address, phoneNumber, amount } = req.body;

        const transaksiId = `TX-${Date.now()}`;

        if (!loginId || !cartId || !amount || !cardNumber) {
            return res.status(400).json({ status: 'Error', message: 'Missing required payment data' });
        }

        const query = `
            INSERT INTO payment (Login_Id, Cart_Id, Transaksi_Id, Price, expiryDate, Address, PhoneNumber, CardHolderName)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [loginId, cartId, transaksiId, amount, expiryDate, address, phoneNumber, cardHolderName];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Error processing payment:', err); // Log specific SQL errors
                return res.status(500).json({ status: 'Error', message: 'Payment failed at the payment insertion' });
            }

            console.log('Payment saved successfully with Transaksi_Id:', transaksiId);

            const deleteCartQuery = `DELETE FROM cart WHERE Login_Id = ?`;
            db.query(deleteCartQuery, [loginId], (err, result) => {
                if (err) {
                    console.error('Error clearing cart after payment:', err); // Log cart deletion error
                    return res.status(500).json({ status: 'Error', message: 'Payment succeeded, but cart clearing failed' });
                }

                res.json({ status: 'Success', message: 'Payment successful and cart cleared', Transaksi_Id: transaksiId });
            });
        });
    } catch (error) {
        console.error('Unexpected error during payment processing:', error); // Log any unexpected errors
        res.status(500).json({ status: 'Error', message: 'Unexpected error during payment' });
    }
});




// Admin Dashboard Route
app.get('/admin-dashboard', isAdmin, (req, res) => {
    res.send('Welcome to the Admin Dashboard');
});


// Categories
// Add this to your Express backend (server.js)
app.get('/api/categories/product-count', (req, res) => {
    const query = `
        SELECT c.Categories_Id as categoryId, c.Name as name, COUNT(p.Product_Id) as count, c.imageUrl
        FROM Categories c
        LEFT JOIN Product p ON c.Categories_Id = p.Categories_Id
        GROUP BY c.Categories_Id
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.json(result);
    });
});


// Add a new product to the database
app.post('/api/products', upload.fields([{ name: 'Image' }, { name: 'GLTFFile' }]), (req, res) => {
    const { Name, Description, Price, quantity, Categories_Id } = req.body;
    const imageUrl = req.files['Image'] ? `/uploads/${req.files['Image'][0].filename}` : null;
    const gLTFUrl = req.files['GLTFFile'] ? `/uploads/${req.files['GLTFFile'][0].filename}` : null;

    // Ensure all required fields are present
    if (!Name || !Description || !Price || !quantity || !Categories_Id || !imageUrl || !gLTFUrl) {
        return res.status(400).json({ status: 'Error', message: 'All fields are required' });
    }

    const query = `INSERT INTO Product (Name, Description, Price, quantity, Image_url, GLTF_URL, Categories_Id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [Name, Description, parseFloat(Price), parseInt(quantity), imageUrl, gLTFUrl, parseInt(Categories_Id)], (err, result) => {
        if (err) {
            console.error('SQL Error:', err);
            return res.status(500).json({ status: 'Error', message: 'Server error while adding product' });
        }
        res.json({ status: 'Success', message: 'Product added successfully' });
    });
});





// Add Category with Image Upload Route
// Serve the uploaded images
app.use('/uploads', express.static(UPLOADS_DIR));

// Add Category with Image Upload Route
app.post('/api/categories', upload.single('image'), (req, res) => {
    const { name, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Check for missing fields
    if (!name || !description) {
        return res.status(400).json({ status: 'Error', message: 'Missing required fields' });
    }

    // Log the file and form data
    console.log('Received data:', { name, description, imageUrl });

    const query = `INSERT INTO Categories (Name, Description, imageUrl) VALUES (?, ?, ?)`;
    
    // Execute the query
    db.query(query, [name, description, imageUrl], (err, result) => {
        if (err) {
            console.error('SQL Error:', err); // Log the SQL error in detail
            return res.status(500).json({ status: 'Error', message: 'Server error while adding category' });
        }
        res.json({ status: 'Success', message: 'Category added successfully' });
    });
});

// Fetch all payments
app.get('/api/payments', (req, res) => {
    const sql = `
        SELECT Payment_Id, Login_Id, Cart_Id, Transaksi_Id, Price, expiryDate, address, phoneNumber, CardHolderName 
        FROM payment
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching payments:', err);
            return res.status(500).json({ message: 'Server error while fetching payments' });
        }
        res.json(result);
    });
});

// Update order status
// Backend route for updating payment status
app.put('/api/payments/:paymentId/status', (req, res) => {
    const { paymentId } = req.params;
    const { status } = req.body;

    const query = `UPDATE payment SET orderStatus = ? WHERE Payment_Id = ?`;
    db.query(query, [status, paymentId], (err, result) => {
        if (err) {
            console.error('Error updating order status:', err);
            return res.status(500).json({ message: 'Server error updating order status' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json({ message: 'Order status updated successfully' });
    });
});



app.delete('/api/payments/:paymentId', (req, res) => {
    const { paymentId } = req.params;
    const query = 'DELETE FROM payment WHERE Payment_Id = ?';
    
    db.query(query, [paymentId], (err, result) => {
        if (err) {
            console.error('Error deleting payment:', err);
            return res.status(500).json({ message: 'Error deleting payment' });
        }
        res.json({ message: 'Payment deleted successfully' });
    });
});

// Assuming Express and MySQL
app.get('/api/users', (req, res) => {
    const query = 'SELECT Login_Id, Name, Email, isAdmin FROM Login';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.json(result);
    });
});

app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Login WHERE Login_Id = ?`;

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ message: 'Failed to delete user' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});


// Route to fetch all products
app.get('/api/products', (req, res) => {
    const query = `
        SELECT Product_id, Name, Description, Price, quantity, Image_url, Categories_Id
        FROM Product
    `;
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.json(result);
    });
});

app.get('/api/categories', (req, res) => {
    const query = 'SELECT * FROM Categories';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return res.status(500).json({ status: 'Error', message: 'Failed to fetch categories' });
        }
        res.json(results);
    });
});

// Add Category with Image Upload Route
app.post('/api/categories', upload.single('image'), (req, res) => {
    const { name, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Check for missing fields
    if (!name || !description) {
        return res.status(400).json({ status: 'Error', message: 'Missing required fields' });
    }

    // Insert new category into the database
    const query = `INSERT INTO Categories (Name, Description, imageUrl) VALUES (?, ?, ?)`;
    db.query(query, [name, description, imageUrl], (err, result) => {
        if (err) {
            console.error('SQL Error:', err);
            return res.status(500).json({ status: 'Error', message: 'Server error while adding category' });
        }
        res.json({ status: 'Success', message: 'Category added successfully' });
    });
});


app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Product WHERE Product_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).json({ status: 'Error', message: 'Failed to delete product' });
        }
        if (result.affectedRows > 0) {
            res.json({ status: 'Success', message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ status: 'Error', message: 'Product not found' });
        }
    });
});



// Logout Route
app.post('/Logout', (req, res) => {
    res.clearCookie('token'); // Clear the token cookie
    return res.json({ status: "Success", message: "Logout successful" });
});


const port = 8082;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
