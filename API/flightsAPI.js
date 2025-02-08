const express = require('express')
const router = express.Router()
const { getAllFlightsController,
    getFlightByParamsController,
    addFlightController,
    updateFlightController,
    removeFlightController } = require('../controllers/flightsControllers')

router.use(express.json())

router.get('/allFlights', getAllFlightsController)

router.get('/flightByParams/:origin&:destination&:departure&:landing', getFlightByParamsController)

module.exports = router