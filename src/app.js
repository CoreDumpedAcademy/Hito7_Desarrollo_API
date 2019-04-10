const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const api = require('./routes/user.routes')
const cors = require('cors')
const colors = require('colors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', api)

module.exports = app