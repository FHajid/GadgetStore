import React, { useState } from "react";
import axios from "axios";
import './css/Contact.css';
import Footer from "../Component/Footer";
import Logheader from "../Component/Header-login";

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        emailOrPhone: '',
        message: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8082/api/contact', formData);
            if (response.data.status === 'Success') {
                setSuccessMessage('Message sent successfully!');
                setErrorMessage('');
                setFormData({
                    name: '',
                    emailOrPhone: '',
                    message: '',
                });
            } else {
                setErrorMessage('Failed to send message.');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setErrorMessage('An error occurred while sending the message.');
            setSuccessMessage('');
        }
    };
    

    return (
        <div>
            <Logheader />
            <div className="main-contact">
                <div className="contact-container-left">
                    <div className="cardcont" style={{ border: "none" }}>
                        <h2>Our Contact</h2>
                        <p>We are available 24/7</p>
                        <p>With 24 Hour respond time</p>
                        <div className="Line" style={{ border: "1px solid grey" }}></div>
                        <h2>Our Location</h2>
                        <p>Jalan Mujur, Batam, 20234, Indonesia.</p>
                        <p>Email: Exclusive.ect@gmail.com</p>
                        <p>Phone: +62 892 2345 7123asdasd</p>
                    </div>
                </div>

                <div className="contact-container-right">
                    <h2>Send your Feedback</h2>

                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="name-input">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="email-input">
                            <input
                                type="text"
                                name="emailOrPhone"
                                placeholder="Your Email / Phone"
                                value={formData.emailOrPhone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="text-input">
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="ok-btn">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
