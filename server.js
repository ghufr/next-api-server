require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const glob = require('glob')
const bodyParser = require('body-parser')

const app = express()

const mongoUri = 'mongodb://mongo:27017/development'

const PORT = 5000


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

mongoose.Promise = Promise
mongoose.connect(mongoUri)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

const rootPath = require('path').normalize(__dirname)
glob.sync(rootPath + '/api/routes/*.js').forEach(controllerPath => require(controllerPath)(app))

app.listen(PORT, (err) => {
  if (err) {
    throw err
  }
  app.keepAliveTimeout = 0
  console.log('> Ready on http://localhost:' + PORT)
})