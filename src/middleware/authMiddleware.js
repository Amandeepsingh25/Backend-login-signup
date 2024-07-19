const { verifyToken } = require('../utils/jwtUtils');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            

            const decoded = verifyToken(token);
            

            req.user = await User.findById(decoded.id).select('-password');
            

            if (!req.user) {
                return res.status(404).json({ message: 'User not found' });
            }
            next();
        } catch (error) {
            console.error('Token verification error:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = authMiddleware;
