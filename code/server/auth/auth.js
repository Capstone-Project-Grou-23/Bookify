const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require('passport'); // <<<--- Require the main passport module here
require('./passport-config');
const router = express.Router();

const db = mysql.createConnection({
  host: "localhost", user: "root", password: "root", database: "bookify"
});

const JWT_SECRET = "your_super_secret_key_that_is_long_and_secure";

// Signup
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: "Password hashing failed" });

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hash],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "Email already exists" });
          }
          return res.status(500).json({ error: err.message });
        }
        
        const userId = result.insertId;
        // Also create default settings for the new user
        const settingsQuery = "INSERT INTO user_settings (user_id) VALUES (?)";
        db.query(settingsQuery, [userId], (settingsErr, settingsResult) => {
            if(settingsErr) {
                 // Log this error but don't fail the registration
                console.error("Could not create default settings:", settingsErr);
            }
             res.status(201).json({ success: true, message: "User registered successfully!" });
        });
      }
    );
  });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ 
            success: true, 
            message: "Login successful", 
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    });
  });
});
// ... (keep existing code for /register and /login)

const passport = require('./passport-config'); // You might need to adjust the path

// Route to start the Google OAuth flow
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:3000/login' }), 
  (req, res) => {
    // At this point, req.user contains the authenticated user from the database
    const user = req.user;
    const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
    
    // Redirect back to the frontend with the token
    // The frontend will need a route to handle this and save the token
    res.redirect(`http://localhost:3000/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({id: user.id, name: user.name, email: user.email}))}`);
  }
);

module.exports = router;
