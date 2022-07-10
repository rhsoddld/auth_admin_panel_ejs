const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
    if (!req.session.user_id) {
        return res.render('registers', { session: false })
    }
    return res.render('registers', { session: true })
})

router.post('/', (req, res) => {
    const { email, password, confirmpassword, username } = req.body
    if(!email) {
        return res.status(422).send({errors: [{title: 'email error', detail: 'please input email'}]})
    }
    if(!password) {
        return res.status(422).send({errors: [{title: 'password error', detail: 'please input password'}]})
    }
    if(password !== confirmpassword) {
        return res.status(422).send({error: [{title: 'password error', detail: 'mismatch password'}]})
    }
    if(!username) {
        return res.status(422).send({errors: [{title: 'name error', detail: 'please input name'}]})
    }

    User.findOne({email}, (err, foundUser) => {
        if(err) {
            return res.status(422).send({errors: [{title: 'register error', detail: 'something went wrong'}]})
        }
        if(foundUser) {
            return res.status(422).send({errors: [{title: 'register error', detail: 'already user exists'}]})
        }
        const user = new User({username, email, password})
        user.save((err) => {
            if(err) {
                return res.status(422).send({errors: [{title: 'register error', detail: 'something went wrong'}]})
            }
            req.session.user_id = user._id;
            res.redirect('/')
        })
    })
})




module.exports = router