require('dotenv').config()

const knex = require('knex').knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: process.env.DB_USER_NAME,
        password: process.env.DB_USER_PASSWORD,
        database: process.env.DATABASE_SCHEMA,
        timezone: 'UTC',
        dateStrings: true
    }
})

knex.raw('select 1+1 as result')
.then(() => console.log('Database connected with knex'))
.catch((error) => console.log('Error on connection with knex ', error))

module.exports = {
    knex
}