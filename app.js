const express = require('express')
const app = express()

const PORT = 3000

const countriesRouter = require("./router/countriesRouter")
const customersRouter = require("./router/customersRouter")
const airlineCompaniesRouter = require("./router/airlineCompaniesRouter")
const flightsRouter = require("./router/flightsRouter")
const ticketsRouter = require("./router/ticketsRouter")
const adminsRouter = require("./router/adminsRouter")
const aboutRouter = require("./router/aboutRouter")


app.use('/customers', customersRouter)
app.use('/countries', countriesRouter)
app.use('/airlineCompanies', airlineCompaniesRouter)
app.use('/flights', flightsRouter)
app.use('/tickets', ticketsRouter)
app.use('/admins', adminsRouter)
app.use('/about', aboutRouter)

// app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/public",express.static(__dirname + "/public"));
app.use("/config",express.static(__dirname + "/config"));


app.get('/', (req, res) => {
   res.sendFile(__dirname + '/views/index.html')
})
app.get('/user_page', (req, res) => {
   res.sendFile(__dirname + '/views/user_page.html')
})
app.get('/registerOrLogin', (req, res) => {
   res.sendFile(__dirname + '/views/registerOrLogin.html')
})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})