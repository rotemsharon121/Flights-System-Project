const mysql2 = require('mysql2/promise')
require('dotenv').config()

const mysql2Connection = mysql2.createConnection({
  host: 'localhost',
  user: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DATABASE_SCHEMA
})

mysql2Connection.then(() => console.log('Database connected with my sql2'))
.catch(err => console.error('Error on connectinon with mysql2 ', err))

module.exports = {
  mysql2Connection
}