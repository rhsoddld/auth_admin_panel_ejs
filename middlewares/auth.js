const authCheck = (req, res, next) => {
    if(req.baseUrl == "/Login"){
        next()
    }  

    if(!req.session.user_id) {
        return res.redirect('/login')
    } 
    next()
}

module.exports = authCheck