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

module.exports = router;
