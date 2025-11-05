const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require('passport'); // Require the main passport module

// Run the configuration file to set up strategies
require('./passport-config'); // <<<--- Make sure this line exists and ONLY requires the config

const router = express.Router();

const db = require("../db"); // Use ../ to go up one directory

// db.connect(...); // Optional: connect if needed directly in this file, otherwise passport-config handles its own connection

const JWT_SECRET = "your_super_secret_key_that_is_long_and_secure";

// Signup Route (keep existing code)
// ...

// Login Route (keep existing code)
// ...

// --- Google OAuth Routes ---

// Route to start the Google OAuth flow
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:3000/login' }),
  (req, res) => {
    if (!req.user) {
        console.error("Authentication succeeded but user object is missing.");
        return res.redirect('http://localhost:3000/login?error=auth_failed');
    }
    const user = req.user;
    const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`http://localhost:3000/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({id: user.id, name: user.name, email: user.email}))}`);
  }
);

// In your auth/auth.js file

router.post('/signup', async (req, res) => {
    // 1. Get data from body
    const { name, email, password } = req.body;

    // 2. Simple validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide name, email, and password" });
    }

    try {
        // 3. Check if user already exists
        const [existingUser] = await db.promise().query(
            "SELECT email FROM users WHERE email = ?", 
            [email]
        );

        if (existingUser.length > 0) {
            // This is a "client error", not a "server error", but we'll send a clear message
            return res.status(409).json({ message: "Email already in use" });
        }

        // 4. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. Create the new user
        const [result] = await db.promise().query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );

        const newUserId = result.insertId;

        // 6. Create JWT token
        //    Make sure JWT_SECRET is in your .env file!
        const token = jwt.sign(
            { id: newUserId, name: name }, 
            process.env.JWT_SECRET, // Using process.env is more secure
            { expiresIn: '1h' }
        );

        // 7. Send success response
        res.status(201).json({ token, message: "User created successfully" });

    } catch (error) {
        // NOW, any error (database, hashing, etc.) will be caught
        console.error("!!!!!!!! SIGNUP FAILED !!!!!!!!", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
