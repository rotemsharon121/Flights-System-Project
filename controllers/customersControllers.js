const { getAllCustomers, getCustomerById, addCustomer, updateCustomer, removeCustomer } = require('../models/customersModel')
const { getTicketByCustomerId } = require('../models/ticketsModel')
const { getFlightById } = require('../models/flightsModel')


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
        console.log(`user get customer`, customer)
        res.json({customer : customer[0], tickets : tickets})
    } catch (error) {
        console.log(`ERROR ${error}`)
        res.status(500)
        res.json("an error occurred, can't show the customer")
    }
}

const addCustomerController = async (req, res) => { 
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
}

const updateCustomerController = async (req, res) => {
    const id = req.params.id
    const customer = req.body
    const changedParameters = []
    for (const parameter in customer) {
        changedParameters.push(parameter, customer[parameter])
    }
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
            console.log("sucsses to update ", newCustomer, changedParameters)
            res.json({ message: "sucsses update", changedParameters, oldCustomr, newCustomer })
        })
        .catch(error => { console.log("error! faild to update- ", error); res.status(500); res.json("An error occurred, can't update the customer") })
}

const removeCustomerController = (req, res) => {
    const id = req.params.id
    removeCustomer(id)
    .then((data)=>{
        if (data === 0) {
            console.log(`customer not exist id- ${id}`)
            return res.json({messege: `customer with id ${id} not exist`})
        }
        console.log("customer deleted id- ", id)
        res.json({messege: `customer with id ${id} deleted`})
    })
    .catch(error => { console.log("error! faild to delete- ", error); res.status(500); res.json("An error occurred, can't delete the customer") })
}


module.exports = {
    getAllCustomersController,
    getCustomerByIdController,
    addCustomerController,
    updateCustomerController,
    removeCustomerController
}