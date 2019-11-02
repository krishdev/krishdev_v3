var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GiftRegistry = new Schema({
	id: String,
	fullName: String,
	giftName: String,
	giftUrl: String,
    isAnonymous: String,
    giftTitle: String,
	giftDescription: String,
	imageUrl: String
});

module.exports = mongoose.model("giftRegistry", GiftRegistry);
