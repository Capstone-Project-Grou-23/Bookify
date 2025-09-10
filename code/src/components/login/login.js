import React from "react";
import "./login.css";

export default function Login() {
  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">
          <a href="/homepage" style={{ color: "white", textDecoration: "none" }}>
            📚 Bookify
          </a>
        </div>
        <div className="menu">
          <a href="/homepage">Home</a>
          <a href="#">Explore</a>
          <a href="#">Pricing</a>
        </div>
        <div className="auth">
          <a href="/login" className="btn-login">Log In</a>
          <a href="/signup" className="btn-join">Join for FREE</a>
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

            <a href="#" className="forgot">Forgot your password?</a>

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
            Don’t have an account? <a href="/signup">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}
