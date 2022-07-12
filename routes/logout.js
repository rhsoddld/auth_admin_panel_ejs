const express = require('express')
const router = express.Router()
const authCheck = require('../middlewares/auth')

router.post('/', authCheck, (req, res) => {
    req.session.user_id = null
    // req.session.destroy()
    return res.redirect('/login')
})

module.exports = router