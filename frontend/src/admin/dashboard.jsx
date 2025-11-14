import React from "react";
import './css/dashboard.css'
import Sidebar from "../Component/sidebar";
import Topadmin from "../Component/Top-admin";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function AdminDashboard() {
    const navigate = useNavigate(); // Initialize the navigation hook

    const handleCardClick = (path) => {
        navigate(path); // Navigate to the clicked path
    };

    return (
        <div>
           <Topadmin/>
            <div className="main-dashboard">
                <Sidebar/>
                <div className="restof">
                    <h2> Dashboard </h2>

                    <div className="dashallcard">
                        <div className="card-dashboard" onClick={() => handleCardClick('/admin-Order')}>
                            <i className="bi bi-list-ul"></i>
                            <h3>Order</h3>
                        </div>
                        <div className="card-dashboard" onClick={() => handleCardClick('/admin-Product')}>
                            <i className="bi bi-tag"></i>
                            <h3>Products</h3>
                        </div>
                        <div className="card-dashboard" onClick={() => handleCardClick('/admin-categories')}>
                            <i className="bi bi-folder"></i>
                            <h3>Categories</h3>
                        </div>
                        <div className="card-dashboard" onClick={() => handleCardClick('/admin-user')}>
                            <i className="bi bi-people"></i>
                            <h3>Customer</h3>
                        </div>
                        <div className="card-dashboard" onClick={() => handleCardClick('/admin-Report')}>
                            <i className="bi bi-bar-chart-line-fill"></i>
                            <h3>Reports</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
