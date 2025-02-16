const { mysql2Connection } = require('../connections/mysql2Connection')

const getAllAirlineCompanies = async () => {
    const allAirlineCompanies = (await mysql2Connection).query('SELECT * FROM airline_companies')
    return allAirlineCompanies
}

const getAirlineCompaniesById = async (id) => {
    const airlineCompany = (await mysql2Connection).query('SELECT * FROM airline_companies WHERE id = ?', [id])
    return airlineCompany
}

const getAirlineCompaniesByParams = async (listParam, searchParam) => {
    // console.log(listParam, searchParam);
    // return new Promise((resolve, reject) => {
    //     const query = `SELECT * FROM airline_companies WHERE ${listParam} = ?`
    //     (mysql2Connection).query(query, [searchParam], (error, results) => {
    //         if (error) {
    //             console.log("Error in model getAllCountries")
    //             reject(error)
    //         }
    //         resolve(results)
    //     })
    // })
    // try {
    //     const airlineCompany = (await mysql2Connection).query(
    //       'SELECT * FROM `airline_companies` WHERE ? = ?',
    //       [listParam, searchParam]
    //     );
      
    //     console.log('resolts from model', airlineCompany);
    //     return airlineCompany
    //   } catch (err) {
    //     console.log('error from model', err);
    //   }

    //   (await mysql2Connection).query(
    //     'SELECT * FROM airline_companies WHERE Company_name = "Albania Air"',
    //     [listParam, searchParam],
    //     function (err, results) {
    //       console.log(results);
    //     }
    //   )

    try {
        const query = `SELECT * FROM airline_companies WHERE ${listParam} = ?`
        const airLine = await (await mysql2Connection).query(query, [searchParam]);
      
        return airLine[0]

      } catch (err) {
        console.log(err);
      }

    // try {
    //     const query = `SELECT * FROM airline_companies WHERE ${listParam} = '${searchParam}'`
    //     const airLine = await (await mysql2Connection).query(query);
      
    //     console.log(airLine)
    //     return airLine[0] // results contains rows returned by server

    //   } catch (err) {
    //     console.log(err);
    //   }

    // const airlineCompany = (await mysql2Connection).query('SELECT * FROM airline_companies WHERE ? = ?', [listParam, searchParam])
    // const airlineCompany = (await mysql2Connection).query('SELECT * FROM airline_companies WHERE Company_name = "Albania Air"')
    // console.log(airlineCompany)
    
    
    // return results
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
    getAirlineCompaniesByParams,
    addAirlineCompanies,
    updateAirlineCompanies,
    removeAirlineCompanies
}