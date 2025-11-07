import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ MODIFIED: State for 2FA challenge
  const [show2FA, setShow2FA] = useState(false);
  const [userId, setUserId] = useState(null);
  const [twoFaMethod, setTwoFaMethod] = useState(''); // 'APP' or 'EMAIL'
  const [twoFaToken, setTwoFaToken] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ MODIFIED: Check if 2FA is required
        if (data.two_factor_required) {
          setUserId(data.userId); // Store the userId
          setTwoFaMethod(data.method); // Store the method
          setShow2FA(true); // Show the 2FA input
          setError(data.message); // Show prompt (e.g., "Check your email")
        } else {
          // No 2FA, log in directly
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/");
        }
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    }
  };

  // ✅ MODIFIED: This function handles the 2FA code submission
  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!twoFaToken) {
      setError("Please enter your 6-digit code.");
      return;
    }

    try {
     const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login-2fa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            userId: userId, 
            token: twoFaToken, 
            method: twoFaMethod // Send the method
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 2FA code was correct! Log the user in.
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        setError(data.message || "Invalid code. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div>
      {/* Navbar (unchanged) */}
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

      {/* ✅ MODIFIED: Conditional Rendering for 2FA Challenge */}
      <div className="login-container">
        {show2FA ? (
          // --- 2FA CHALLENGE VIEW ---
          <div className="login-box">
            <h2>Two-Factor Authentication</h2>
            <p>
              {twoFaMethod === 'APP' 
                ? 'Enter the 6-digit code from your authenticator app.' 
                : 'A code was sent to your email. Please enter it below.'
              }
            </p>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleVerifySubmit}>
              <label htmlFor="2fa-token">6-Digit Code</label>
              <input
                type="text"
                id="2fa-token"
                placeholder="123456"
                required
                value={twoFaToken}
                onChange={(e) => setTwoFaToken(e.target.value)}
                maxLength={6}
              />
              <button type="submit" className="login-btn">
                Verify
              </button>
            </form>
          </div>
        ) : (
          // --- ORIGINAL LOGIN FORM ---
          <div className="login-box">
            <h2>Welcome back!</h2>
            <p>Log in to your account.</p>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Username or email</label>
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

              <Link to="#" className="forgot">
                Forgot your password?
              </Link>

              <button type="submit" className="login-btn">
                Log In
              </button>
            </form>

            <div className="or">— Or —</div>

            <a
              <a href={${process.env.REACT_APP_BACKEND_URL}/api/auth/google}
              className="social-btn"
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
              />{" "}
              Continue with Google
            </a>

            <div className="signup">
              Don’t have an account? <Link to="/signup">Sign up</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
