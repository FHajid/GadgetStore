import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import "./css/dropdown.css";
import ProfileIcon from "./picture/profile-circle-white.png";
import LogoutIcon from "./picture/Icon-logout-white.png";
import { useNavigate } from "react-router-dom"; // For navigation after logout

function DropdownUser() {
    const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
    const navigate = useNavigate(); // Hook for navigation

    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Toggle the dropdown visibility
    };

    const handleLogout = async () => {
        try {
            // Send logout request to the backend
            const response = await axios.post('http://localhost:8082/Logout', {}, { withCredentials: true });
            if (response.data.status === "Success") {
                // On successful logout, navigate to the login page or home
                navigate('/login');
                // Optionally, you can also refresh the page or clear local storage/session storage if used.
            } else {
                alert("Logout failed: " + response.data.message);
            }
        } catch (err) {
            console.error('Logout request failed:', err);
            alert("An error occurred during logout. Please try again.");
        }
    };

    return (
        <div className="dropdown-container">
            <div className="dropdown-trigger" onClick={toggleDropdown}>
                <i className="bi bi-person-circle fs-3"></i>
            </div>
            {isOpen && (
                <ul className="dropdown-drop">
                    <li className="dropdown-item" onClick={() => navigate('/Profile')}>
                        <img src={ProfileIcon} alt="Profile Icon" style={{ width: "30px" }} /> Profile
                    </li>
                    <li className="dropdown-item" onClick={handleLogout}>
                        <img src={LogoutIcon} alt="Logout Icon" style={{ width: "30px" }} /> Logout
                    </li>
                </ul>
            )}
        </div>
    );
}

export default DropdownUser;
