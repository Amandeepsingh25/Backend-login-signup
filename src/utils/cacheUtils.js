
const { createClient } = require('redis');
const config = require('../config/config');

const redisClient = createClient({
    url: `redis://${config.redis.host}:${config.redis.port}`
});

redisClient.on('error', (err) => {
    console.error('Redis client error:', err);
});

redisClient.connect();

const setCache = async (key, value, expiration = 3600) => {
    await redisClient.setEx(key, expiration, JSON.stringify(value));
};

const getCache = async (key) => {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
};

module.exports = { setCache, getCache };
