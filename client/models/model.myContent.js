var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var contentData = new Schema({
	heading: String,
	content: String,
	time: String,
	author: String,
	tag: String,
	itemId: String
});

module.exports = mongoose.model("contents", contentData);
