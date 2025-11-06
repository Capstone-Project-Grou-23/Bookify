process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
require('dotenv').config();

const express = require("express");
const passport = require('passport');
const mysql = require("mysql2");
const session = require('express-session');
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./auth/auth");
const verifyToken = require("./auth/verifyToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('./auth/passport-config');
const JWT_SECRET = "your_super_secret_key_that_is_long_and_secure";

// 1. DEFINE 'app' FIRST
const app = express();

// 2. SET YOUR VERCEL URL
// I removed the trailing slash, as it's generally safer
const VERCEL_FRONTEND_URL = "https://bookify-beryl.vercel.app/"; 

// 3. NOW you can use app.use()
app.use(cors({
  origin: VERCEL_FRONTEND_URL 
}));
app.use(bodyParser.json());

// MySQL Database Connection
// Use ../ to go up one directory to find db.js
const db = require("./db"); 

// Authentication routes
app.use("/api/auth", authRoutes);
app.use(session({
    secret: process.env.SESSION_SECRET, // You'll add this to .env
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize()); // "Wakes up" passport
app.use(passport.session());

// --- PROTECTED ROUTES ---
// All routes below this middleware will require a valid JWT
// In code/server/index.js

// Get all books (with search and seller_id filters)
// NOTE: This route is duplicated below as a public route. You should remove one.
// I am keeping the one WITH verifyToken for seller-specific searches
app.get('/api/books', verifyToken, (req, res) => {
  let sql = 'SELECT b.*, c.name as category_name, u.name as seller_name FROM books b JOIN categories c ON b.category_id = c.id JOIN users u ON b.seller_id = u.id';
  const params = [];
  const whereClauses = [];

  // Check for seller_id filter
  if (req.query.seller_id) {
    whereClauses.push('b.seller_id = ?');
    params.push(req.query.seller_id);
  }

  // Check for search filter (NOW ONLY SEARCHING TITLE)
  if (req.query.search) {
    // We removed "OR b.author LIKE ?"
    whereClauses.push('b.title LIKE ?');
    const searchTerm = `%${req.query.search}%`;
    // We only push the searchTerm once
    params.push(searchTerm);
  }

  // Combine filters if they exist
  if (whereClauses.length > 0) {
    sql += ' WHERE ' + whereClauses.join(' AND ');
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error fetching books:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// ✅ --- START OF FIX ---
// GET User Profile
app.get("/api/users/:id", verifyToken, (req, res) => {
    const userId = req.params.id;

    // Ensure the logged-in user is only accessing their own profile
    if (req.user.id !== parseInt(userId)) {
        return res.status(403).json({ message: "Forbidden" });
    }

    // Select all user data EXCEPT the password
    const getUserQuery = "SELECT id, name, email, profile_picture, bio, created_at FROM users WHERE id = ?";
    
    db.query(getUserQuery, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(results[0]); // Send back the user data
    });
});
// ✅ --- END OF FIX ---

// Update user profile
app.put("/api/users/:id", verifyToken, (req, res) => {
    const userId = req.params.id;
    if (req.user.id !== parseInt(userId)) {
        return res.status(403).json({ message: "Forbidden" });
    }

    const { name, bio, profile_picture } = req.body;
    const updateUserQuery = "UPDATE users SET name = ?, bio = ?, profile_picture = ? WHERE id = ?";
    db.query(updateUserQuery, [name, bio, profile_picture, userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: "Profile updated successfully" });
    });
});

// Get user settings
app.get("/api/users/:id/settings", verifyToken, (req, res) => {
    const userId = req.params.id;
    if (req.user.id !== parseInt(userId)) {
        return res.status(403).json({ message: "Forbidden" });
    }

    const settingsQuery = "SELECT * FROM user_settings WHERE user_id = ?";
    db.query(settingsQuery, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) {
             // If no settings, create default ones
            const defaultSettings = { user_id: userId, theme: 'light', newsletter_subscribed: true, promotional_emails: false, activity_alerts: true };
            const insertQuery = "INSERT INTO user_settings SET ?";
            db.query(insertQuery, defaultSettings, (insertErr, insertResult) => {
                if(insertErr) return res.status(500).json({ error: insertErr.message });
                res.json(defaultSettings);
            });
        } else {
            res.json(results[0]);
        }
    });
});

// Update user settings
app.put("/api/users/:id/settings", verifyToken, (req, res) => {
    const userId = req.params.id;
    if (req.user.id !== parseInt(userId)) {
        return res.status(403).json({ message: "Forbidden" });
    }
    const { theme, newsletter_subscribed, promotional_emails, activity_alerts } = req.body;
    const updateSettingsQuery = "UPDATE user_settings SET theme = ?, newsletter_subscribed = ?, promotional_emails = ?, activity_alerts = ? WHERE user_id = ?";
    db.query(updateSettingsQuery, [theme, newsletter_subscribed, promotional_emails, activity_alerts, userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: "Settings updated successfully" });
    });
});


// --- PUBLIC ROUTES ---

// Get all books (This route seems redundant, as you have one above. You may want to remove this one)
/*
app.get('/api/books', (req, res) => {
  // ✅ Use LEFT JOIN for both categories AND users
  let sql = 'SELECT b.*, c.name as category_name, u.name as seller_name FROM books b LEFT JOIN categories c ON b.category_id = c.id LEFT JOIN users u ON b.seller_id = u.id';
  const params = [];
  if (req.query.seller_id) {
    sql += ' WHERE b.seller_id = ?';
    params.push(req.query.seller_id);
  }
  db.query(sql, params, (err, results) => {
    if (err) {
        // Log the error to the console to see what's wrong
        console.error("Error fetching books:", err);
        return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
*/

// Get all categories
app.get('/api/categories', (req, res) => {
    db.query('SELECT * FROM categories', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a new book (Protected)
app.post('/api/books', verifyToken, (req, res) => {
  const { title, author, price, description, image_url, category_id } = req.body;
  const seller_id = req.user.id;
  const newBook = { title, author, price, description, image_url, category_id, seller_id };
  db.query('INSERT INTO books SET ?', newBook, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Book created successfully', bookId: result.insertId });
  });
});


app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});
