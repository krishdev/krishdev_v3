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
exports.renderKailashFirstBirthdayPage = function (req, res) {
	res.render("kail-first-birthday", ({
		title: "Kailash's 1st Birthday - Krishna and Sabha"
	}))
}
exports.renderAdminFirstBirthdayPage = function (req, res) {
	res.render("admin-first-birthday", ({
		title: "Admin Kail 1st birthday"
	}))
}
exports.renderGiftRegistryPage = function (req, res) {
	res.render("baby-gift-registry", ({
		title: "Gift Registry - Kailash First Birthday"
	}))
}
console.log("index - ended");
