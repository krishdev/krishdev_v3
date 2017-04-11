var model = require("../models/model.account");
console.log("index - initialized");
exports.getUserDetails = function (req, res) {
	res.render("index", ({
		title: "Index Page"
	}));
}
exports.renderMarriagePage = function (req, res) {
	res.render("marriage", ({
		title: "Krishna Weds Sabha"
	}));
}
console.log("index - ended");
