const { getAllFlights,
    getFlightById,
    addFlight,
    updateFlight,
    removeFlight } = require('../models/flightsModel')

const { getCountryByName, getCountryById } = require('../models/countriesModel')
const { getAirlineCompaniesById } = require('../models/airlineCompaniesModel')

// const { all } = require('../router/countriesRouter')
// const { query } = require('express')

const getAllFlightsController = (req, res) => {
    getAllFlights()
        .then(async (allFlights) => {
            if (!allFlights.length) {
                console.log(`ERROR There is no flights`)
                res.status(404)
                return res.json("There is no flights")
            }

            const updatedFlights = await Promise.all(allFlights.map(async (flight) => {
                const originCountryName = await getCountryById(flight.Origin_contry_id)
                flight.Origin_contry_id = originCountryName[0].Name
                const destinationCountryName = await getCountryById(flight.Destination_country_id)
                flight.Destination_country_id = destinationCountryName[0].Name
                const airlineCompany = await getAirlineCompaniesById(flight.Airline_company_id)
                flight.Airline_company_id = airlineCompany[0][0].Company_name
                return flight
            }))

            console.log("user get all flights")
            res.json(updatedFlights)

        })
        .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't show all Flights") })
}

const checkParams = async (paramsFromReq) => {

    if (paramsFromReq.Origin_contry_id === 'no-data') { delete paramsFromReq.Origin_contry_id }
    else {
        const getOriginCountry = await getCountryByName(paramsFromReq.Origin_contry_id)
        paramsFromReq.Origin_contry_id = getOriginCountry[0].id
    }

    if (paramsFromReq.Destination_country_id === 'no-data') { delete paramsFromReq.Destination_country_id }
    else {
        const getDestinationCountry = await getCountryByName(paramsFromReq.Destination_country_id)
        paramsFromReq.Destination_country_id = getDestinationCountry[0].id
    }

    if (paramsFromReq.Departure_time === 'no-data') { delete paramsFromReq.Departure_time }

    if (paramsFromReq.Landing_time === 'no-data') { delete paramsFromReq.Landing_time }

    // console.log(paramsFromReq);


    return paramsFromReq
}

const getFlightByParamsController = async (req, res) => {
    const paramsFromReq = {
        Origin_contry_id: req.params.origin,
        Destination_country_id: req.params.destination,
        Departure_time: req.params.departure,
        Landing_time: req.params.landing
    }
    // console.log(paramsFromReq.Landing_time)

    const params = await checkParams(paramsFromReq)

    getFlightById(params)
        .then((flight) => {
            if (!flight.length) {
                console.log(`ERROR There is no flight with this id-`);
                res.status(404)
                res.send(`There is no flight with this id-`)
            } else {
                console.log(`user get flight`, flight)
                res.json(flight)
            }
        })
        .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't get the flight") })
}


const addFlightController = (req, res) => {
    const id = req.params.id
    const flight = req.body
    flight.id = id
    addFlight(flight)
        .then(async (data) => {
            const newflight = await getFlightById(data[0])
            console.log(`user add flight`, newflight)
            res.json({ messege: "sucsses", newflight: newflight })
        })
        .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't add the flight") })
}

const updateFlightController = async (req, res) => {
    try {
        const id = req.params.id
        const flight = req.body
        const changes = []
        for (const changekey in flight) {
            const changeValue = flight[changekey]
            changes.push(changekey, changeValue)
        }
        console.log('user try to update flight with id ', id)
        const flightBeforeChanges = await getFlightById(id)
        if (!flightBeforeChanges.length) {
            console.log(`ERROR There is no flight with this id- ${id}`)
            res.status(404)
            return res.json({ NotFound: "There is no flight with this id", id })
        }
        updateFlight(id, flight)
            .then(async () => {
                const flightAfterChanges = await getFlightById(id)
                console.log('user updated flight ', flightBeforeChanges, ' to ', flightAfterChanges, `changes: ${changes}`)
                res.json({ messege: "sucsses", flightBeforeChanges, flightAfterChanges, changes })
            })
            .catch((error) => {
                console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't update the flight")
            })
    } catch (error) {
        console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't update the flight")
    }
}

const removeFlightController = async (req, res) => {
    try {
        const id = req.params.id
        const flight = await getFlightById(id)
        removeFlight(id)
            .then(data => {
                if (data === 0) {
                    console.log(`user try to deleted flight with id ${id} but it not exist`)
                    res.status(404)
                    return res.json({ messege: `flight with id ${id} not exist` })
                }
                console.log(`flight with id ${id} has deleted`, flight)
                res.json({ messege: `flight with id ${id} deleted`, flight })
            })
            .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't delete the flight") })
    } catch (error) {
        console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't delete the flight")
    }
}

module.exports = {
    getAllFlightsController,
    getFlightByParamsController,
    addFlightController,
    updateFlightController,
    removeFlightController
}