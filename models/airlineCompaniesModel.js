const { mysql2Connection } = require('../connections/mysql2Connection')

const getAllAirlineCompanies = async () => {
    const allAirlineCompanies = (await mysql2Connection).query('SELECT * FROM airline_companies')
    return allAirlineCompanies
}
const getAirlineCompaniesById = async (id) => {
    const airlineCompany = (await mysql2Connection).query('SELECT * FROM airline_companies WHERE id = ?', [id])
    return airlineCompany
}
const addAirlineCompanies = async (airlineCompany) => {
    const data = (await mysql2Connection).query('insert into airline_companies (id, Company_name, Country_id, User_name, Password) values(?, ?, ?, ?, ?)',
        [airlineCompany.id, airlineCompany.Company_name, airlineCompany.Country_id, airlineCompany.User_name, airlineCompany.Password])
    return data
}
const updateAirlineCompanies = async (id, changedParametersKey, changedParametersValue) => {
    const data = (await mysql2Connection).query(`UPDATE airline_companies SET ${changedParametersKey} = ? where id = ?`, [changedParametersValue, id])
    return data
}
const removeAirlineCompanies = async (id) => {
    const data = (await mysql2Connection).query('delete from airline_companies where id = ?', [id])
    return data
}

module.exports = {
    getAllAirlineCompanies,
    getAirlineCompaniesById,
    addAirlineCompanies,
    updateAirlineCompanies,
    removeAirlineCompanies
}