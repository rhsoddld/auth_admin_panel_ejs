const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('registers')
})

router.post('/', (req, res) => {
    console.log(req.body.password)
    res.send('200')
})

module.exports = router