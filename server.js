if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}

//reference library
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


//router
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const registerRouter = require('./routes/registers')
const loginRouter = require('./routes/login')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(express.json())
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))


// mongo db connect
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection 
db.on('error', error => console.error(error))
db.on('open', () => console.log('Connected to mongoose database'))

app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)


app.listen(process.env.PORT || 3000)
