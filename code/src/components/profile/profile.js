import React, { useState } from "react";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faUser,
  faShoppingCart,
  faHeart,
  faCreditCard,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="profile-page">
      {/* Toggle Button */}
      <div className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${!isSidebarOpen ? "collapsed" : ""}`}>
        <h2>Bookify</h2>
        <ul>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} /> Profile
            </Link>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faShoppingCart} /> Orders
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faHeart} /> Wishlist
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faCreditCard} /> Saved Cards
            </a>
          </li>
          <li>
            <Link to="/setting">
              <FontAwesomeIcon icon={faCog} /> Settings
            </Link>
          </li>
          <li>
            <Link to="/login">
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`main-content ${!isSidebarOpen ? "expanded" : ""}`}>
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
}

export default Profile;
