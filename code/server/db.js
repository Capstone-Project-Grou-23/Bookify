// In code/server/db.js
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

// Load environment variables from .env file
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 4000,
  ssl: {
    // Read the ca.pem file
    ca: fs.readFileSync(path.join(__dirname, "ca1.pem")),
    // Add this line to bypass the certificate verification
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;