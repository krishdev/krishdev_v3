var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FriendsFamily = new Schema({
	id: String,
	name: String,
	family: String,
	friends: String,
	married: String
});

module.exports = mongoose.model("friendsFamily", FriendsFamily);
