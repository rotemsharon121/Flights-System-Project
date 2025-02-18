const express = require('express')
const router = express.Router()
const { getAllCustomersController } = require('../controllers/customersControllers')

router.use(express.json())

router.get('/allCustomers', getAllCustomersController)

// router.get('/flightByParams/:origin&:destination&:departure&:landing', getFlightByParamsController)

module.exports = router