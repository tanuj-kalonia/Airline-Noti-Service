const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    GMAIL_PASS: process.env.GMAIL_PASS,
    GMAIL_USER: process.env.GMAIL_USER,
    NOTI_QUEUE: process.env.NOTI_QUEUE,
    RABBIT_MQ_URL: process.env.RABBIT_MQ_URL,
}