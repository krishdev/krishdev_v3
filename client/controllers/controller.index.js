var model = require("../models/model.account");
exports.getUserDetails = function (req, res) {
	res.render("index", ({
		title: "Index Page"
	}));
}
