const express = require('express');
const { ServerConfig, LoggerConfig } = require("./config");
const { TicketService } = require('./services')
const amqplib = require('amqplib');

async function connectQueue() {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.consume('noti-queue', async (data) => {
            const object = JSON.parse(`${Buffer.from(data.content)}`);
            await TicketService.sendMail(
                ServerConfig.GMAIL_USER,
                object.recepientEmail,
                object.subject,
                object.text
            )
            channel.ack(data);
        })
    } catch (error) {
        console.log(error);
    }
}

const apiRoutes = require('./routes')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Server running at Port : ${ServerConfig.PORT}`);
    await connectQueue();
    // This will print the logs on the console.
    // LoggerConfig.info('Server is up here')
})
