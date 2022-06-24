const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', async (req, res) => {
    // const user = User.find(user => user.email = req.body.email)
    // if ( user == null){
    //     return res.status(400).send('Cannot find user')
    // }
    // try {
    //     if(await User.hasSamePassword(req.body.password)) {
    //         res.send('Success')
    //     } else {
    //         res.send('Not Allowed')
    //     }
    // } catch {
    //     res.status(500).send()
    // }

    const { email, password } = req.body
    if(!email) {
        return res.status(422).send({errors: [{title: 'email error', detail: 'please input email'}]})
    }
    if(!password) {
        return res.status(422).send({errors: [{title: 'password error', detail: 'please input password'}]})
    }

    User.findOne({email}, (err,foundUser) => {
        if(err) {
            return res.status(422).send({errors: [{title: 'login error', detail: 'Something went wrong'}]})
        }
        if(!foundUser) {
            return res.status(422).send({errors: [{title: 'no existing user', detail: 'no existing user'}]})
        }
        if(!foundUser.hasSamePassword(password)) {
            return res.status(422).send({errors: [{title: 'password error', detail: 'Incorrect password'}]})
        }
    })
    res.status(200).send("Success")

})

module.exports = router