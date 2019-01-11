const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// cors config
const cors = require('cors')
const corsOptions = {
  origin: ['http://192.168.0.107:8080'],
  optionsSuccessStatus: 200
}

const mongoHelper = require('./db/mongo-helper.js')
const app = express()

app.use(cors(corsOptions))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/v1/user', require('./routes/v1/user'))
app.use('/v1/role', require('./routes/v1/role'))
app.use('/v1/auth', require('./routes/v1/auth'))
app.use('/v1/init', require('./routes/v1/init'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
