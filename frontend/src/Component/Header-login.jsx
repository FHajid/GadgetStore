import React, { useState } from "react";
import "./css/Header.css";
import DropdownUser from "./Dropdownprofile";
import { useNavigate } from 'react-router-dom';

function Logheader() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu state
  };

  return (
    <div>
      <div className='header' style={{ borderBottom: '1px solid grey', textAlign: 'center', margin: "10px 0px" }}>
        <div className='logo'>
          <h1>GadgetStore</h1>
        </div>

        {/* Burger Menu Icon */}
        <div className="burger-menu" onClick={toggleMenu}>
          &#9776; {/* Burger icon */}
        </div>

        {/* Links Section */}
        <div className={`links ${menuOpen ? 'open' : ''}`}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href='/Home'>Home</a></li>
            <li><a href='/Contact'>Contact</a></li>
            <li><a href='/About'>About</a></li>
          </ul>
        </div>

        <div className='search'>
          <form action="" className="search-bar">
            <label />
            <input type='text' placeholder="search" id='any' />
            <p className="bi bi-search fs-4"></p>
          </form>
        </div>

        <div className="icons">
          <div className="heart bi bi-heart fs-3" onClick={() => navigate('/wishlist')}></div>
          <div className="cart bi bi-cart fs-3" onClick={() => navigate('/Cart')}></div>
          <div className="user"><DropdownUser /></div>
        </div>
      </div>
    </div>
  );
}

export default Logheader;
