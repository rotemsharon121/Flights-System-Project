const express = require('express')
const router = express.Router()
const { getAllAirlineCompaniesController,
        getAirlineCompaniesByParamsController} = require('../controllers/airlineCompaniesControllers')

router.use(express.json())

router.get('/allAirlineCompanies', getAllAirlineCompaniesController)

router.get('/AirlineByParams/:listParam&:searchParam', getAirlineCompaniesByParamsController)

module.exports = router