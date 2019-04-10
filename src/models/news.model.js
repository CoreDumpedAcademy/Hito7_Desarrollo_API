const mongoose = require('mongoose')
const Schema = mongoose.Schema
const enumerator = require('../middlewares/enumStructures')

const NewsSchema = new Schema({
    author: {type: String},
    title: {type: String, required: true},
    url: {type: String, required: true},
    urlToImg: {type: String},
    publishedAt: {type: Date},
    content: {type: String}
})

// Igual lo de los tags no funciona :D pero bueno por si acaso yo lo dejo

module.exports = mongoose.model('News', NewsSchema)