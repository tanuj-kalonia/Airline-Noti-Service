const { TicketService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common')
const { StatusCodes } = require('http-status-codes');

async function createTicket(req, res) {
    try {
        const { recepientEmail, content, subject } = req.body;
        const response = await TicketService.createTicket({ subject, content, recepientEmail });
        SuccessResponse.data = response;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)   // from AppError
            .json(ErrorResponse)
    }
}

module.exports = {
    createTicket
}