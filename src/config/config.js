require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    mongodb: {
        uri: process.env.MONGODB_URI
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    jwtSecret: process.env.JWT_SECRET
};

module.exports = config;
