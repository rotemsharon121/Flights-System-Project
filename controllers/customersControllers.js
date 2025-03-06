const { getAllCustomers, getCustomerById, addCustomer, updateCustomer, removeCustomer } = require('../models/customersModel')
const { getTicketByCustomerId } = require('../models/ticketsModel')
const { getFlightById } = require('../models/flightsModel')
const path = require('path')
const fs = require('fs')

// use multer to upload user profile picture on registration
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: 'public/img/customersIMG/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})

const getAllCustomersController = async (req, res) => {
    try {
        const customers = await getAllCustomers()
        // console.log("user get all customers");
        res.json(customers)
    } catch (error) {
        console.log(`ERROR ${error}`)
        res.status(500)
        res.json("an error occurred, can't show all customers")
    }
}

const getCustomerByIdController = async (req, res) => {
    try {
        const id = req.params.id
        const customer = await getCustomerById(id)
        const tickets = await getTicketByCustomerId(id)
        if (!customer.length) {
            res.status(404)
            return res.json({ NotFound: "There is no customer with this id", id })
        }
        // console.log(`user get customer`, customer)
        res.json({customer : customer[0], tickets : tickets})
    } catch (error) {
        console.log(`ERROR ${error}`)
        res.status(500)
        res.json("an error occurred, can't show the customer")
    }
}

const addCustomerController = async (req, res) => { 
    upload.single('Profile_picture')(req, res, async (err) => {
        if (err) {
            console.log(`ERROR in file upload ${err}`)
            return res.status(500).json({ message: "An error occurred during file upload", error: err })
        }
    try {
        const customer = req.body
        if (req.file) {
            customer.Profile_picture = req.file.filename
        }
        const newCustomerId = await addCustomer(customer)
        getCustomerById(newCustomerId[0])
            .then((newCustomer) => {
                console.log("new customr added to customers table: ", newCustomer[0])
                res.json(newCustomer[0])
            })
            .catch(error => {
                console.log(`ERROR ${error}`)
                res.status(500)
                res.json("ERROR")
            })
    } catch (error) {
        console.log(`ERROR in add customer controller ${error}`)
        // res.status(500)
        res.json({ message: "An error occurred, can't added the customer", error })
    }
    })
}

const updateCustomerController = async (req, res) => {
    const id = req.params.id
    const customer = req.body
    // const changedParameters = []
    // for (const parameter in customer) {
    //     changedParameters.push(parameter, customer[parameter])
    // }
    const oldCustomr = await getCustomerById(id)
    if (!oldCustomr.length) {
        console.log(`cant update, customer does not exist id- ${id}`)
        res.status(404)
        return res.json({ NotFound: "There is no customer with this id", id })
    }
    console.log("trying to update- ", oldCustomr)
    updateCustomer(id, customer)
        .then(async () => {
            const newCustomer = await getCustomerById(id)
            console.log("sucsses to update ", newCustomer)
            res.json({ message: "sucsses update", oldCustomr, newCustomer })
        })
        .catch(error => { console.log("error! faild to update- ", error); res.status(500); res.json("An error occurred, can't update the customer") })
}

const removeCustomerController = async (req, res) => {
    const id = req.params.id
    try {
        const customer = await getCustomerById(id)
        if (!customer.length) {
            console.log(`customer not exist id- ${id}`)
            return res.json({ message: `customer with id ${id} not exist` })
        }

        const profilePicture = customer[0].Profile_picture
        removeCustomer(id)
            .then((data) => {
                if (data === 0) {
                    console.log(`customer not exist id- ${id}`)
                    return res.json({ message: `customer with id ${id} not exist` })
                }

                // מחיקת תמונת הלקוח מהתיקייה
                if (profilePicture) {
                    const filePath = path.join(__dirname, '../public/img/customersIMG', profilePicture)
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(`Failed to delete profile picture: ${err}`)
                        } else {
                            console.log(`Profile picture deleted: ${filePath}`)
                        }
                    })
                }

                console.log("user deleted customer with id- ", id)
                res.json({ message: `customer with id ${id} deleted` })
            })
            .catch(error => {
                console.log("error! failed to delete- ", error)
                res.status(500)
                res.json("An error occurred, can't delete the customer")
            })
    } catch (error) {
        console.log("error! failed to delete- ", error)
        res.status(500)
        res.json("An error occurred, can't delete the customer")
    }
}

module.exports = {
    getAllCustomersController,
    getCustomerByIdController,
    addCustomerController,
    updateCustomerController,
    removeCustomerController
}