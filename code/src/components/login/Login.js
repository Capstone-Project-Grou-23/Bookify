import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
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

      {/* Login Form */}
      <div className="login-container">
        <div className="login-box">
          <h2>Welcome back!</h2>
          <p>Log in to your account.</p>

          <form>
            <label htmlFor="email">Username or email</label>
            <input type="email" id="email" placeholder="example@example.com" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" required />

            <Link to="#" className="forgot">Forgot your password?</Link>

            <button type="submit" className="login-btn">Log In</button>
          </form>

          <div className="or">— Or —</div>

          <button className="social-btn">
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" /> Continue with Google
          </button>
          <button className="social-btn">
            <img src="https://www.svgrepo.com/show/452196/facebook-1.svg" alt="Facebook" /> Continue with Facebook
          </button>

          <div className="signup">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
