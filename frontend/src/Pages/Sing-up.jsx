import React, { useState } from "react";
import './css/Sing-up.css';
import Footer from "../Component/Footer";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Logheader from "../Component/Header-login";

function Singup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confpassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);

    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:8082/Sign-up', values, { withCredentials: true });
            if (res.data.status === "Success") {
                navigate('/Login');
            } else {
                console.log('Signup failed:', res.data.message);
            }
        } catch (err) {
            console.log('Error during signup:', err);
        }
    };

    return (
        <div>
            <Logheader />
            <div className='signup-Main'>
                <div className='left-signup'>
                    <div>
                        <img src="../Picture/Item/store1.jpg" alt="store" />
                    </div>
                </div>
                <div className='right'>
                    <div className='account-detail'>
                        <h2>Make An Account</h2>
                        <p>Enter your details below</p>

                        <form onSubmit={handleSubmit}>
                            <div className="Name-input">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    onChange={e => setValues({ ...values, name: e.target.value })}
                                />
                            </div>
                            <div className="Email-input">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={e => setValues({ ...values, email: e.target.value })}
                                />
                            </div>
                            <div className="Password-input">
                                <input
                                    type={showPassword ? "text" : "password"} // Toggle input type
                                    name="password"
                                    placeholder="Password"
                                    onChange={e => setValues({ ...values, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                                    className="password-toggle"
                                >
                                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                </button>
                            </div>
                            
                            <div className="confirm-password-input">
                                <input
                                    type={showConfPassword ? "text" : "password"} // Toggle input type
                                    name="confpassword"
                                    placeholder="Confirm Password"
                                    onChange={e => setValues({ ...values, confpassword: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfPassword(!showConfPassword)} // Toggle visibility
                                    className="password-toggle"
                                >
                                    <i className={`bi ${showConfPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                </button>
                            </div>
                            <div className="create-account">
                                <button type="submit">Create</button>
                                <p>Already have an account? <a href="/Login">Log in</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Singup;
