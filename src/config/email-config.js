const nodemailer = require('nodemailer');
const { GMAIL_PASS, GMAIL_USER } = require('./server-config');

const mailSender = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
    }
})

module.exports = mailSender;