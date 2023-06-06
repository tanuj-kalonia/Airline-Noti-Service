const express = require('express');

const { InfoController, TicketController } = require('../../controllers')
const router = express.Router();

router.get('/info', InfoController.info)
router.post('/tickets', TicketController.createTicket);

module.exports = router;