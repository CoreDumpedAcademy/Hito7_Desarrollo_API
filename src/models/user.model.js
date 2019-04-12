const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const enumerator = require('../middlewares/enumStructures');

const UserSchema = new Schema({
	userName: {type: String,unique: true,required: true,minlength: 5, maxlength: 50},
	firstName: { type: String, required: true, maxlength: 50 },
	lastName: { type: String, required: true, maxlength: 50 },
	role: { type: String, enum: enumerator.role, default: enumerator.role[1] },
	age: { type: Number},
	gender: {type: String, enum: enumerator.gender},
	isActive: {type: Boolean, default: true},
	password: {
		type: String,
		required: true
	},
		email: {type: String, required:true, maxlength:50, unique:true},
	signUp: {type: Date, default: Date.now()},
	statistics : {
		lastLogin: { type: Date, default: Date.now()},
		// TODO->AÑADIR MÁS ESTADISTICAS
	}
});

module.exports = mongoose.model(
  enumerator.modelsName.user,
  UserSchema
);
