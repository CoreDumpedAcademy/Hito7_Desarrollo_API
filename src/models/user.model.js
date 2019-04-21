const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const enumerator = require('../middlewares/enumStructures');
const enumeratorNews = require('../middlewares/newsStructures')

const NewsSchema = new Schema({
	author: {type: String},
	title: {type: String, required: true},
	url: {type: String, required: true},
	urlToImage: {type: String},
	publishedAt: {type: Date},
	content: {type: String}
})
const newsStructures = require('../middlewares/newsStructures');
mongoose.set('useCreateIndex', true);
var keyWordCounter = new Schema({
		name:{type:String, required:true},
		counter:{type:Number, default:1},
		categoryUsed:{type:String, default:'none'},
		lastView:{type:Date, default:Date.now()},
});

var categorySchema = new Schema({
	categoryName:{type:String, default:''},
	views:{type:Number, default:0},
});
/*
var categorySchema = {
	categoryName:'',
	views:0,
}*/
var categorySchemaArray = [
	{
		categoryName:'business',
		views:0,
	},
	{
		categoryName:'science',
		views:0,
	},
	{
		categoryName:'entertaiment',
		views:0,
	},
	{
		categoryName:'health',
		views:0,
	}, 
	{
		categoryName:'sports',
		views:0,
	},
	{
		categoryName:'general', 
		views:0
	},
	{
		categoryName: 'technology',
		views:0,
	}
];
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
	favNews: {type: [NewsSchema], maxlength: 20}, // ARRAY DE NOTICIAS FAVORITAS
	email: { type: String, required: true, maxlength: 50, unique: true },
	signUp: { type: Date, default: Date.now() },
	statistics: {
		lastLogin: { type: Date, default: Date.now() },
		mostUsedKeyWords: {type: [keyWordCounter], required:false},
		categoryViews: {type:[categorySchema], required:false, default:categorySchemaArray},
		// TODO->AÑADIR MÁS ESTADISTICAS
<<<<<<< HEAD
	},
	media: {
		banner:{
			type: String,
			default: "/newsapp/src/assets/images/default-images/defaultbanner"
		},
		picture:{
			type: String,
			default: "/newsapp/src/assets/images/default-images/download"
		}
	},
	preferences: {
		favLanguage: { type: String, default: enumeratorNews.languagesArray[2] }, //en
		favCountry: { type: String, default: enumeratorNews.countriesArray[50] } //usa
	}
=======
		},
>>>>>>> recomendacionNoticias
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
	userSchema,
);
