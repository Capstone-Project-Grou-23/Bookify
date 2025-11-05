import React from 'react';
import './Explore.css'; // We'll create this CSS file next

const Explore = () => {
  return (
    <div className="explore-container">
      <div className="explore-content">
        <h1>Our Mission</h1>
        <p className="subtitle">
          Welcome to Bookify, your modern marketplace for new and used books.
        </p>
        
        <p>
          Our goal is simple: to create a vibrant community where book lovers can easily and safely <strong>buy</strong> and <strong>sell</strong> books. We believe that every book deserves a new life and that reading should be accessible and sustainable for everyone.
        </p>
        
        <h2>Why Bookify?</h2>
        <ul>
          <li><strong>Discover:</strong> Find everything from bestsellers and textbooks to rare gems and hidden treasures from sellers just like you.</li>
          <li><strong>Sell:</strong> Give your pre-loved books a new home. It's easy to list your books and connect with a community of readers.</li>
          <li><strong>Connect:</strong> We're more than just a marketplace; we're a community built around a shared passion for reading.</li>
        </ul>
        
        <p>
          Whether you're looking to declutter your shelves or find your next great read, Bookify is here to help you turn the page.
        </p>
      </div>
    </div>
  );
};

export default Explore;
