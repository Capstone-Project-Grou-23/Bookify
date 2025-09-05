/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

// The Signup component receives `setPage` to switch to the login view.
function Signup({ setPage }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        // Validation logic
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // If validation passes
        setError('');
        console.log('Form submitted successfully!');
        // Here you would typically make an API call to register the user
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

export default Signup;