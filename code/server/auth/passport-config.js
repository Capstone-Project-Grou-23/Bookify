const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mysql = require('mysql2');

const db = require("../db"); // Use ../ to go up one directory

// const JWT_SECRET = "your_super_secret_key_that_is_long_and_secure"; // Not needed here

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  // 2. Make this an async function to use promises
  async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
    const name = profile.displayName;

    if (!email) {
      return done(new Error("Email not provided by Google"), null);
    }

    try {
      // 3. Use the promise-based query
      const [results] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

      if (results.length > 0) {
        return done(null, results[0]); // User exists
      } else {
        // Create new user
        const newUser = { name, email, password: 'google_auth_user' }; // 'google_auth_user' is fine as a placeholder
        const [insertResult] = await db.promise().query('INSERT INTO users SET ?', newUser);
        
        newUser.id = insertResult.insertId;

        // 4. Create default settings for the new user, also with promises
        const settingsQuery = "INSERT INTO user_settings (user_id) VALUES (?) ON DUPLICATE KEY UPDATE user_id=user_id";
        await db.promise().query(settingsQuery, [newUser.id]);
        
        return done(null, newUser);
      }
    } catch (err) {
      console.error("Error in GoogleStrategy:", err);
      return done(err);
    }
  }
));

// module.exports = passport; // Not needed if just running the config
