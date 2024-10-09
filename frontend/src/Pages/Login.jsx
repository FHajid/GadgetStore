import React, { useState } from "react";
import './css/Login.css';
import Footer from '../Component/Footer';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logheader from "../Component/Header-login";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [values, setValues] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:8082/Login', values, { withCredentials: true });
            if (res.data.status === "Success") {
                localStorage.setItem('Login_Id', res.data.Login_Id);
                navigate(res.data.isAdmin ? '/admin-dashboard' : '/Home');
            } else {
                alert("Login failed: " + res.data.message);
            }
        } catch (err) {
            console.error('Login request failed:', err);
            alert("An error occurred during login. Please try again.");
        }
    };


    return (
        <div>
            <Logheader />
            <div className='Login-Main'>
                <div className='left-login'>
                    <div>
                        <img src="/Picture/Item/store1.jpg" alt="store" />
                    </div>
                </div>

                <div className='right'>
                    <div className='account-detail'>
                        <h2>Log in to Account</h2>
                        <p>Enter your details below</p>

                        <form onSubmit={handleSubmit}>
                            <div className="Email-input">
                                <input 
                                    autoComplete="off" 
                                    type="text" 
                                    name="email" 
                                    placeholder="Email" 
                                    id="email"
                                    onChange={e => setValues({ ...values, email: e.target.value })}
                                    value={values.email}
                                />
                            </div>

                            <div className="Password-input">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    placeholder="Password"
                                    onChange={e => setValues({ ...values, password: e.target.value })}
                                    value={values.password}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)} 
                                    className="password-toggle"
                                >
                                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                </button>
                            </div>

                            <div className="create-account">
                                <button type="submit">Login</button> 
                                <p>Don't have an account? <a href="/Sign-up">Create an account</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />   
        </div>
    );
}

export default Login;
