var express = require("express");
var bodyParser = require("body-parser");
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var session = require("express-session");
var flash = require("connect-flash");
var Account = require("../models/model.account");
module.exports = function () {
	var app = express();

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'mySecretCookie'
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	//configure passport
	passport.use(new localStrategy(Account.authenticate()));
	passport.serializeUser(Account.serializeUser());
	passport.deserializeUser(Account.deserializeUser());

	app.use(flash());
	app.set("views", "./client/views");
	app.set("view engine", "ejs");
	app.use(express.static("./public"));
	console.log("express initialized");

	require("../routers/router.main")(app);

	return app;
}
