const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

const db = mysql.createConnection({
  host: "localhost", user: "root", password: "root", database: "bookify"
});

const JWT_SECRET = "your_super_secret_key_that_is_long_and_secure";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,     // From your .env file
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, // From your .env file
    callbackURL: "/api/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    // This function is called after Google authenticates the user
    const email = profile.emails[0].value;
    const name = profile.displayName;

    // Check if user already exists in your database
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) { return done(err); }

      if (results.length > 0) {
        // User exists, log them in
        return done(null, results[0]);
      } else {
        // User doesn't exist, create a new one
        // Note: The password field can be null as they log in via Google
        const newUser = { name, email, password: null };
        db.query('INSERT INTO users SET ?', newUser, (err, result) => {
          if (err) { return done(err); }
          newUser.id = result.insertId;
          return done(null, newUser);
        });
      }
    });
  }
));

module.exports = passport;
