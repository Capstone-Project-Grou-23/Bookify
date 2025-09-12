import React from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            📚 Bookify
          </Link>
        </div>
        <div className="menu">
          <Link to="/">Home</Link>
          <a href="#">Explore</a>
          <a href="#">Pricing</a>
        </div>
        <div className="auth">
          <Link to="/login" className="btn-login">Log In</Link>
          <Link to="/signup" className="btn-join">Join for FREE</Link>
        </div>
      </div>

      {/* Signup Form */}
      <div className="login-container">
        <div className="login-box">
          <h2>Create Account</h2>
          <p>Join Bookify today.</p>

          <form>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Your Name" required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="example@example.com" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" required />

            <label htmlFor="confirm">Confirm Password</label>
            <input type="password" id="confirm" placeholder="Re-enter password" required />

            <button type="submit" className="login-btn">Sign Up</button>
          </form>

          <div className="or">— Or —</div>

          <button className="social-btn">
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" /> Continue with Google
          </button>
          <button className="social-btn">
            <img src="https://www.svgrepo.com/show/452196/facebook-1.svg" alt="Facebook" /> Continue with Facebook
          </button>

          <div className="signup">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
