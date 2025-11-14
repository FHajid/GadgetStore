import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Payment.css";
import Logheader from "../Component/Header-login";
import Footer from "../Component/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Payment() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paymentData, setPaymentData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolderName: '',
        address: '',
        phoneNumber: '',
    });
    const [message, setMessage] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            const Login_Id = localStorage.getItem('Login_Id');

            try {
                const response = await axios.get(`http://localhost:8082/cart/${Login_Id}`, { withCredentials: true });
                if (response.data && Array.isArray(response.data)) {
                    setItems(response.data);
                    const total = response.data.reduce((sum, item) => sum + item.Price * item.quantity, 0);
                    setTotalAmount(total);
                } else {
                    console.error('Unexpected API response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({ ...paymentData, [name]: value });
    };

    const handleDateChange = (date) => {
        setPaymentData({ ...paymentData, expiryDate: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const { cardNumber, expiryDate, cvv, cardHolderName, address, phoneNumber } = paymentData;

        if (items.length === 0 || !items[0]?.Cart_Id) {
            setMessage('Your cart is empty or invalid. Please add items before proceeding.');
            return;
        }

        // Check product quantities against available stock
        const quantityCheckResults = await checkProductQuantities();
        if (quantityCheckResults.some(result => !result.available)) {
            const unavailableItems = quantityCheckResults.filter(result => !result.available);
            const itemNames = unavailableItems.map(item => item.name).join(', ');
            setMessage(`Insufficient stock for: ${itemNames}. Please adjust your cart.`);
            return;
        }

        const paymentInfo = {
            loginId: localStorage.getItem('Login_Id'),
            cartId: items[0]?.Cart_Id,  // Ensure Cart_Id is correct
            cardNumber,
            expiryDate: expiryDate ? expiryDate.toLocaleDateString('en-CA') : '',
            cvv,
            cardHolderName,
            address,
            phoneNumber,
            amount: totalAmount,
        };

        try {
            // Attempt to process the payment
            const response = await axios.post('http://localhost:8082/payment', paymentInfo, { withCredentials: true });

            // Check if payment was successful
            if (response.data.status === 'Success') {
                console.log('Payment successful with Transaksi_Id:', response.data.Transaksi_Id);

                // Now proceed to delete the cart items from the database after payment is successful
                await deleteCartItems(); // Ensure the function waits until all cart items are deleted
                
                // Clear the cart items in the frontend
                setItems([]);
                setMessage(`Payment successful! Your transaction ID is ${response.data.Transaksi_Id}.`);
            } else {
                setMessage('Payment failed. Please try again.');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setMessage('An error occurred during payment. Please try again later.');
        }
    };

    const checkProductQuantities = async () => {
        const results = [];
        for (const item of items) {
            try {
                const response = await axios.get(`http://localhost:8082/product/${item.Product_Id}`);
                const availableQuantity = response.data.quantity; // Assuming the product API returns the available quantity
                const isAvailable = item.quantity <= availableQuantity;
                results.push({ name: item.Name, available: isAvailable });
            } catch (error) {
                console.error('Error checking product quantity:', error);
                results.push({ name: item.Name, available: false }); // Default to false if there’s an error
            }
        }
        return results;
    };

    const deleteCartItems = async () => {
        // Delete each cart item sequentially
        for (const item of items) {
            try {
                await axios.delete(`http://localhost:8082/cart/${item.Cart_Id}`, { withCredentials: true });
                console.log(`Deleted Cart_Id: ${item.Cart_Id}`);
            } catch (error) {
                console.error(`Error deleting Cart_Id: ${item.Cart_Id}`, error);
                setMessage('Error removing cart items. Please contact support.');
                return;  // Stop further execution if cart deletion fails
            }
        }
    };
  
    return (
        <>
            <Logheader />
            <div className="payment-container">
                <div className="payment-form">
                    <h1>Payment</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={paymentData.cardNumber}
                                onChange={handleInputChange}
                                required
                                placeholder="1234 5678 9012 3456"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cardHolderName">Cardholder's Name</label>
                            <input
                                type="text"
                                id="cardHolderName"
                                name="cardHolderName"
                                value={paymentData.cardHolderName}
                                onChange={handleInputChange}
                                required
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expiryDate">Expiry Date</label>
                            <DatePicker
                                selected={paymentData.expiryDate}
                                onChange={handleDateChange}
                                required
                                dateFormat="MM/dd/yyyy"
                                placeholderText="MM/DD/YYYY"
                                showMonthYearPicker={false}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cvv">CVV</label>
                            <input
                                type="password"
                                id="cvv"
                                name="cvv"
                                value={paymentData.cvv}
                                onChange={handleInputChange}
                                required
                                placeholder="123"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={paymentData.address}
                                onChange={handleInputChange}
                                required
                                placeholder="123 Main St, City, Country"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={paymentData.phoneNumber}
                                onChange={handleInputChange}
                                required
                                placeholder="+1234567890"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Pay Now
                        </button>
                    </form>
                    {message && <p className="payment-message" style={{ color: 'red' }}>{message}</p>}
                </div>

                <div className="payment-items">
                    <h2>Your Items</h2>
                    {loading ? (
                        <p>Loading items...</p>
                    ) : (
                        <>
                            <ul>
                                {items.map(item => (
                                    <li key={item.Cart_Id} className="item">
                                        <img src={item.Image_url || 'default-image.jpg'} alt={item.Name} className="item-image" />
                                        <div>
                                            <strong>{item.Name}</strong> <br />
                                            Size: {item.size || 'N/A'} <br />
                                            Color: {item.color || 'N/A'} <br />
                                            Price: Rp {item.Price} x {item.quantity} = Rp {item.Price * item.quantity}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <h3>Total Amount: Rp {totalAmount}</h3>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Payment;
