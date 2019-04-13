'use strict'

const express = require('express')
const api = express.Router()

const newsController = require('../controllers/newsController')

/** Ruta noticias
 *  Para everything se pueden usar los siguientes parametros:
 *  q: query de busqueda
 *  lang: idioma de la noticia
 *  sources: fuente de la noticia, por defecto, todos
 *  from: fecha de la noticia - desde
 *  until: fecha de la noticia - hasta
 *  sortBy: metodo de ordenacion de las noticias
 *  page: nº de pagina de la noticia
 *  pageSize: numero de noticia en una pagina
 *  ejemplo:
 *  http://localhost:3000/api/news/everything?lang=en&sources=CNN&q=Bitcoin
 *  los parametros son opcionales y se pueden enviar en cualquier orden
 * 
 *  Para el endpoint topheadlines se pueden usar
 *  country: pais de la noticia
 *  category: categorias de la noticias
 *  q: query de busqueda
 *  page: nº de pagina de la noticia
 *  pageSize: noticias por pagina
 * */
api.get('/news/everything', newsController.getNews);
api.get('/news/topheadlines', newsController.getTopHeadLines);

module.exports = api;
