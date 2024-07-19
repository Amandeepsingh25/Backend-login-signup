// src/services/authService.js
const User = require('../models/userModel');
const { generateToken } = require('../utils/jwtUtils');
const { setCache, getCache } = require('../utils/cacheUtils');

const registerUser = async (username, email, password) => {
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('User already exists');
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user);
    return { user, token };
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = generateToken(user);
    return { user, token };
};

const getUserById = async (id) => {
    return await User.findById(id).select('-password');
};

const cacheUser = async (id, user) => {
    await setCache(`user:${id}`, user, 3600);
};

const getCachedUser = async (id) => {
    return await getCache(`user:${id}`);
};

module.exports = { registerUser, loginUser, getUserById, cacheUser, getCachedUser };
