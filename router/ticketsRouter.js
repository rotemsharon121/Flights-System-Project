const express = require('express')
const router = express.Router()
const { getAllTicketsController,
    getTicketByIdController,
    addTicketController,
    updateTicketController,
    removeTicketController } = require('../controllers/ticketsControllers')

router.use(express.json())

router.get('/', async (req, res) => getAllTicketsController(req, res))

router.get('/:id', async (req, res) => getTicketByIdController(req, res))
    .post('/:id', async (req, res) => addTicketController(req, res))
    .patch('/:id', async (req, res) => updateTicketController(req, res))
    .delete('/:id', async (req, res) => removeTicketController(req, res))

module.exports = router