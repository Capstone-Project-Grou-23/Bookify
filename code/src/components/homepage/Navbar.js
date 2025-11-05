import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
        <li><Link to="/buy">Buy</Link></li> {/* ✅ Link to Buy page */}
        <li><Link to="/sell">Sell</Link></li> {/* ✅ Link to Sell page */}
      </ul>
      <div className="navbar-right">
        <FontAwesomeIcon icon={faSearch} className="icon" />
        <Link to="/login" className="btn-login">Log In</Link>

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
            <Link to="/settings">Settings</Link>
            <a href="#">Dark Mode</a>
            <a href="#">Sound Effects</a>
            <a href="#">Badges</a>
            <a href="#">Give Feedback</a>
            <Link to="/login">Log Out</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
