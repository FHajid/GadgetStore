import React, { useEffect, useState } from "react";
import Logheader from "../Component/Header-login";
import Footer from "../Component/Footer";
import './css/Profile.css';
import axios from "axios";

export default function ProfileUser() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        address: ''
    });
    const [orders, setOrders] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUserData, setUpdatedUserData] = useState({ ...userData });

    // State for password visibility
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const Login_Id = localStorage.getItem('Login_Id'); 
            if (Login_Id) {
                const response = await axios.get(`http://localhost:8082/user/${Login_Id}`); 
                setUserData(response.data);
                setUpdatedUserData(response.data); 
            }
        };

        const fetchOrders = async () => {
            const Login_Id = localStorage.getItem('Login_Id');
            if (Login_Id) {
                const response = await axios.get(`http://localhost:8082/orders/${Login_Id}`); 
                setOrders(response.data);
            }
        };

        fetchUserData();
        fetchOrders();
    }, []);

    const handleEditToggle = () => {
        setIsEditing(true); 
    };

    const handleViewOrdersToggle = () => {
        setIsEditing(false); 
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveChanges = async () => {
        const Login_Id = localStorage.getItem('Login_Id');
        if (Login_Id) {
            try {
                const response = await axios.put(`http://localhost:8082/user/${Login_Id}`, {
                    name: updatedUserData.name,
                    email: updatedUserData.email // Exclude address from this request
                }); 
                if (response.data.status === "Success") {
                    setUserData(updatedUserData);
                    setIsEditing(false); 
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.error('Error saving changes:', error);
                alert('Failed to save changes. Please try again.');
            }
        }   
    };

    return (
        <div>
            <Logheader />

            <div className="Profile-main">
                <h1>Welcome, {userData.name}!</h1>

                <div className="profile-toggle">
                    <button className={`toggle-btn ${!isEditing ? 'active' : ''}`} onClick={handleViewOrdersToggle}>View Orders</button>
                    <button className={`toggle-btn ${isEditing ? 'active' : ''}`} onClick={handleEditToggle}>Edit Profile</button>
                </div>

                {isEditing ? (
                    <div className="account-form">
                        <h2>Edit Profile</h2>
                        <label>Name</label>
                        <input type="text" name="name" value={updatedUserData.name} onChange={handleInputChange} />

                        <label>Email</label>
                        <input type="email" name="email" value={updatedUserData.email} onChange={handleInputChange} />

                        <label>Address</label>
                        <input type="text" name="address" value={updatedUserData.address} onChange={handleInputChange} />

                        <h2>Password Changes</h2>
                        <label>Current Password</label>
                        <div className="password-field">
                            <input type={passwordVisible ? "text" : "password"} />
                            <i 
                                className={`bi ${passwordVisible ? "bi-eye-slash" : "bi-eye"}`} 
                                onClick={() => setPasswordVisible(!passwordVisible)} 
                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                            ></i>
                        </div>

                        <label>New Password</label>
                        <div className="password-field">
                            <input type={newPasswordVisible ? "text" : "password"} />
                            <i 
                                className={`bi ${newPasswordVisible ? "bi-eye-slash" : "bi-eye"}`} 
                                onClick={() => setNewPasswordVisible(!newPasswordVisible)} 
                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                            ></i>
                        </div>

                        <label>Confirm New Password</label>
                        <div className="password-field">
                            <input type={confirmPasswordVisible ? "text" : "password"} />
                            <i 
                                className={`bi ${confirmPasswordVisible ? "bi-eye-slash" : "bi-eye"}`} 
                                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} 
                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                            ></i>
                        </div>

                        <button className="btn btn-danger" onClick={handleSaveChanges}>Save Changes</button>
                        <button className="btn" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                ) : (
                    <div className="order-list">
                        <h2>My Orders</h2>
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <div key={order.Payment_Id} className="order-item">
                                    <p>Transaction ID: {order.Transaksi_Id}</p>
                                    <p>Price: Rp {order.Price}</p>
                                    <p>Order Status: {order.orderStatus}</p>
                                    <p>Address: {order.address}</p>
                                    <p>Phone Number: {order.phoneNumber}</p>
                                    <p>Order Date: {new Date(order.expiryDate).toLocaleDateString()}</p>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <p>No orders found.</p>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
