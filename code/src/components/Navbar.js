import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

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
        <a href="/" className="logo-text">Bookify</a>
      </div>

      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="#">Explore</a></li>
        <li><a href="#">Pricing</a></li>
      </ul>

      <div className="navbar-right">
        <i className="fas fa-search icon"></i>
        <a href="/login" className="btn-login">Log In</a>

        <div
          className={`dropdown ${dropdownOpen ? "show" : ""}`}
          ref={dropdownRef}
        >
          <i
            className="fas fa-user-circle icon"
            onClick={toggleDropdown}
          ></i>
          <div className="dropdown-content">
            <a href="/profile">View Profile</a>
            <a href="#">Manage Account</a>
            <a href="#">Dark Mode</a>
            <a href="#">Sound Effects</a>
            <a href="#">Badges</a>
            <a href="#">Give Feedback</a>
            <a href="#">Log Out</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
