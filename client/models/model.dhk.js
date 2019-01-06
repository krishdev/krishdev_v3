var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MenuSchema = { 
	id: String,
	img: String,
	name: String,
	category: String,
	region: String,
	taste: String,
	price: String,
	minimumQuntity: String,
	likes: Number,
	isActive: Boolean
};

var Dhk = new Schema({
	id: String,
	name: String,
	img: String,
	address1: String,
	address2: String,
	city: String,
	state: String,
	country: String,
	location: String,
	tagline: String,
	menu: [MenuSchema],
	phone: String,
	email1: String,
	email2: String,
	likes: Number,
	description: String,
	isActive: Boolean

});

module.exports = mongoose.model("dhk", Dhk);