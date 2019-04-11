const express = require('express')
const bodyParser = require('body-parser')
const app = express();
var apiUser = require('./routes/user.routes')
var apiNews = require('./routes/newsRoutes')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', apiUser, apiNews)

module.exports = app