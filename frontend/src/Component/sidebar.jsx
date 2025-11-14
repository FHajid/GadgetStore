import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './css/sidebar.css';

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Send logout request to the backend
            const response = await axios.post('http://localhost:8082/Logout', {}, { withCredentials: true });
            if (response.data.status === "Success") {
                // On successful logout, navigate to the login page or home
                navigate('/login');
            } else {
                alert("Logout failed: " + response.data.message);
            }
        } catch (err) {
            console.error('Logout request failed:', err);
            alert("An error occurred during logout. Please try again.");
        }
    };

    return (
        <div className="sidebar">
            <nav className="bar">
                <ul>
                    <li><Link to="/admin-dashboard"> <i className="bi bi-house-door fs-6"></i> Dashboard </Link></li>
                    <li><Link to="/admin-Order"> <i className="bi bi-list-ul fs-6"></i> Order</Link></li>
                    <li><Link to="/admin-Product"> <i className="bi bi-tag fs-6"></i> Product</Link></li>
                    <li><Link to="/admin-categories"> <i className="bi bi-folder fs-6"></i> Categories</Link></li>
                    <li><Link to="/admin-user"> <i className="bi bi-people fs-6"></i> Customer</Link></li>
                    <li><Link to="/admin-Report"> <i className="bi bi-bar-chart-line-fill fs-6"></i> Report</Link></li>

                    <hr />
                    <br />

                    <li><Link to="/reports" onClick={handleLogout}><i className="bi bi-box-arrow-left fs-6"></i> Logout</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
