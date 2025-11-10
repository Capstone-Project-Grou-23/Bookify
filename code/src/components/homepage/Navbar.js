import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// 1. Add faShoppingCart
import { faSearch, faUserCircle, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import { useCart } from "../../context/CartContext"; // 2. Keep this import

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { itemCount } = useCart(); // 3. Keep getting the item count

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);
  
  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Optional: clear search bar after submit
    }
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img
          src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
          alt="logo"
        />
        <Link to="/">Bookify</Link>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        {/* You can add your Explore link back here if you want */}
        {/* <li><Link to="/explore">Explore</Link></li> */}
        <li><Link to="/buy">Buy</Link></li>
        <li><Link to="/sell">Sell</Link></li>
      </ul>
      <div className="navbar-right">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        <Link to="/login" className="btn-login">Log In</Link>

        {/* 4. Add the Cart Icon Link here */}
        <Link to="/cart" className="cart-icon">
          <FontAwesomeIcon icon={faShoppingCart} />
          {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </Link>

        <div
          className={`dropdown ${dropdownOpen ? "show" : ""}`}
          ref={dropdownRef}
        >
          <FontAwesomeIcon
            icon={faUserCircle}
            className="icon"
            onClick={toggleDropdown}
          />
          <div className="dropdown-content">
            <Link to="/profile">View Profile</Link>
            <Link to="/settings">Setting</Link> {/* Note: Your route is /settings, not /setting */}
            <button onClick={toggleTheme} className="dropdown-item">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
            <button className="dropdown-item">Badges</button>
            <a href="/feedback">Give Feedback</a>
            <Link to="/login">Log Out</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
