require('dotenv').config()
const mysql = require('mysql')

const mysqlConnecion = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER_NAME,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DATABASE_SCHEMA
})

mysqlConnecion.connect((error) => {
    if (error) {
        console.log(`Error on connectinon with mysql ${error}`)
    } else {
        console.log('Database connected with my sql')
    }
})

module.exports = {
    mysqlConnecion
}