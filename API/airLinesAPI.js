const express = require('express')
const router = express.Router()
const { getAllAirlineCompaniesController,
        getAirlineCompaniesByIdController} = require('../controllers/airlineCompaniesControllers')

router.use(express.json())

router.get('/allAirlineCompanies', getAllAirlineCompaniesController)

// router.get('/flightByParams/:origin&:destination&:departure&:landing', getFlightByParamsController)

module.exports = router