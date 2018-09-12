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
exports.renderbabyshowerPage = function (req, res) {
	res.render("babyshower", ({
		title: "Krishna and Sabha's Baby Shower"
	}))
}
exports.renderAdminBabyshowerPage = function (req, res) {
	res.render("adminBabyShower", ({
		title: "Krishna and Sabha's Baby Shower"
	}))
}
console.log("index - ended");
