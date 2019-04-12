'use strict'

const express = require('express')
const api = express.Router()

const newsController = require('../controllers/newsController')

/** Ruta noticias
 *  pueden usarse de query lang, sources y q
 *  ejemplo:
 *  http://localhost:3000/api/news?lang=en&sources=CNN&q=Bitcoin
 *  los parametros son opcionales y se pueden enviar en cualquier orden
 * */
api.get('/news', newsController.getNews);

module.exports = api;
