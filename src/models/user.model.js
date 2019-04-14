const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const enumerator = require('../middlewares/enumStructures');

const userSchema = new Schema({
	userName: { type: String, unique: true, required: true, minlength: 5, maxlength: 50 },
	firstName: { type: String, required: true, maxlength: 50 },
	lastName: { type: String, required: true, maxlength: 50 },
	role: { type: String, enum: enumerator.role, default: enumerator.role[1] },
	age: { type: Number },
	gender: { type: String, enum: enumerator.gender },
	isActive: { type: Boolean, default: true },
	password: {
		type: String,
		required: true
	},
	email: { type: String, required: true, maxlength: 50, unique: true },
	signUp: { type: Date, default: Date.now() },
	statistics: {
		lastLogin: { type: Date, default: Date.now() },
		// TODO->AÑADIR MÁS ESTADISTICAS
	}
});

userSchema.pre('save', function (next) {
	const user = this;
	if (!user.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			next(err);
		}
		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) {
				next(err);
			}
			user.password = hash;
			next();
		})
	})
});

userSchema.methods.comparePassword = function (password, cb) {
	bcrypt.compare(password, this.password, (err, equals) => {
		if (err) {
			return cb(err);
		}
		cb(null, equals);
	})
}

module.exports = mongoose.model(
	enumerator.modelsName.user,
	userSchema
);
