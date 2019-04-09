'use strict'

const express = require('express')
const api = express.Router()

const newsController = require('../controllers/newsController')

api.get('/news', newsController.getNews);
api.get('/news/sources', newsController.getSources);

module.exports = api;
