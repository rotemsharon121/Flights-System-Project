const express = require('express')
const router = express.Router()
const path = require('path')

const flightsAPI = require("../API/flightsAPI")


router.use(express.json())
router.use('/api', flightsAPI)

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/flights/all_flights.html'))
})
router.get('/flight_search', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/flights/flight_search.html'))
})


// router.get('/:id', async (req, res) => getFlightByIdController(req, res))
//     .post('/:id', async (req, res) => addFlightController(req, res))
//     .patch('/:id', async (req, res) => updateFlightController(req, res))
//     .delete('/:id', async (req, res) => removeFlightController(req, res))

module.exports = router