const { getAllTickets,
    getTicketById,
    addTicket,
    updateTicket,
    removeTicket } = require('../models/ticketsModel')

const { updateFlight, getFlightById } = require('../models/flightsModel')

const getAllTicketsController = (req, res) => {
    getAllTickets()
        .then((allTickets) => {
            console.log("user get all tickets")
            res.json({ messege: "show all tickets", allTickets })
        })
        .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't show all tickets") })
}

const getTicketByIdController = (req, res) => {
    const id = req.params.id
    getTicketById(id)
        .then((ticket) => {
            if (!ticket.length) {
                console.log(`ERROR There is no ticket with this id- ${id}`);
                res.status(404)
                res.send(`There is no ticket with this id- ${id}`)
            } else {
                console.log(`user get ticket`, ticket)
                res.json({ messege: "sucsses", ticket: ticket })
            }
        })
        .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't get the ticket") })
}

const addTicketController = (req, res) => {
    // const id = req.params.id
    const ticket = req.body
    const remainingTickets = { Remaining_tickets: ticket.Remaining_tickets }
    delete ticket.Remaining_tickets
    
    
    // ticket.id = id
    addTicket(ticket)
        .then(async (data) => {
            await updateFlight(ticket.Flight_Id, remainingTickets)
            const newTicket = await getTicketById(data[0])
            console.log(`user add ticket`, newTicket)
            res.json({ messege: "sucsses", newTicket: newTicket })
        })
        .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't add the ticket") })
}

const updateTicketController = async (req, res) => {
    try {
        const id = req.params.id
        const ticket = req.body
        const changes = []
        for (const changekey in ticket) {
            const changeValue = ticket[changekey]
            changes.push(changekey, changeValue)
        }
        console.log('user try to update ticket with id ', id)
        const ticketBeforeChanges = await getTicketById(id)
        if (!ticketBeforeChanges.length) {
            console.log(`ERROR There is no ticket with this id- ${id}`)
            res.status(404)
            return res.json({ NotFound: "There is no ticket with this id", id })
        }
        updateTicket(id, ticket)
            .then(async () => {
                const ticketAfterChanges = await getTicketById(id)
                console.log('user updated ticket ', ticketBeforeChanges, ' to ', ticketAfterChanges, `changes: ${changes}`)
                res.json({ messege: "sucsses", ticketBeforeChanges, ticketAfterChanges, changes })
            })
            .catch((error) => {
                console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't update the ticket")
            })
    } catch (error) {
        console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't update the ticket")
    }
}

const removeTicketController = async (req, res) => {
    try {
        const ticketId = req.params.ticketId
        const flightId = req.params.flightId
        const flight = await getFlightById(flightId)
        const ticket = await getTicketById(ticketId)
        removeTicket(ticketId)
            .then(async data => {
                if (data === 0) {
                    console.log(`user tried to delete ticket with ticketId ${ticketId} but it does not exist`)
                    res.status(404)
                    return res.json({ message: `ticket with ticketId ${ticketId} does not exist` })
                }
                await updateFlight(flightId, { Remaining_tickets: flight[0].Remaining_tickets + 1 })
                console.log(`ticket with ticketId ${ticketId} has been deleted`, ticket)
                res.json({ message: `ticket with ticketId ${ticketId} deleted`, ticket })
            })
            .catch(error => {
                console.log(`ERROR ${error}`)
                res.status(500)
                res.json("an error occurred, can't delete the ticket")
            })
    } catch (error) {
        console.log(`ERROR ${error}`)
        res.status(500)
        res.json("an error occurred, can't delete the ticket")
    }
}

module.exports = {
    getAllTicketsController,
    getTicketByIdController,
    addTicketController,
    updateTicketController,
    removeTicketController
}