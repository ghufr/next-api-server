require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const bodyParser = require('body-parser')

const mongoUri = 'mongodb://mongo:27017/development'

const PORT = 5000

const ApiRoutes = require('./src/routes/api')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

ApiRoutes(app)

mongoose.Promise = Promise
mongoose.connect(mongoUri)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

app.listen(PORT, (err) => {
  if (err) {
    throw err
  }
  app.keepAliveTimeout = 0
  console.log('> Ready on http://localhost:' + PORT)
})