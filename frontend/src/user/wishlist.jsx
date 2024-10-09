import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../Component/Footer";
import Logheader from "../Component/Header-login";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/wishlist.css';
import '../Items/CSS/CardItem.css';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const Login_Id = localStorage.getItem('Login_Id'); 
     
                if (!Login_Id) {
                    console.error('Login_Id is not available');
                    return;
                }
     
                const response = await axios.get(`http://localhost:8082/wishlist/${Login_Id}`, { withCredentials: true });
     
                if (response.data && Array.isArray(response.data)) {
                    console.log('Fetched wishlist data:', response.data);  // Log to verify the data structure
                    setWishlist(response.data);
                } else {
                    console.error('Unexpected API response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };
     
        fetchWishlist(); 
    }, []);
    
    

    const removeFromWishlist = async (wishlist_Id) => {
        if (!wishlist_Id) {
            console.error('wishlist_Id is not defined');
            return;
        }
    
        try {
            const response = await axios.delete(`http://localhost:8082/wishlist/${wishlist_Id}`, { withCredentials: true });
            if (response.data.status === "Success") {
                setWishlist(prevWishlist => prevWishlist.filter(item => item.wishlist_Id !== wishlist_Id));
                console.log(`Successfully removed item with wishlist_Id: ${wishlist_Id}`);
            } else {
                alert('Failed to remove item from wishlist.');
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            alert('Failed to remove item from wishlist.');
        }
    };

    const moveToCart = async (item) => {
        if (!item) {
            console.error('Item is not defined');
            return;
        }
    
        if (!item.Product_id) {  // Use item.Product_id to match the actual property name
            console.error('Product_id is missing:', item);
            return;
        }
    
        const cartData = {
            Login_Id: localStorage.getItem('Login_Id'),
            Product_Id: item.Product_id,  // Corrected to match the actual property name
            Name: item.Name,
            Price: item.Price,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
        };
    
        console.log('Data being sent to cart:', cartData);
    
        try {
            const cartResponse = await axios.post('http://localhost:8082/cart', cartData, { withCredentials: true });
    
            if (cartResponse.data.status === "Success") {
                await removeFromWishlist(item.wishlist_Id);
                console.log(`Successfully moved item with wishlist_Id: ${item.wishlist_Id} to cart.`);
            } else {
                console.error('Failed to add item to cart:', cartResponse.data.message);
                alert('Failed to add item to cart.');
            }
        } catch (error) {
            console.error('Error moving item to cart:', error.response ? error.response.data : error.message);
            alert('Failed to move item to cart.');
        }
    };

    return (
        <div>
            <Logheader />
            <div className="wishlist-main">
            <div class="hot-sale">
                <div class="rectangle"></div>
                <h2>Wishlist</h2>
                </div>
                <div className="wishlist-items row">
                    {wishlist.length > 0 ? (
                        wishlist.map((item) => (
                            <div className="col-md-3 mb-3" key={item.wishlist_Id}>
                                <div className="card">
                                    <img
                                        className="card-img-top"
                                        src={item.Image_url || 'default-image.jpg'}
                                        alt={item.Name || 'No Title'}
                                    />
                                    <div className="card-body">
                                        <h3 className="card-title">{item.Name || 'No Title'}</h3>
                                        <p className="card-text">Size: {item.size || 'N/A'}</p>
                                        <p className="card-text">Color: {item.color || 'N/A'}</p>
                                        <p className="card-text">Quantity: {item.quantity || '0'}</p>
                                        
                                        {/* Buttons with full width */}
                                        <button
                                        className="btn custom-remove-btn" // Bootstrap and custom class
                                        onClick={() => removeFromWishlist(item.wishlist_Id)}>
                                        <i class="bi bi-trash"></i> Remove
                                    </button>
                                    <button
                                        className="btn custom-move-btn" // Bootstrap and custom class
                                        onClick={() => moveToCart(item)}>
                                        <i class="bi bi-cart"></i> Move to Cart
                                    </button>

                                    </div>
                                </div>
                            </div>

                        ))
                    ) : (
                        <p>Your wishlist is empty.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Wishlist;
