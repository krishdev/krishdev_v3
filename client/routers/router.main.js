module.exports = function (app) {
	var index = require('../controllers/controller.index');
	var ctrl = require('../controllers/controller.main');
	app.get("/", index.getUserDetails);
	//app.get("/api/register", ctrl.registerGetUser);
	app.post("/api/register", ctrl.registerUser);
	app.post("/api/login", ctrl.loginUser);
	app.post("/api/logout", ctrl.logout);
	app.post("/api/sendEmail", ctrl.sendEmail);

	app.post("/api/insertContent", ctrl.insertContent);
	app.get("/api/getOneContent", ctrl.getOneContent);
	app.get("/api/getAllData", ctrl.getAllData);
	app.post("/api/updateContent", ctrl.updateContent);

	console.log('router Initialized');
};
