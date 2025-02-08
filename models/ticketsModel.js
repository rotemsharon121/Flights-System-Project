const { knex } = require('../connections/knexConnection')

const getAllTickets = () => {
    const tickets = knex.select('*').from('tickets')
    return tickets
}

const getTicketById = (id) => {
    const ticket = knex.select('*').from('tickets').where('id', id)
    return ticket
}

const addTicket = (ticket) => {
    const newTicket = knex('tickets').insert(ticket)
    return newTicket
}

const updateTicket = (id, ticket) => {
    const updatedTicket = knex(`tickets`).where('id', "=", id).update(ticket)
    return updatedTicket
}

const removeTicket = (id) => {
    return knex(`tickets`).where('id', id).del()
}

module.exports = {
    getAllTickets,
    getTicketById,
    addTicket,
    updateTicket,
    removeTicket
}