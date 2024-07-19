const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// Verify JWT Token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET); // Use process.env.JWT_SECRET here
    } catch (err) {
        throw new Error('Invalid token');
    }
};

module.exports = { generateToken, verifyToken };
