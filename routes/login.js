const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
    if (!req.session.user_id) {
        return res.render('login', { session: false })
    }
    return res.render('login', { session: true })
})

router.post('/', async (req, res) => {
    const { email, password } = req.body

    if(!email) {
        return res.status(400).send('please input email')
    }
    if(!password) {
        return res.status(400).send('please input password')
    }

    const foundUser = await User.authValid(email, password)
    
    if(foundUser) {
        req.session.user_id = foundUser._id
        res.redirect('/')
    } else {
        res.redirect('/login')
    }
   
})

module.exports = router