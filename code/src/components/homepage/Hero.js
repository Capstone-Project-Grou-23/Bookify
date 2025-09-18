import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <h1>Welcome to Bookify</h1>
      <p>Your modern marketplace for books</p>
      <div className="buttons">
        <Link to="/buy" className="btn-green">BUY</Link>
        <Link to="/sell" className="btn-orange">SELL</Link>
      </div>
    </div>
  );
};

export default Hero;
