import React, { useState } from "react";
import "./Profile.css"; // Import CSS

const ProfilePage = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="app">
      {/* Toggle Button */}
      <div className="toggle-btn" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <h2>Bookify</h2>
        <ul>
          <li>
            <a href="/homepage">
              <i className="fas fa-home"></i> Home
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-user"></i> Profile
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-shopping-cart"></i> Orders
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-heart"></i> Wishlist
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-credit-card"></i> Saved Cards
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-cog"></i> Settings
            </a>
          </li>
          <li>
            <a href="/login">
              <i className="fas fa-sign-out-alt"></i> Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`main-content ${collapsed ? "collapsed-content" : ""}`}>
        <div className="profile-header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
            alt="Profile"
            className="profile-pic"
          />
          <div className="box">
            <h3>Orders</h3>
            <p>12</p>
          </div>
          <div className="box">
            <h3>Wishlist</h3>
            <p>5</p>
          </div>
          <div className="box">
            <h3>Saved Cards</h3>
            <p>2</p>
          </div>
        </div>

        <div className="username">John Doe</div>

        <div className="recent-orders">
          <h2>Recent Orders</h2>

          <div className="order-card">
            <img
              src="https://covers.openlibrary.org/b/id/8228691-L.jpg"
              alt="Book"
            />
            <div className="order-info">
              <h3>The Great Gatsby</h3>
              <p>Author: F. Scott Fitzgerald</p>
              <p>Status: Delivered</p>
            </div>
          </div>

          <div className="order-card">
            <img
              src="https://covers.openlibrary.org/b/id/10523331-L.jpg"
              alt="Book"
            />
            <div className="order-info">
              <h3>1984</h3>
              <p>Author: George Orwell</p>
              <p>Status: Shipped</p>
            </div>
          </div>

          <div className="order-card">
            <img
              src="https://covers.openlibrary.org/b/id/7222246-L.jpg"
              alt="Book"
            />
            <div className="order-info">
              <h3>To Kill a Mockingbird</h3>
              <p>Author: Harper Lee</p>
              <p>Status: Processing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
