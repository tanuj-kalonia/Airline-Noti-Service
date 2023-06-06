const { Ticket } = require('../models');
const CrudRepository = require('./crud-repository');
const { Enums } = require('../utils/common')

class TicketRepository extends CrudRepository {
    constructor() {
        super(Ticket)
    }
    async getPendingMail() {
        const response = await Ticket.findAll({
            where: { status: Enums.NOTI_STATUS.PENDING }
        });
        return response;
    }
}

module.exports = TicketRepository