const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
    if (!req.session.user_id) {
        return res.render('login', { session: false })
    }
    return res.render('index', { session: true })
})

router.post('/', async (req, res) => {
    const { email, password } = req.body

    if(!email) {
        return res.status(400).send('please input email')
    }
    if(!password) {
        return res.status(400).send('please input password')
    }

    try {
        const foundUser = await User.authValid(email, password)
    
        if(foundUser) {
            req.session.user_id = foundUser._id
            // req.session.user = foundUser
            return res.redirect('/')
        } else {
            return res.redirect('/login')
        }
    } catch(err) {
        console.log(err)
        return res.redirect('/')
    }
   
})

module.exports = router