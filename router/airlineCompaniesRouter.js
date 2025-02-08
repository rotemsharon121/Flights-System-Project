const express = require('express')
const router = express.Router()
const path = require('path')
const { getAllAirlineCompaniesController,
    getAirlineCompaniesByIdController,
    addAirlineCompaniesController,
    updateAirlineCompaniesController,
    removeAirlineCompaniesController } = require('../controllers/airlineCompaniesControllers')

router.use(express.json())

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/airlines/all_airlines.html'))
})
router.get('/airline_search', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/airlines/airline_search.html'))
})

// router.get('/', async (req, res) => getAllAirlineCompaniesController(req, res))

router.get('/:id', async (req, res) => getAirlineCompaniesByIdController(req, res))
router.post('/:id', async (req, res) => addAirlineCompaniesController(req, res))
router.patch('/:id', async (req, res) => updateAirlineCompaniesController(req, res))
router.delete('/:id', async (req, res) => removeAirlineCompaniesController(req, res))

module.exports = router