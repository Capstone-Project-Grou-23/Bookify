import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../login/Login.css'; // Use login styles for the box
import './Setup2FA.css'; // Add new styles for the choice buttons

const Setup2FA = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get user info passed from the signup page
    const { userId, email, name } = location.state || {};

    const [error, setError] = useState('');
    const [view, setView] = useState('choice'); // 'choice', 'app', 'email-verify'
    
    // State for app setup
    const [qrCode, setQrCode] = useState('');
    const [secret, setSecret] = useState('');
    const [appToken, setAppToken] = useState('');

    // ✅ NEW: State for email setup
    const [emailToken, setEmailToken] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    // If user lands here without state, redirect to signup
    if (!userId || !email) {
        // This check runs before render, so navigate is safe here
        navigate('/signup');
        return null; 
    }

    // 1. Handle "Enable Email" button click
    const handleEnableEmail = async () => {
        setError('');
        setEmailSent(false);
        try {
            // ✅ MODIFIED: Call the new 'send' route
            const response = await fetch("http://localhost:5000/api/auth/2fa/send-email-setup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, email }),
            });
            const data = await response.json();
            if (response.ok) {
                // ✅ MODIFIED: Go to the email verification view
                setView('email-verify'); 
                setEmailSent(true);
            } else {
                setError(data.message || 'Failed to send email OTP.');
            }
        } catch (err) {
            setError('Server error. Please try again.');
        }
    };

    // 2. Handle "Enable App" button click (Unchanged)
    const handleEnableApp = async () => {
        setError('');
        try {
            const response = await fetch("http://localhost:5000/api/auth/2fa/generate-app-secret", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });
            const data = await response.json();
            if (response.ok) {
                setQrCode(data.qrCodeDataURL);
                setSecret(data.secret);
                setView('app'); // Show the QR code view
            } else {
                setError(data.message || 'Failed to generate QR code.');
            }
        } catch (err) {
            setError('Server error. Please try again.');
        }
    };
    
    // 3. Handle verifying the app token (Unchanged)
    const handleVerifyAppToken = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch("http://localhost:5000/api/auth/2fa/verify-app-setup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, token: appToken }),
            });
            const data = await response.json();
            if (response.ok) {
                loginUser(data.token, data.user, name);
            } else {
                setError(data.message || 'Invalid token. Please try again.');
            }
        } catch (err) {
            setError('Server error. Please try again.');
        }
    };

    // ✅ NEW: 4. Handle verifying the EMAIL token
    const handleVerifyEmailToken = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch("http://localhost:5000/api/auth/2fa/verify-email-setup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, token: emailToken }),
            });
            const data = await response.json();
            if (response.ok) {
                // Success!
                loginUser(data.token, data.user, name);
            } else {
                setError(data.message || 'Invalid token. Please try again.');
            }
        } catch (err) {
            setError('Server error. Please try again.');
        }
    };

    // Helper to log user in and show popup
    const loginUser = (token, user, userName) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        const popup = document.createElement("div");
        popup.className = "party-popup";
        popup.innerHTML = `<h2>🎉 Welcome, ${userName}!</h2><p>Your account has been created and secured.</p>`;
        document.body.appendChild(popup);

        setTimeout(() => popup.classList.add("show"), 100);
        setTimeout(() => {
            popup.classList.remove("show");
            setTimeout(() => {
                popup.remove();
                navigate("/"); // All done, send to homepage
            }, 500);
        }, 3000);
    };

    return (
        <div>
            {/* Minimal Navbar */}
            <div className="navbar">
                <div className="logo">
                    <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                        📚 Bookify
                    </Link>
                </div>
            </div>

            <div className="login-container">
                <div className="login-box">
                    {error && <p style={{ color: "red", textAlign: 'center' }}>{error}</p>}

                    {view === 'choice' && (
                        <div style={{ textAlign: 'center' }}>
                            <h2>Step 2: Secure Your Account</h2>
                            <p>Choose your two-factor authentication method. You can change this later in settings.</p>
                            <div className="choice-buttons">
                                <button className="btn-2fa email" onClick={handleEnableEmail}>
                                    Use Email OTP
                                    <span>(A code will be sent to {email})</span>
                                </button>
                                <button className="btn-2fa app" onClick={handleEnableApp}>
                                    Use Authenticator App
                                    <span>(Recommended)</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {view === 'app' && (
                        <div style={{ textAlign: 'center' }}>
                            <h2>Set up Authenticator App</h2>
                            <p>Scan the QR code with your authenticator app.</p>
                            
                            <img src={qrCode} alt="2FA QR Code" style={{ border: '4px solid white', borderRadius: '8px' }} />
                            
                            <p style={{ fontSize: '0.9em', color: '#777' }}>Or enter this key manually:</p>
                            <p style={{ fontFamily: 'monospace', background: '#eee', padding: '10px', borderRadius: '4px', color: '#333' }}>
                                {secret}
                            </p>

                            <form onSubmit={handleVerifyAppToken}>
                                <label htmlFor="2fa-token" style={{ textAlign: 'left' }}>Enter 6-Digit Code</label>
                                <input
                                    type="text"
                                    id="2fa-token"
                                    placeholder="123456"
                                    required
                                    value={appToken}
                                    onChange={(e) => setAppToken(e.target.value)}
                                    maxLength={6}
                                />
                                <button type="submit" className="login-btn">
                                    Verify & Finish Setup
                                </button>
                            </form>
                        </div>
                    )}

                    {/* ✅ NEW: View for Email Verification */}
                    {view === 'email-verify' && (
                        <div style={{ textAlign: 'center' }}>
                            <h2>Check Your "Email"</h2>
                            <p>A 6-digit code was sent. **Check your `node index.js` terminal for a link from Ethereal Email** to view the code.</p>
                            
                            <form onSubmit={handleVerifyEmailToken}>
                                <label htmlFor="email-token" style={{ textAlign: 'left' }}>Enter 6-Digit Code</label>
                                <input
                                    type="text"
                                    id="email-token"
                                    placeholder="123456"
                                    required
                                    value={emailToken}
                                    onChange={(e) => setEmailToken(e.target.value)}
                                    maxLength={6}
                                />
                                <button type="submit" className="login-btn">
                                    Verify & Finish Setup
                                </button>
                            </form>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Setup2FA;
