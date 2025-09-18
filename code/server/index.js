require('dotenv').config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./auth/auth");
const verifyToken = require("./auth/verifyToken");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bookify"
});

db.connect(err => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("✅ MySQL Connected...");
});

// Authentication routes
app.use("/api/auth", authRoutes);

// --- PROTECTED ROUTES ---
// All routes below this middleware will require a valid JWT

// Get user profile
app.get("/api/users/:id", verifyToken, (req, res) => {
    const userId = req.params.id;
    // Ensure the token user matches the requested user ID
    if (req.user.id !== parseInt(userId)) {
        return res.status(403).json({ message: "Forbidden: You can only access your own profile." });
    }
    
    const userQuery = "SELECT id, name, email, profile_picture, bio FROM users WHERE id = ?";
    db.query(userQuery, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "User not found" });
        res.json(results[0]);
    });
});

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

// Get all books
app.get('/api/books', (req, res) => {
  let sql = 'SELECT b.*, c.name as category_name, u.name as seller_name FROM books b JOIN categories c ON b.category_id = c.id JOIN users u ON b.seller_id = u.id';
  const params = [];
  if (req.query.seller_id) {
    sql += ' WHERE b.seller_id = ?';
    params.push(req.query.seller_id);
  }
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


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
app.use(passport.initialize());
