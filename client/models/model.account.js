var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	username: String,
	password: String
});
Account.plugin(passportLocalMongoose);
console.log('mongoose initialized');
module.exports = mongoose.model('accounts', Account);
