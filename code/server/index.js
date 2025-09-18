const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MySQL DB
const db = mysql.createConnection({
  host: "localhost",  // change if remote
  user: "root",       // your MySQL username
  password: "root",   // your MySQL password
  database: "bookify" // your DB name
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected...");
});

app.get("/", (req, res) => {
  res.send("Server is alive ✅");
});

app.post("/signup", (req, res) => {
  console.log("📩 Incoming signup:", req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  // Hash password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ success: false, error: "Password hashing failed" });

    // Insert into DB
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hash],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ success: false, message: "Email already exists" });
          }
          return res.status(500).json({ success: false, error: err });
        }

        // ✅ Now frontend can check data.success
        res.json({ success: true, message: "User registered successfully!" });
      }
    );
  });
});



// ✅ Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        res.json({ message: "Login successful", user });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    });
  });
});

// Get all books
app.get('/books', (req, res) => {
  db.query('SELECT b.*, c.name as category_name FROM books b JOIN categories c ON b.category_id = c.id', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Get all categories
app.get('/categories', (req, res) => {
    db.query('SELECT * FROM categories', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});


// Add a new book
app.post('/books', (req, res) => {
  const { title, author, price, description, image_url, category_id, seller_id } = req.body;
  const newBook = { title, author, price, description, image_url, category_id, seller_id };
  db.query('INSERT INTO books SET ?', newBook, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ message: 'Book created successfully', bookId: result.insertId });
  });
});


// ✅ Run server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
