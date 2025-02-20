const { knex } = require('../connections/knexConnection')

const getAllFlights = () => {
    const flights = knex.select('*').from('flights')
    return flights
}

const getFlightByParams = (params) => {

    let flight = knex.select('*').from('flights')

    if (params.Origin_contry_id !== 'no-data') {
        flight = flight.where('Origin_contry_id', params.Origin_contry_id)
    }

    if (params.Destination_country_id !== 'no-data') {
        flight = flight.where('Destination_country_id', params.Destination_country_id)
    }

    if (params.Departure_time !== 'no-data') {
        flight = flight.whereRaw('DATE(Departure_time) = ?', [params.Departure_time])
    }

    if (params.Landing_time !== 'no-data') {
        flight = flight.whereRaw('DATE(Landing_time) = ?', [params.Landing_time])
    }

    

    // if (params.Departure_time || params.Landing_time) {
    //     const Departure_time = params.Departure_time
    //     delete params.Departure_time

    //     const Landing_time = params.Landing_time
    //     delete params.Landing_time

    //     const flight = knex.select('*').from('flights').where(params).whereRaw('DATE(Departure_time) = ?', [Departure_time, Landing_time])
    //     // const flight = knex.select('*').from('flights').whereRaw('DATE(Departure_time) = ?', [params.Departure_time])
    //     return flight
    // }

    // const flight = knex.select('*').from('flights').where(params)

    // const flight = knex.select('*').from('flights').where(params.Origin_contry_id, params.Destination_country_id).whereRaw('DATE(Departure_time) = ?', [params.Departure_time])
        
    return flight
}

const getFlightById = (id) => {
    const flight = knex.select('*').from('flights').where('id', id)
    return flight
}

const addFlight = (flight) => {
    const newflight = knex('flights').insert(flight)
    return newflight
}

const updateFlight = (id, flight) => {
    const updatedflight = knex(`flights`).where('id', "=", id).update(flight)
    return updatedflight
}

const removeFlight = (id) => {
    return knex(`flights`).where('id', id).del()
}

module.exports = {
    getAllFlights,
    getFlightByParams,
    getFlightById,
    addFlight,
    updateFlight,
    removeFlight
}