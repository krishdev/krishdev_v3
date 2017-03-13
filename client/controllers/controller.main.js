var Account = require("../models/model.account");
//var Universities = require("../models/model.univ");
var passport = require("passport");
var nodemailer = require("nodemailer");

var registerUser = function (req, res) {
	Account.register(new Account({
			username: req.query.email
		}),
		req.query.password,
		function (err, account) {
			if (err) {
				console.log(err);
				return res.status(500).json({
					err: err
				});
			}
			console.log("inside registration")
			passport.authenticate('local')(req, res, function () {
				return res.status(200).json({
					status: 'Registration Successful'
				});
			});
		});
};

//Send email through npm sendmail
var sendEmail = function (req, res) {
	var smtpTransport = nodemailer.createTransport("SMTP", {
		service: "Gmail", // sets automatically host, port and connection security settings
		auth: {
			user: "krishnakumar4315@gmail.com",
			pass: "livehappily2013"
		}
	});
	var mailOptions = { //email options
		from: req.body.fromEmailId, // sender address.  Must be the same as authenticated user if using Gmail.
		to: req.body.toEmailId, // receiver
		subject: req.body.subject, // subject
		text: '', // body,
		html: req.body.emailBody
	};
	smtpTransport.sendMail(mailOptions, function (error, response) { //callback
		if (error) {
			console.log(error);
			return res.send(error);
		} else {
			console.log("Message sent: " + response.message);
			return res.send(response.message);
		}

		smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
	});
}

var loginUser = function (req, res, next) {
	/* Users.findOne({
	         email: req.body.register.email,
	         password: req.body.register.password
	     },
	     function (err, data) {
	         if (err)
	             console.log("Error! user does not exist");
	         else {
	             console.log(data);
	             return res.send(data);
	         }
	     });*/
	function failedAuth(error, user, info) {
		if (error) {
			return next(error);
		}
		if (!user) {
			return res.status(401).json({
				err: info
			});
		}
		req.logIn(user, function (err) {
			if (err) {
				return res.status(500).json({
					err: 'Could not login user'
				});
			}
			res.status(200).json({
				status: user
			});
		});
	}
	passport.authenticate("local", failedAuth)(req, res, next);
};
var getUserDetails = function (req, res) {
	console.log(req.body);
	Users.findOne({
			username: req.body.username,
			password: req.body.password
		},
		function (err, data) {
			if (err) {
				res.send("Something went wrong");
			} else {
				console.log(data);
				if (data == null) {
					res.send("user doesnot exist");
				} else {
					res.send(data);
				}

			}
		});

};
var insertDataSet = function (req, res) {
	var university = new Universities(req.query);
	var dataSet = {
		country: req.query.country,
		university: req.query.university,
		url: req.query.url
	}
	university.save(function (err) {
		res.send('Inserted');
	});
	//console.log(req);
};
var checkStatus = function (req, res) {
	if (!req.isAuthenticated()) {
		return res.status(200).json({
			status: false
		});
	}
	res.status(200).json({
		status: req.user
	});
};
var logout = function (req, res) {
	req.logout();
	res.status(200).json({
		status: false
	});
}
console.log("controller Initialized");
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.checkStatus = checkStatus;
exports.logout = logout;
exports.insertDataSet = insertDataSet;
exports.sendEmail = sendEmail;
