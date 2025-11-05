import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ check HTTP status instead of `data.success`
        // Save user name for profile
        localStorage.setItem("username", name);

        // Party popup
        const popup = document.createElement("div");
        popup.className = "party-popup";
        popup.innerHTML = `<h2>🎉 Welcome, ${name}!</h2><p>Your account has been created successfully.</p>`;
        document.body.appendChild(popup);

        setTimeout(() => popup.classList.add("show"), 100);

        setTimeout(() => {
          popup.classList.remove("show");
          setTimeout(() => {
            popup.remove();
            navigate("/login");
          }, 500);
        }, 3000);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    }
  };

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
          <li><Link to="/explore">Explore</Link></li>
          
        </div>
        <div className="auth">
          <Link to="/login" className="btn-login">
            Log In
          </Link>
          <Link to="/signup" className="btn-join">
            Join for FREE
          </Link>
        </div>
      </div>

      {/* Signup Form */}
      <div className="login-container">
        <div className="login-box">
          <h2>Create Account</h2>
          <p>Join Bookify today.</p>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="example@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              placeholder="Re-enter password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            <button type="submit" className="login-btn">
              Sign Up
            </button>
          </form>

          <div className="or">— Or —</div>

          <a href="http://localhost:5000/api/auth/google" className="social-btn" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" /> Continue with Google
</a>
          

          <div className="signup">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
