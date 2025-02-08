const express = require('express')
const router = express.Router()
const { getAllAdminsController,
    getAdminByIdController,
    addAdminController,
    updateAdminController,
    removeAdminController } = require('../controllers/adminsControllers')

router.use(express.json())

router.get('/', async (req, res) => getAllAdminsController(req, res))

router.get('/:id', async (req, res) => getAdminByIdController(req, res))
    .post('/:id', async (req, res) => addAdminController(req, res))
    .patch('/:id', async (req, res) => updateAdminController(req, res))
    .delete('/:id', async (req, res) => removeAdminController(req, res))

module.exports = router