const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const { sendEmailOTP } = require('../email'); // Import email sender

require('./passport-config'); 

const router = express.Router();
const db = require("../db"); 

// --- Login Route (Modified) ---
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }

    try {
        const [users] = await db.promise().query(
            "SELECT * FROM users WHERE email = ?", 
            [email]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 2FA Check
        if (user.two_factor_enabled) {
            
            // --- EMAIL OTP FLOW ---
            if (user.two_factor_method === 'EMAIL') {
                const emailOtp = speakeasy.totp({
                    secret: user.two_factor_secret,
                    encoding: 'base32',
                    step: 600 // 10 minutes
                });
                
                const expires_at = new Date(Date.now() + 10 * 60 * 1000);
                await db.promise().query("DELETE FROM email_otps WHERE user_id = ?", [user.id]);
                await db.promise().query("INSERT INTO email_otps (user_id, otp_code, expires_at) VALUES (?, ?, ?)", [user.id, emailOtp, expires_at]);

                // Send email (simulated)
                await sendEmailOTP(user.email, emailOtp);
                
                return res.status(200).json({ 
                    two_factor_required: true, 
                    method: 'EMAIL',
                    userId: user.id,
                    message: "Please check your email for a 2FA code." 
                });
            }
            
            // --- APP OTP FLOW ---
            if (user.two_factor_method === 'APP') {
                return res.status(200).json({ 
                    two_factor_required: true, 
                    method: 'APP',
                    userId: user.id,
                    message: "Please enter your 2FA code." 
                });
            }
        }
        
        // No 2FA, log them in directly.
        const token = jwt.sign(
            { id: user.id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            token, 
            user: { id: user.id, name: user.name, email: user.email },
            message: "Login successful" 
        });

    } catch (error) {
        console.error("!!!!!!!! LOGIN FAILED !!!!!!!!", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// 2FA Login Verification Route (handles both methods)
router.post('/login-2fa', async (req, res) => {
    const { userId, token, method } = req.body;

    if (!userId || !token || !method) {
        return res.status(400).json({ message: "User ID, token, and method are required." });
    }

    try {
        const [users] = await db.promise().query(
            "SELECT * FROM users WHERE id = ?",
            [userId]
        );
        if (users.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }
        const user = users[0];

        let verified = false;

        if (method === 'APP') {
            verified = speakeasy.totp.verify({
                secret: user.two_factor_secret,
                encoding: 'base32',
                token: token
            });
        } else if (method === 'EMAIL') {
            const [otps] = await db.promise().query(
                "SELECT * FROM email_otps WHERE user_id = ? AND otp_code = ? AND expires_at > NOW()",
                [userId, token]
            );
            if (otps.length > 0) {
                verified = true;
                await db.promise().query("DELETE FROM email_otps WHERE id = ?", [otps[0].id]);
            }
        }

        if (!verified) {
            return res.status(401).json({ message: "Invalid or expired 2FA token." });
        }

        const jwtToken = jwt.sign(
            { id: user.id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            token: jwtToken, 
            user: { id: user.id, name: user.name, email: user.email },
            message: "Login successful" 
        });

    } catch (error) {
        console.error("!!!!!!!! LOGIN 2FA FAILED !!!!!!!!", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// --- Signup (Register) Route ---
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide name, email, and password" });
    }

    try {
        const [existingUser] = await db.promise().query(
            "SELECT email FROM users WHERE email = ?", [email]
        );
        if (existingUser.length > 0) {
            return res.status(409).json({ message: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const secret = speakeasy.generateSecret();

        const [result] = await db.promise().query(
            "INSERT INTO users (name, email, password, two_factor_secret, two_factor_enabled, two_factor_method) VALUES (?, ?, ?, ?, ?, ?)",
            [name, email, hashedPassword, secret.base32, false, 'NONE']
        );

        const newUserId = result.insertId;

        res.status(201).json({
            message: "User created! Please proceed to 2FA setup.",
            userId: newUserId,
            email: email
        });

    } catch (error) {
        console.error("!!!!!!!! SIGNUP FAILED !!!!!!!!", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Generate App Secret for Setup
router.post('/2fa/generate-app-secret', async (req, res) => {
    const { userId } = req.body;
    try {
        const [users] = await db.promise().query("SELECT * FROM users WHERE id = ?", [userId]);
        if (users.length === 0) return res.status(404).json({ message: "User not found" });

        const user = users[0];
        const secret = speakeasy.generateSecret({ name: `Bookify (${user.email})` });

        await db.promise().query("UPDATE users SET two_factor_secret = ? WHERE id = ?", [secret.base32, userId]);

        qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
            if (err) return res.status(500).json({ message: "Error generating QR code" });
            res.status(200).json({
                secret: secret.base32,
                qrCodeDataURL: data_url
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Verify App Setup and Log In
router.post('/2fa/verify-app-setup', async (req, res) => {
    const { userId, token } = req.body;
    try {
        const [users] = await db.promise().query("SELECT * FROM users WHERE id = ?", [userId]);
        if (users.length === 0) return res.status(404).json({ message: "User not found" });
        
        const user = users[0];
        const verified = speakeasy.totp.verify({
            secret: user.two_factor_secret,
            encoding: 'base32',
            token: token
        });

        if (!verified) {
            return res.status(401).json({ message: "Invalid 2FA token." });
        }

        await db.promise().query(
            "UPDATE users SET two_factor_enabled = true, two_factor_method = 'APP' WHERE id = ?",
            [userId]
        );

        const jwtToken = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ 
            token: jwtToken, 
            user: { id: user.id, name: user.name, email: user.email },
            message: "2FA enabled and login successful!" 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ --- START OF FIX ---

// NEW: Send Email OTP for Setup
router.post('/2fa/send-email-setup', async (req, res) => {
    const { userId, email } = req.body;
    try {
        const [users] = await db.promise().query("SELECT * FROM users WHERE id = ?", [userId]);
        if (users.length === 0) return res.status(404).json({ message: "User not found" });
        
        const user = users[0];

        // Generate and save the email OTP
        const emailOtp = speakeasy.totp({
            secret: user.two_factor_secret,
            encoding: 'base32',
            step: 600 // 10 minutes
        });
        
        const expires_at = new Date(Date.now() + 10 * 60 * 1000);
        await db.promise().query("DELETE FROM email_otps WHERE user_id = ?", [user.id]);
        await db.promise().query("INSERT INTO email_otps (user_id, otp_code, expires_at) VALUES (?, ?, ?)", [user.id, emailOtp, expires_at]);

        // Send the (simulated) email
        await sendEmailOTP(email, emailOtp);

        res.status(200).json({ message: "OTP sent to your email. Check your server console for the link." });
    } catch (error) {
        console.error("!!!! EMAIL OTP SEND FAILED !!!!", error);
        res.status(500).json({ message: "Server error sending OTP." });
    }
});

// NEW: Verify Email Setup and Log In
router.post('/2fa/verify-email-setup', async (req, res) => {
    const { userId, token } = req.body;
    try {
        const [users] = await db.promise().query("SELECT * FROM users WHERE id = ?", [userId]);
        if (users.length === 0) return res.status(404).json({ message: "User not found" });
        
        const user = users[0];

        // Check if token is valid
        const [otps] = await db.promise().query(
            "SELECT * FROM email_otps WHERE user_id = ? AND otp_code = ? AND expires_at > NOW()",
            [userId, token]
        );
        
        if (otps.length === 0) {
            return res.status(401).json({ message: "Invalid or expired 2FA token." });
        }

        // It's valid! Clean up the token
        await db.promise().query("DELETE FROM email_otps WHERE id = ?", [otps[0].id]);

        // Enable 2FA for the user
        await db.promise().query(
            "UPDATE users SET two_factor_enabled = true, two_factor_method = 'EMAIL' WHERE id = ?",
            [userId]
        );

        // Log the user in
        const jwtToken = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ 
            token: jwtToken, 
            user: { id: user.id, name: user.name, email: user.email },
            message: "2FA enabled and login successful!" 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ --- END OF FIX ---


// --- Google OAuth Routes --- (Unchanged)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:3000/login' }),
  (req, res) => {
    if (!req.user) {
        console.error("Authentication succeeded but user object is missing.");
        return res.redirect('http://localhost:3000/login?error=auth_failed');
    }
    const user = req.user;
    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`http://localhost:3000/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({id: user.id, name: user.name, email: user.email}))}`);
  }
);

module.exports = router;
