const jwt = require('jsonwebtoken');
const JWT_SECRET = "your_super_secret_key_that_is_long_and_secure";

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) return res.sendStatus(401); // if there isn't any token

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // if token is no longer valid
        req.user = user;
        next(); // pass the execution off to whatever request the client intended
    });
}

module.exports = verifyToken;
