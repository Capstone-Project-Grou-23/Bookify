import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="logo-text">
            <span>Bookify</span>
          </h2>
          <p>
            Bookify is your modern marketplace for buying and selling new and
            used books. Discover your next favorite read today!
          </p>
          <div className="contact">
            <span>
              <i className="fas fa-phone"></i> &nbsp; 123-456-7890
            </span>
            <span>
              <i className="fas fa-envelope"></i> &nbsp; info@bookify.com
            </span>
          </div>
          <div className="socials">
            <a href="https://facebook.com">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://twitter.com">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://instagram.com">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://linkedin.com">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>

        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section contact-form">
          <h2>Contact Us</h2>
          <form action="#" method="post">
            <input
              type="email"
              name="email"
              className="text-input contact-input"
              placeholder="Your email address..."
            />
            <textarea
              rows="4"
              name="message"
              className="text-input contact-input"
              placeholder="Your message..."
            ></textarea>
            <button type="submit" className="btn btn-big contact-btn">
              <i className="fas fa-envelope"></i>
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Bookify | Designed with ❤️ in India
      </div>
    </footer>
  );
};

export default Footer;
