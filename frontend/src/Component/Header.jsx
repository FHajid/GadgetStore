import React, { useState } from "react";
import axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/Header.css';
import ProfileIcon from "./picture/profile-circle-white.png";
import LogoutIcon from "./picture/Icon-logout-white.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
        const response = await axios.post('http://localhost:8082/Logout', {}, { withCredentials: true });
        if (response.data.status === "Success") {
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
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>GadgetStore</h1>
        </div>

        <div className="burger-menu" onClick={toggleMenu}>
          <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
        </div>

        <nav className={`links ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="/Home">Home</a></li>
            <li><a href="/Contact">Contact</a></li>
            <li><a href="/About">About</a></li>
          </ul>
          {isMenuOpen && (
            <div className="dropdown-container-mobile">
              <form className="search-bar">
                <input type="text" placeholder="Search" />
                <button type="submit" className="bi bi-search"></button>
              </form>
              <ul className="dropdown-drop">
                <li className="dropdown-item" onClick={() => navigate('/Profile')}>
                  <img src={ProfileIcon} alt="Profile Icon" style={{ width: "30px" }} /> Profile
                </li>
                <li className="dropdown-item" onClick={handleLogout}>
                  <img src={LogoutIcon} alt="Logout Icon" style={{ width: "30px" }} /> Logout
                </li>
              </ul>
            </div>
          )}
        </nav>

        <div className="search desktop-only">
          <form className="search-bar">
            <input type="text" placeholder="Search" />
            <button type="submit" className="bi bi-search"></button>
          </form>
        </div>

        <div className="dropdown-container desktop-only" onClick={toggleDropdown}>
          <i className="bi bi-person-circle fs-3"></i>
          {isDropdownOpen && (
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
      </div>
    </header>
  );
}

export default Header;
