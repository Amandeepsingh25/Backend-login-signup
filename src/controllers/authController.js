// src/controllers/authController.js
const User = require('../models/userModel');
const { registerUser, loginUser, cacheUser, getCachedUser } = require('../services/authService');

const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const { user, token } = await registerUser(username, email, password);
        cacheUser(user._id, user);
        res.status(201).json({ user, token });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const { user, token } = await loginUser(email, password);
        cacheUser(user._id, user);
        res.json({ user, token });
    } catch (error) {
        next(error);
    }
};

const getProfile = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    const userId = req.user._id; 

    User.findById(userId)
        .select('-password')
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ user });
        })
        .catch(error => {
            res.status(500).json({ message: 'Server error', error });
        });
};

module.exports = { register, login, getProfile };
