
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { register, login, getProfile } = require('../controllers/authController');


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
