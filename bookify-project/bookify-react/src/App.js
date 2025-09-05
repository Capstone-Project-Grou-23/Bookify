/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';

// --- STYLES ---
// In a real multi-file app, this would be in App.css.
// For a single-file solution, we include it here.
const GlobalStyles = () => (
  <style>{`
    /* General Body Styles */
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #f5f6f7;
      color: #333;
    }

    /* Navbar Styles */
    .navbar {
      background-color: #1f2937;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 40px;
    }

    .navbar .logo {
      font-size: 20px;
      font-weight: bold;
      color: white;
      text-decoration: none;
      cursor: pointer;
    }

    .navbar .menu a {
      color: white;
      text-decoration: none;
      margin: 0 10px;
      cursor: pointer;
    }

    .navbar .auth a {
      padding: 6px 14px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      text-decoration: none;
      margin-left: 10px;
    }

    .btn-login-nav {
      background: transparent;
      color: white;
      border: 1px solid white;
    }

    .btn-join {
      background: #84cc16;
      color: black;
    }

    /* Homepage Hero Section */
    .hero-container {
      text-align: center;
      padding: 100px 20px;
      max-width: 800px;
      margin: 80px auto;
      border-radius: 12px;
      background-color: #fff;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .hero-container h1 {
      font-size: 48px;
      margin-bottom: 10px;
      color: #0d1b2a;
    }

    .hero-container p {
      font-size: 18px;
      margin-bottom: 40px;
      color: #555;
    }

    .hero-buttons .btn {
      padding: 14px 36px;
      border: none;
      border-radius: 8px;
      font-size: 18px;
      cursor: pointer;
      font-weight: bold;
      margin: 0 15px;
    }

    .btn-green {
      background-color: #8bc34a;
      color: #fff;
    }

    .btn-orange {
      background-color: #ff5722;
      color: #fff;
    }


    /* Form Styles (Login & Signup) */
    .form-container {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 40px 20px;
      min-height: calc(100vh - 150px);
    }

    .form-box {
      background: white;
      padding: 30px;
      width: 380px;
      max-width: 90%;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .signup-box {
        width: 420px;
    }

    .form-box h2 {
      margin-top: 0;
      margin-bottom: 8px;
      font-size: 20px;
      font-weight: bold;
    }

    .form-box p {
      margin-bottom: 20px;
      color: #555;
      font-size: 14px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-size: 13px;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border-radius: 5px;
      border: 1px solid #ccc;
      font-size: 14px;
      box-sizing: border-box;
    }

    .form-box .forgot {
      display: block;
      text-align: right;
      font-size: 12px;
      margin-top: -10px;
      margin-bottom: 15px;
      color: #2563eb;
      text-decoration: none;
    }

    .form-btn {
      width: 100%;
      background: #84cc16;
      border: none;
      padding: 12px;
      font-size: 15px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      margin-bottom: 15px;
    }

    .or {
      text-align: center;
      color: #888;
      margin: 15px 0;
    }

    .social-btn {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .social-btn img {
      width: 16px;
      margin-right: 8px;
    }

    .bottom-link {
      text-align: center;
      margin-top: 15px;
      font-size: 14px;
    }

    .bottom-link a {
      color: #2563eb;
      text-decoration: none;
      cursor: pointer;
    }

    .error-message {
        color: #e53e3e;
        font-size: 12px;
        margin-top: -10px;
        margin-bottom: 10px;
    }
  `}</style>
);


// --- COMPONENTS ---
// In a real multi-file app, these would be in separate files.

function Navbar({ setPage }) {
  return (
    <div className="navbar">
      <div className="logo" onClick={() => setPage('home')}>
        📚 Bookify
      </div>
      <div className="menu">
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a onClick={() => setPage('home')}>Home</a>
        <a href="#">Explore</a>
        <a href="#">Pricing</a>
      </div>
      <div className="auth">
        <a className="btn-login-nav" onClick={() => setPage('login')}>Log In</a>
        <a className="btn-join" onClick={() => setPage('signup')}>Join for FREE</a>
      </div>
    </div>
  );
}

function Homepage() {
  return (
    <div className="hero-container">
      <h1>Welcome to Bookify</h1>
      <p>Your modern marketplace for books</p>
      <div className="hero-buttons">
        <button className="btn btn-green">BUY</button>
        <button className="btn btn-orange">SELL</button>
      </div>
    </div>
  );
}

function Login({ setPage }) {
  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Welcome back!</h2>
        <p>Log in to your account.</p>

        <form>
          <label htmlFor="email">Username or email</label>
          <input type="email" id="email" placeholder="example@example.com" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" required />

          <a href="#" className="forgot">Forgot your password?</a>

          <button type="submit" className="form-btn">Log In</button>
        </form>

        <div className="or">— Or —</div>

        <button className="social-btn">
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" /> Continue with Google
        </button>
        <button className="social-btn">
          <img src="https://www.svgrepo.com/show/452196/facebook-1.svg" alt="Facebook" /> Continue with Facebook
        </button>

        <div className="bottom-link">
          Don’t have an account? <a onClick={() => setPage('signup')}>Sign up</a>
        </div>
      </div>
    </div>
  );
}

function Signup({ setPage }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setError('');
        console.log('Form submitted successfully!');
        alert('Signup successful!');
    };

    return (
        <div className="form-container">
            <div className="form-box signup-box">
                <h2>Create your account</h2>
                <p>Fill in the details to sign up for Bookify.</p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" id="fullname" placeholder="John Doe" required />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="example@example.com" required />

                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Enter password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirm-password" 
                        placeholder="Re-enter password" 
                        required 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    
                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="form-btn">Sign Up</button>
                </form>

                <div className="or">— Or —</div>

                <button className="social-btn">
                    <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" /> Continue with Google
                </button>
                <button className="social-btn">
                    <img src="https://www.svgrepo.com/show/452196/facebook-1.svg" alt="Facebook" /> Continue with Facebook
                </button>

                <div className="bottom-link">
                    Already have an account? <a onClick={() => setPage('login')}>Log In</a>
                </div>
            </div>
        </div>
    );
}

// --- MAIN APP COMPONENT ---

function App() {
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'login':
        return <Login setPage={setPage} />;
      case 'signup':
        return <Signup setPage={setPage} />;
      default:
        return <Homepage />;
    }
  };

  return (
    <div className="App">
      <GlobalStyles />
      <Navbar setPage={setPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;

