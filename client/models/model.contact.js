//model.contact.js
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var messages = new Schema({
	subject: String,
	content: String,
	time: String,
	from: String,
	to: String
});

module.exports = mongoose.model("Messages", messages);
