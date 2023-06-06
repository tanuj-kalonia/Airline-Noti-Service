const { TicketRepository } = require('../repositories')
const { Mailer } = require('../config');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const ticketRepository = new TicketRepository();

async function sendMail(mailFrom, mailTo, mailSubject, mailText) {
    try {
        const response = await Mailer.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: mailSubject,
            text: mailText
        });

        return response;

    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        console.log(error);
        throw new AppError('someting went wrong sending mail', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function createTicket(data) {
    try {
        const response = await ticketRepository.create(data);
        return response;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        console.log(error);
        throw new AppError('someting went wrong while creating ticket', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function sendPendingMail() {
    try {
        const response = await ticketRepository.getPendingMail();
        return response;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        console.log(error);
        throw new AppError('someting went wrong, cant fetch pending mails', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    sendMail,
    createTicket,
    sendPendingMail
}