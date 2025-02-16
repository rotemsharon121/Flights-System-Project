const { getAllAirlineCompanies,
    getAirlineCompaniesByParams,
    addAirlineCompanies,
    updateAirlineCompanies,
    removeAirlineCompanies } = require('../models/airlineCompaniesModel')

const {getCountryById} = require ('../models/countriesModel')
// const { param } = require('../router/countriesRouter')

const airlinesTableFixer = async (allAirlines) => {
    for (const airline of allAirlines) {
        const countryName = await getCountryById(airline.Country_id)
        airline.Country_id = countryName[0].Name
    }
    return allAirlines
}

const getAllAirlineCompaniesController = (req, res) => {
    getAllAirlineCompanies()
    .then(async (allAirlineCompanies) => {
        allAirlineCompanies = await airlinesTableFixer(allAirlineCompanies[0])
        console.log("user get all airline companies")
        res.json(allAirlineCompanies)
    })
    .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't show all airline companies") })
}

const getAirlineCompaniesByParamsController = (req, res) => {
    const listParam = req.params.listParam
    const searchParam =req.params.searchParam
    
    getAirlineCompaniesByParams(listParam, searchParam)
    .then(async (airlineCompany) => {
        if (airlineCompany.length === 0) {
            console.log(`ERROR The user searched for an airline that does not exist. `)
        } else {
            console.log('user get airLine-', airlineCompany)
            airlineCompany = await airlinesTableFixer(airlineCompany)
        }
        res.json(airlineCompany)
        
        // if (!airlineCompany[0].length) {
        //     console.log(`ERROR There is no airline company with this id- ${id}`);
        //     res.status(404)
        //     res.send(`There is no airline company with this id- ${id}`)
        // } else {
        //     console.log(`user get airline company`, airlineCompany[0])
        //     res.send({ messege: "sucsses", airlineCompany: airlineCompany[0] })
        // }
    })
    .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't get the airline company") })
}
const addAirlineCompaniesController = (req, res) => {
    const id = req.params.id
    const airlineCompany = req.body
    airlineCompany.id = id
    addAirlineCompanies(airlineCompany)
    .then(async (data) => {
        const newAirlineCompany = await getAirlineCompaniesByParams(data[0].insertId)
        console.log(`user add airline company`, newAirlineCompany[0])
        res.send({ messege: "sucsses", newAirlineCompany: newAirlineCompany[0]})
    })
    .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't add the airline company") })
}
const updateAirlineCompaniesController =async (req, res) => {
    try {
        const id = req.params.id
        const changedParameters = req.body
        getAirlineCompaniesByParams(id).then(oldAirlineCompany => console.log('user try to update the airline company', oldAirlineCompany[0]))
        for (const changedParametersKey in changedParameters) {
            const changedParametersValue = changedParameters[changedParametersKey]
            const data = await updateAirlineCompanies(id, changedParametersKey, changedParametersValue)
            console.log('update results- ', data[0].info)
        }
            const updatedAirlineCompany = await getAirlineCompaniesByParams(id)
            console.log('user updated airline company ', updatedAirlineCompany[0], 'changes: ', changedParameters)
            res.json({ messege: "sucsses", changes: changedParameters, airlinecompany: updatedAirlineCompany[0]})
    } catch (error) {
        console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't update the airline company")
    }
}
const removeAirlineCompaniesController = async (req, res) => {
    const id = req.params.id
    const airlinecompany = await getAirlineCompaniesByParams(id)
    console.log('user deleting airline company-', airlinecompany[0][0]);
    removeAirlineCompanies(id)
    .then(data => {
        if (data[0].affectedRows === 0) {
            console.log(`user try to deleted airline company with id ${id} but it not exist`)
            return res.json({messege: `airline company with id ${id} not exist`})
        }
        console.log(`airline company with id ${id} has deleted`)
        res.json({messege: `airline company with id ${id} deleted`})
    })
    .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't delete the airline company") })
}

module.exports = {
    getAllAirlineCompaniesController,
    getAirlineCompaniesByParamsController,
    addAirlineCompaniesController,
    updateAirlineCompaniesController,
    removeAirlineCompaniesController
}