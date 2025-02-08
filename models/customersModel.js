const { knex } = require('../connections/knexConnection')

const getAllCustomers = async () => {
    const customers = await knex.select('*').from('customers')
    return customers
}

const getCustomerById = async (id) => {
    const customer = await knex.select('*').from('customers').where('id', '=', id)
    return customer
}

const addCustomer = async (customer) => {
    const newCustomerId = await knex(`customers`).insert(customer)
    return newCustomerId
}

const updateCustomer = (id, customer) => {
    const updatedCustomer = knex(`customers`).where('id', "=", id).update(customer)
    return updatedCustomer
}

const removeCustomer = (id) => {
    return knex(`customers`).where('id', id).del()
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    removeCustomer
}