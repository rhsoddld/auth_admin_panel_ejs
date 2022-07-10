const express = require('express')
const router = express.Router()
const User = require('../models/user')

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    next();
}

router.get('/', requireLogin, async (req, res) => {
// router.get('/', async (req, res) => {
    let query = User.find()

    try {
        const users = await query.exec()
        return res.render('users', { results: users, session: true})
    } catch {
        return res.redirect('/')
    }
})

router.get('/:id/edit', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        return res.render(`users/edit`, { results: user, session: true})
    } catch {
        return res.redirect('/')
    }
})

router.delete('/:id', async (req, res) => {
    let user
    try {
        user = await User.findById(req.params.id)
        await user.remove()
        return res.redirect('/users')
    } catch {
        return res.redirect('/')
    }
})

router.put('/:id', async (req, res) => {
    let user
    try {
        
        if(req.body.password !== req.body.confirmpassword) {
            return res.status(422).send({error: [{title: 'password error', detail: 'mismatch password'}]})
        }

        user = await User.findById(req.params.id)
        user.email = req.body.email
        user.username = req.body.username
        user.password = req.body.password

        await user.save()
        return res.redirect('/users')
    } catch {
        return res.redirect('/users')
    }
})



module.exports = router
