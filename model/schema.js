var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*var UserSchema = new Schema({
	id : String,
	name : String,
	password : String
},{collection:"UserTable", versionKey:false});

module.exports = mongoose.model('UserTable', UserSchema);*/

var ArticleSchema = new Schema({
	title : String,
	author : String,
	article: String

},{collection:"ArticleTable", versionKey:false});

module.exports = mongoose.model('ArticleTable', ArticleSchema);