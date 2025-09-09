import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <h1>Welcome to Bookify</h1>
      <p>Your modern marketplace for books</p>
      <div className="buttons">
        <button className="btn-green">BUY</button>
        <button className="btn-orange">SELL</button>
      </div>
    </div>
  );
};

export default Hero;
