const { mysqlConnecion } = require('../connections/mysqlConnection')

const isCounrtyExist = (idCheck, nameChack) => {
    return new Promise((resolve, reject) => {
        mysqlConnecion.query(`SELECT * FROM countries WHERE id = ? or Name = ? ;`, [idCheck, nameChack], (error, results) => {
            if (error) {
                console.log('error in model countryChack')
                reject(error)
            }
            if (results.length === 0) {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}


const getAllCountries = () => {
    return new Promise((resolve, reject) => {
        mysqlConnecion.query('SELECT * FROM countries order by id;', (error, results) => {
            if (error) {
                console.log("Error in model getAllCountries")
                reject(error)
            }
            resolve(results)
        })
    })
}

const getCountryByName = (countryName) => {
    return new Promise((resolve, reject) => {
        mysqlConnecion.query(`SELECT * FROM countries where Name = '${countryName}';`, (error, results) => {
            if (error) {
                console.log('error in model getCountryByName')
                reject(error)
            }
            resolve(results)
        })
    })
}

const getCountryById = (countryID) => {
    return new Promise((resolve, reject) => {
        mysqlConnecion.query(`SELECT * FROM countries where id = '${countryID}';`, (error, results) => {
            if (error) {
                console.log('error in model getCountryById')
                reject(error)
            }
            resolve(results)
        })
    })
}

const addCountry = (country, id) => {
    return new Promise((resolve, reject) => {
        mysqlConnecion.query(`INSERT INTO countries(Name, id) values('${country}', '${id}');`, (error, results) => {
            if (error) {
                console.log('error in model addCountry')
                reject(error)
            }

            resolve(results)

        })
    })
}

const updateCountry = (oldCountryId, newCountry) => {
    return new Promise((resolve, reject) => {
        mysqlConnecion.query(`UPDATE countries SET Name = '${newCountry}' WHERE id = '${oldCountryId}';`, (error, results) => {
            if (error) {
                console.log('error in model updateCountry')
                reject(error)
            }
            resolve(results)
        })
    })
}

const removeCountry = (countryId) => {
    return new Promise((resolve, reject) => {
        mysqlConnecion.query(`DELETE FROM countries WHERE id = '${countryId}';`, (error, results) => {
            if (error) {
                console.log('error in model removeCountry')
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}


module.exports = {
    isCounrtyExist,
    getAllCountries,
    getCountryByName,
    getCountryById,
    addCountry,
    updateCountry,
    removeCountry
}