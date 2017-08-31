var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var article = require('./routes/article.js');
var config = require('./config/DBConfig');
var port = 3030;


var app = express();
app.set('port', port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port, function(){
	console.log('Jesuis a port : '+ port);
});
var db = 'mongodb://localhost/newswebproj';
app.use('/article', article);
mongoose.connect(config.dbURL);
mongoose.connection.on('connected', function(){
	console.log("connected" );
})
mongoose.connection.on('error', function(){
	console.log("Error");
})


module.exports = app;
