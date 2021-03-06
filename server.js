if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}

//reference library
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')


//router
const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(express.json())
app.use(expressLayouts)
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(session({ secret: process.env.SESSION_SECRET }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// const authCheck = require('./middlewares/auth') 
// app.use("*", authCheck)

app.use('/', indexRouter)

// mongo db connect
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection 
db.on('error', error => console.error(error))
db.on('open', () => console.log('Connected to mongoose database'))


app.listen(process.env.PORT || 3000)
