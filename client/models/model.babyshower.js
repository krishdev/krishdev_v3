var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BabyShower = new Schema({
	name: String,
	email: String,
	rsvp: String,
	participants: String
});

module.exports = mongoose.model("babyShower", BabyShower);
