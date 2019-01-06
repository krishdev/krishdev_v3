module.exports = function (app) {
	var index = require('../controllers/controller.index');
	var ctrl = require('../controllers/controller.main');
	app.get("/", index.getUserDetails);
	app.get("/guesswhat", index.renderMarriagePage);
	app.get("/wedding", index.renderMarriagePage);
	app.get("/babyShower/", index.renderbabyshowerPage);
	app.get("/adminBabyShower/", index.renderAdminBabyshowerPage);
	//app.get("/api/register", ctrl.registerGetUser);
	app.post("/api/register", ctrl.registerUser);
	app.post("/api/login", ctrl.loginUser);
	app.post("/api/logout", ctrl.logout);
	app.post("/api/sendEmail", ctrl.sendEmail);

	app.post("/api/insertContent", ctrl.insertContent);
	app.get("/api/getOneContent", ctrl.getOneContent);
	app.get("/api/getAllData", ctrl.getAllData);
	app.post("/api/updateContent", ctrl.updateContent);
	app.get("/api/contact", ctrl.contact);
	app.get("/api/getMessages", ctrl.getMessages);
	app.get("/api/getGallery", ctrl.getGallery);
	app.get("/api/getGalleryCKE", ctrl.getGalleryCKE);
	app.post("/api/babyshower", ctrl.babyshower);
	app.post("/api/updateBabyshower", ctrl.updateBabyshower);
	app.get("/api/babyshowerGetAllData", ctrl.babyshowerGetAllData);
	app.get("/api/friendsFamilyGetAllData", ctrl.friendsFamilyGetAllData);
	app.post("/api/friendsFamilyInsertContent", ctrl.friendsFamilyInsertContent);
	app.post("/api/friendsFamilyUpdateContent", ctrl.friendsFamilyUpdateContent);


	app.get("/api/dhk/getAllKitchens", ctrl.getDhkAllKitchens);
	app.post("/api/dhk/insertDhkKitchen", ctrl.insertDhkKitchen);

	console.log('router Initialized');
};
