import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
// 1. Import FontAwesome and the new icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart, faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return (
    <div className="hero">
      <h1>Welcome to Bookify</h1>
      <p>Your modern marketplace for books</p>
      <div className="buttons">
        {/* 2. Update the BUY button */}
        <Link to="/buy" className="btn-green hero-btn">
          <FontAwesomeIcon icon={faHandHoldingHeart} className="hero-icon" />
          <span>BUY</span>
        </Link>
        
        {/* 3. Update the SELL button */}
        <Link to="/sell" className="btn-orange hero-btn">
          <FontAwesomeIcon icon={faHandHoldingUsd} className="hero-icon" />
          <span>SELL</span>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
