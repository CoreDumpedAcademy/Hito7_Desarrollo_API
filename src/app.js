const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const apiUser = require('./routes/user.routes')
const apiNews = require('./routes/newsRoutes')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', apiUser, apiNews)

module.exports = app
