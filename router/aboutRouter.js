const express = require('express')
const router = express.Router()
const path = require('path')

// router.use(express.json())

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/about/about.html'))
})

router.get('/front_end', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/about/frontEnd.html'))
})
router.get('/front_end/hebrew', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/about/hebrew/frontEndHebrew.html'))
})

router.get('/back_end', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/about/backEnd.html'))
})
router.get('/back_end/hebrew', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/about/hebrew/backEndHebrew.html'))
})

router.get('/database', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/about/database.html'))
})
router.get('/database/hebrew', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/about/hebrew/databaseHebrew.html'))
})

router.get('/developer', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/about/developer.html'))
})

module.exports = router