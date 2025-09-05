import React from 'react';

function Homepage() {
  return (
    <div className="hero-container">
      <h1>Welcome to Bookify</h1>
      <p>Your modern marketplace for books</p>
      <div className="hero-buttons">
        <button className="btn btn-green">BUY</button>
        <button className="btn btn-orange">SELL</button>
      </div>
    </div>
  );
}

export default Homepage;
