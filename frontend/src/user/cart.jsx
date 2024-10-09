// Cart.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Component/Footer";
import Logheader from "../Component/Header-login";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/cart.css';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const Login_Id = localStorage.getItem('Login_Id');
                if (!Login_Id) {
                    console.error('Login_Id is not available');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`http://localhost:8082/cart/${Login_Id}`, { withCredentials: true });
                console.log('Cart data fetched:', response.data);

                if (response.data && Array.isArray(response.data)) {
                    setCart(response.data);
                    calculateTotal(response.data);
                } else {
                    console.error('Unexpected API response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching cart:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const calculateTotal = (cartItems) => {
        const totalAmount = cartItems.reduce((acc, item) => acc + item.Price * item.quantity, 0);
        setTotal(totalAmount);
    };

    const updateQuantity = async (cartItemId, quantity) => {
        try {
            const response = await axios.put(`http://localhost:8082/cart/${cartItemId}`, { quantity }, { withCredentials: true });
            if (response.data.status === "Success") {
                const updatedCart = cart.map(item => item.Cart_Id === cartItemId ? { ...item, quantity } : item);
                setCart(updatedCart);
                calculateTotal(updatedCart);
            } else {
                alert(response.data.message); // Display error message from backend
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            alert('Failed to update quantity.');
        }
    };
    


    const removeFromCart = async (cartItemId) => {
        try {
            const response = await axios.delete(`http://localhost:8082/cart/${cartItemId}`, { withCredentials: true });
            if (response.data.status === "Success") {
                console.log("Item removed successfully:", response.data);
                const updatedCart = cart.filter(item => item.Cart_Id !== cartItemId);
                setCart(updatedCart);
                calculateTotal(updatedCart);
            } else {
                alert('Failed to remove item from cart.');
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
            alert('Failed to remove item from cart.');
        }
    };

    const handleCheckout = () => {
        if (cart.length > 0) {
            navigate('/payment');
        } else {
            alert('Your cart is empty. Please add items before proceeding.');
        }
    };

    if (loading) {
        return <p>Loading your cart...</p>;
    }

    return (
        <div>
            <Logheader />
            <div className="cart-main">
                <h1>Your Shopping Cart</h1>
                <div className="cart-items row">
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <div className="col-md-3 mb-3" key={item.Cart_Id}>
                                <div className="card" style={{ width: '100%' }}>
                                    <img className="cart-card-img-top" src={item.Image_url || 'default-image.jpg'} alt={item.Name || 'No Title'} style={{ border: '1px solid grey', borderRadius: '15px', cursor: 'pointer' }} />
                                    <div className="card-body">
                                        <h3 className="card-title">{item.Name || 'No Title'}</h3>
                                        <p className="card-text">Price: Rp {item.Price}</p>
                                        <p className="card-text">Size: {item.size || 'N/A'}</p>
                                        <p className="card-text">Color: {item.color || 'N/A'}</p>
                                        <p className="card-text">Quantity: <input type="number" value={item.quantity} min="1" onChange={(e) => updateQuantity(item.Cart_Id, parseInt(e.target.value))} /></p>
                                        <button className="btn btn-danger" onClick={() => removeFromCart(item.Cart_Id)} style={{ backgroundColor: 'rgb(219, 68, 68)' }}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
                <div className="cart-total">
                    <h2>Total: Rp {total}</h2>
                    <button className="btn btn-primary" onClick={handleCheckout}>Proceed to Checkout</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
