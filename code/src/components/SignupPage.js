import React from "react";
import "./SignupPage.css";

function SignupPage() {
  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">
          <a href="/" style={{ color: "white", textDecoration: "none" }}>
            📚 Bookify
          </a>
        </div>
        <div className="menu">
          <a href="/">Home</a>
          <a href="#">Explore</a>
          <a href="#">Pricing</a>
        </div>
        <div className="auth">
          <a href="/login" className="btn-login">
            Log In
          </a>
          <a href="/signup" className="btn-join">
            Join for FREE
          </a>
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
            <input
              type="email"
              id="email"
              placeholder="example@example.com"
              required
            />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" required />

            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              placeholder="Re-enter password"
              required
            />

            <button type="submit" className="login-btn">
              Sign Up
            </button>
          </form>

          <div className="or">— Or —</div>

          <button className="social-btn">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
            />{" "}
            Continue with Google
          </button>
          <button className="social-btn">
            <img
              src="https://www.svgrepo.com/show/452196/facebook-1.svg"
              alt="Facebook"
            />{" "}
            Continue with Facebook
          </button>

          <div className="signup">
            Already have an account? <a href="/login">Log In</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
