const express = require('express');
const { ServerConfig, LoggerConfig } = require("./config");
const mailSender = require('./config/email-config')

const apiRoutes = require('./routes')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Server running at Port : ${ServerConfig.PORT}`);

    try {
        const result = await mailSender.sendMail({
            from: ServerConfig.GMAIL_USER,
            to: 'tanujkalonia2002@gmail.com',
            subject: 'Is the mailing service working ?',
            text: 'Yes, it is working fine'
        })
        console.log(result);
    } catch (error) {
        console.log(error);
    }
    // testing for node mailer
    // This will print the logs on the console.
    // LoggerConfig.info('Server is up here')
})
