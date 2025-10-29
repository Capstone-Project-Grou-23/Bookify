const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mysql = require('mysql2');
// const jwt = require('jsonwebtoken'); // Not needed in this file

// Create a database connection specifically for passport operations
const db = mysql.createConnection({
  host: "localhost", user: "root", password: "root", database: "bookify"
});

// Optional: Log connection errors for this specific connection
db.connect(err => {
    if (err) console.error("[passport-config] Error connecting to MySQL:", err);
    // else console.log("[passport-config] MySQL Connected..."); // Optional success log
});

// const JWT_SECRET = "your_super_secret_key_that_is_long_and_secure"; // Not needed here

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback" // Relative path on your server
  },
  (accessToken, refreshToken, profile, done) => {
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
    const name = profile.displayName;

    if (!email) {
      return done(new Error("Email not provided by Google"), null);
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) { return done(err); }

      if (results.length > 0) {
        return done(null, results[0]); // User exists
      } else {
        // Create new user
        const newUser = { name, email, password: 'google_auth_user' };
        db.query('INSERT INTO users SET ?', newUser, (err, result) => {
          if (err) { return done(err); }
          newUser.id = result.insertId;

          // Create default settings for the new user
          const settingsQuery = "INSERT INTO user_settings (user_id) VALUES (?) ON DUPLICATE KEY UPDATE user_id=user_id";
          db.query(settingsQuery, [newUser.id], (settingsErr) => {
             if (settingsErr) {
                console.error("Could not create default settings for Google user:", settingsErr);
             }
              return done(null, newUser); // Pass the new user even if settings fail
          });
        });
      }
    });
  }
));

// module.exports = passport; // Not needed if just running the config
