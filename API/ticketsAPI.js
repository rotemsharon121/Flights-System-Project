const express = require('express')
const router = express.Router()
const { addTicketController, removeTicketController } = require('../controllers/ticketsControllers')

router.use(express.json())

router.post('/newTicket', async (req, res) => addTicketController(req, res))
router.delete('/:ticketId&:flightId', async (req, res) => removeTicketController(req, res))

module.exports = router