const express = require('express')
const router = express.Router()
const { getAllCountriesController, getCountryByIdController, addCountryController, updateCountryController, removeCountryController } = require('../controllers/countriesController')
const bodyParser = require('body-parser')

router.use(bodyParser.json())

router.get('/', async (req, res) => getAllCountriesController(req, res))
    .post('/', async (req, res) => addCountryController(req, res))

router.get('/:id', async (req, res) => getCountryByIdController(req, res))
    .put('/:id', async (req, res) => updateCountryController(req, res))
    .delete('/:id', async (req, res) => removeCountryController(req,res))

module.exports = router