const express = require('express')
const router = express.Router()
const { getAllCustomersController, getCustomerByIdController, addCustomerController } = require('../controllers/customersControllers')

router.use(express.json())

router.get('/allCustomers', getAllCustomersController)

router.post('/newCustomer', async (req, res) => addCustomerController(req, res))

router.get('/:id', async (req, res) => getCustomerByIdController(req, res))

module.exports = router