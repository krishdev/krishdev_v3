module.exports = function (app) {
	var index = require('../controllers/controller.index');
	var ctrl = require('../controllers/controller.main');
	app.get("/", index.getUserDetails);
	//app.get("/api/register", ctrl.registerGetUser);
	app.post("/api/register", ctrl.registerUser);
	app.post("/api/login", ctrl.loginUser);
	app.post("/api/logout", ctrl.logout);
	app.post("/api/insertDataSet", ctrl.insertDataSet);
	app.get("/api/checkStatus", ctrl.checkStatus);
	app.post("/api/sendEmail", ctrl.sendEmail);
	console.log('router Initialized');
};
