const { getAllCountries, getCountryById, addCountry, updateCountry, removeCountry, isCounrtyExist } = require('../models/countriesModel')

const getAllCountriesController = (req, res) => {
    getAllCountries()
        .then(countries => {
            console.log("user get all countries")
            res.json({ messege: "show all countries", countries })
        })
        .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't show all countries") })
}

const getCountryByIdController = async (req, res) => {
    const id = req.params.id
    getCountryById(id)
        .then((country) => {
            if (!country.length) {
                console.log(`ERROR There is no country with this id ${id}`);
                res.status(404)
                res.json({ NotFound: "There is no country with this id", id })
            } else {
                console.log(`user get country`, country)
                res.json({ messege: "sucsses", country })
            }
        })
        .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't get the country") })
}

const addCountryController = (req, res) => {
    const country = req.body.name
    const id = req.body.id
    addCountry(country, id)
        .then(() => {
            console.log(`new country added to countries table- ${country}, with id- ${id}`)
            res.json(`country ${country} added`)
        })
        .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("An error occurred, can't added the country " + country)})
}

const updateCountryController = (req, res) => {
    const id = req.params.id
    const newCountry = req.body.name
    isCounrtyExist(id, newCountry).then((result) => {
        if (result) {
            updateCountry(id, newCountry)
                .then(() => {
                    console.log(`country with id- ${id} update to ${newCountry}`)
                    res.json(`country with id ${id} update to ${newCountry}`)
                })
                .catch((error) => {
                    res.status(500)
                    res.json("country not update")
                    console.log(`ERORR- ${error}`)
                })
        } else {
            addCountry(newCountry, id)
                .then(() => {
                    console.log(`new country added to countries table- ${newCountry} with id- ${id}`)
                    res.json(`country ${newCountry} added with id ${id}`)
                }).catch(error => {
                    res.status(500)
                    res.json("An error occurred, can't added the country " + newCountry)
                    console.log("ERROR- ", error)
                })
        }
    }).catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't update the country") })
}

const removeCountryController = (req, res) => {
    const id = req.params.id
    removeCountry(id)
    .then((data) => {
        if (data.affectedRows == 0) {
            console.log("An error occurred, can't delete the country with id " + id)
            res.status(404)
            res.json('can`t delete the country')
        } else {
            console.log(`country with id ${id} deleted`)
            res.json("country deleted")
        }
    })
        .catch(error => { res.status(500); console.log(`ERROR ${error}`); res.json("an error occurred, can't remove the country") })
}

module.exports = {
    getAllCountriesController,
    getCountryByIdController,
    addCountryController,
    updateCountryController,
    removeCountryController
}