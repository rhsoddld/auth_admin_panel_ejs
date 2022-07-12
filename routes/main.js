const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    if (!req.session.user_id) {
        return res.render('index', { session: false })
    }
    return res.render('index', { session: true })
})

module.exports = router