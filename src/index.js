const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/user.routes');
const app = express();
const mongoose = require('mongoose');

const port  = 3000;
const dev_db_url = 'mongodb://localhost/ionic-news-api';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MONGODB CONECCTION ERROR! '));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/users', users);
app
app.get('/', function(req, res){
	res.send('Hello World!');
});
app.listen(port, function(){
	console.log('Listening on Port : ' + port );
});
