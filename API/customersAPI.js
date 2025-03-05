const express = require('express')
const router = express.Router()
const { getAllCustomersController, getCustomerByIdController, addCustomerController } = require('../controllers/customersControllers')

const multer = require('multer')
const path = require('path')

// storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/customersIMG/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

router.use(express.json())

router.get('/allCustomers', getAllCustomersController)

router.post('/newCustomer', upload.single('Profile_picture'), async (req, res) => addCustomerController(req, res))

router.get('/:id', async (req, res) => getCustomerByIdController(req, res))

module.exports = router