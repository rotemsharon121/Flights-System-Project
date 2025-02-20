const express = require('express')
const router = express.Router()
const { getAllCustomersController, getCustomerByIdController } = require('../controllers/customersControllers')

router.use(express.json())

router.get('/allCustomers', getAllCustomersController)

router.get('/:id', async (req, res) => getCustomerByIdController(req, res))

module.exports = router