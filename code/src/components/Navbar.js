import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <a href="/" style={{ color: "white", textDecoration: "none" }}>
          📚 Bookify Project
        </a>
      </div>
      <div className="menu">
        <a href="/">Home</a>
        <a href="#">Explore</a>
        <a href="#">Pricing</a>
      </div>
      <div className="auth">
        <a href="/login" className="btn-login">Log In</a>
        <a href="/signup" className="btn-join">Join for FREE</a>
      </div>
    </div>
  );
}

export default Navbar;
