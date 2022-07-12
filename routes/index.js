const express = require('express')
const router = express.Router()

const mainRouter = require('./main')
const userRouter = require('./users')
const registerRouter = require('./registers')
const loginRouter = require('./login')
const logoutRouter = require('./logout')

router.use("/", mainRouter)
router.use("/users", userRouter)
router.use("/register", registerRouter)
router.use("/login", loginRouter)
router.use("/logout", logoutRouter)

module.exports = router