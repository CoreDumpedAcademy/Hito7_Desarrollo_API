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


module.exports = mongoose.model('News', NewsSchema)