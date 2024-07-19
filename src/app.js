// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config/config');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

// MongoDB connection
mongoose.connect(config.mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Redis client setup
const redisClient = redis.createClient({
    host: config.redis.host,
    port: config.redis.port
});

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on('error', (err) => {
    console.error('Redis client error:', err);
});

// Server setup
const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
