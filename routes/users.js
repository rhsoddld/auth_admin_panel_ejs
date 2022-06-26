const express = require('express')
const router = express.Router()
const Auth = require('../middlewares/auth')
const User = require('../models/user')

router.get('/', Auth, async (req, res) => {
// router.get('/', async (req, res) => {
    let query = User.find()

    try {
        const users = await query.exec()
        res.render('users', { results: users})
    } catch {
        res.redirect('/')
    }
})

router.get('/:id/edit', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.render(`users/edit`, { results: user })
    } catch {
        res.redirect('/')
    }
})

router.delete('/:id', async (req, res) => {
    let user
    try {
        user = await User.findById(req.params.id)
        await user.remove()
        res.redirect('/users')
    } catch {
        res.redirect('/')
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
        res.redirect('/users')
    } catch {
        res.redirect('/users')
    }
})

// async function renderEditPage(res, user, hasError = false) {
//     renderFormPage(res, user, 'edit', hasError)
// }

// async function renderFormPage(res, user, form, hasError = false) {
//     try{
//         // const user = await User.find({})
//         res.render(`users/${form}`, { results: user })

//     } catch {
//         res.redirect('/books')
//     }
// }

module.exports = router
