const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const enumerator = require('../middlewares/enumStructures');

const NewsSchema = new Schema({
	author: {type: String},
	title: {type: String, required: true},
	url: {type: String, required: true},
	urlToImg: {type: String},
	publishedAt: {type: Date},
	content: {type: String}
})

const UserSchema = new Schema({
	userName: {
    	type: String,
	    unique: true,
	    required: true,
	    minlength: 5,
	    maxlength: 50
	},
	firstName: { type: String, required: true, maxlength: 50 },
	lastName: { type: String, required: true, maxlength: 50 },
	role: { type: String, enum: enumerator.role, default: enumerator.role[1] },
	favNews: [NewsSchema], // ARRAY DE NOTICIAS FAVORITAS
	password: {
		type: String,
	    select: false,
			required: true
	}
})


module.exports = mongoose.model(
  enumerator.modelsName.user,
  UserSchema
);
