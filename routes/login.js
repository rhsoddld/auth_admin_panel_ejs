const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
    // console.log(process.env.ACCESS_TOKEN_SECRET)
    res.render('login')
})

router.post('/', (req, res) => {

    const { email, password } = req.body
    
    if(!email) {
        return res.status(400).send('please input email')
    }
    if(!password) {
        return res.status(400).send('please input password')
    }

    User.findOne({email}, (err, foundUser) => {
        if(err) {
            return res.status(400).send('Something went wrong')
        }
        if(!foundUser) {
            return res.status(400).send('no existing user')
        }
        if(!foundUser.hasSamePassword(password)) {
            return res.status(400).send('Incorrect password')
        } 
        
        const token = jwt.sign({
            email: foundUser.email
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        foundUser.token = token 
        // res.header('authorization', token).send(token)
        res.redirect('/')
        // console.log(token)
        // res.json({ accessToken: token })
        // res.redirect('/')
        // res.status(200).json(token)
        // res.redirect('/')
    })    
})

module.exports = router