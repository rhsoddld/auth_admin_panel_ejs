const jwt = require('jsonwebtoken')
// const User = require('../models/user')

function notAuthorized(res) {
    return res.status(401).send('Not Authorized')
}

authMiddleware = function(req, res, next) {

    // const token = req.headers['authorization']
    // console.log(req.body)
    // console.log("TEST", token)
    // console.log(req)

    console.log("Auth : " + req.cookies.authorization)
    const token = req.cookies.authorization

    if(!token) {
        return notAuthorized(res)
    }

    // jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
        if(err) {
            return res.status(401).send(err.name)
        }
        next()
        // res.json({isAuthenticated: true})

        // User.findById(decodedToken.email, (err, foundUser) => {
        //     if(err) {
        //         return res.status(401).send('Not Authorized - Invalid')
        //     }
        //     if(!foundUser) {
        //         return res.status(401).send('Not Authorized - Not Found User')
        //     }
        //     console.log(decodedToken)
        //     next()
        // })
    })
}

module.exports = authMiddleware

// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token == null) return res.sendStatus(401)

//     console.log(token)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, foundUser) => {
//         if (err) return res.sendStatus(403)
//         console.log(foundUser)
//         req.email = foundUser
//         next()
//     })
// }

// module.exports = authenticateToken