const { getAllAirlineCompanies,
    getAirlineCompaniesById,
    addAirlineCompanies,
    updateAirlineCompanies,
    removeAirlineCompanies } = require('../models/airlineCompaniesModel')
// const { param } = require('../router/countriesRouter')

const getAllAirlineCompaniesController = (req, res) => {
    getAllAirlineCompanies()
    .then((allAirlineCompanies) => {
        console.log("user get all airline companies")
        res.json({ messege: "show all airline companies", AirlineCompanies: allAirlineCompanies[0] })
    })
    .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't show all airline companies") })
}
const getAirlineCompaniesByIdController = (req, res) => {
    const id = req.params.id
    getAirlineCompaniesById(id)
    .then((airlineCompany) => {
        if (!airlineCompany[0].length) {
            console.log(`ERROR There is no airline company with this id- ${id}`);
            res.status(404)
            res.send(`There is no airline company with this id- ${id}`)
        } else {
            console.log(`user get airline company`, airlineCompany[0])
            res.send({ messege: "sucsses", airlineCompany: airlineCompany[0] })
        }
    })
    .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't get the airline company") })
}
const addAirlineCompaniesController = (req, res) => {
    const id = req.params.id
    const airlineCompany = req.body
    airlineCompany.id = id
    addAirlineCompanies(airlineCompany)
    .then(async (data) => {
        const newAirlineCompany = await getAirlineCompaniesById(data[0].insertId)
        console.log(`user add airline company`, newAirlineCompany[0])
        res.send({ messege: "sucsses", newAirlineCompany: newAirlineCompany[0]})
    })
    .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't add the airline company") })
}
const updateAirlineCompaniesController =async (req, res) => {
    try {
        const id = req.params.id
        const changedParameters = req.body
        getAirlineCompaniesById(id).then(oldAirlineCompany => console.log('user try to update the airline company', oldAirlineCompany[0]))
        for (const changedParametersKey in changedParameters) {
            const changedParametersValue = changedParameters[changedParametersKey]
            const data = await updateAirlineCompanies(id, changedParametersKey, changedParametersValue)
            console.log('update results- ', data[0].info)
        }
            const updatedAirlineCompany = await getAirlineCompaniesById(id)
            console.log('user updated airline company ', updatedAirlineCompany[0], 'changes: ', changedParameters)
            res.json({ messege: "sucsses", changes: changedParameters, airlinecompany: updatedAirlineCompany[0]})
    } catch (error) {
        console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't update the airline company")
    }
}
const removeAirlineCompaniesController = async (req, res) => {
    const id = req.params.id
    const airlinecompany = await getAirlineCompaniesById(id)
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
    getAirlineCompaniesByIdController,
    addAirlineCompaniesController,
    updateAirlineCompaniesController,
    removeAirlineCompaniesController
}