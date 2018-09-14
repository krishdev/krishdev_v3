var Account = require("../models/model.account");
var Babyshower = require("../models/model.babyshower");
var FriendsFamily = require("../models/model.friendsFamily");
//var Universities = require("../models/model.univ");
var passport = require("passport");
var nodemailer = require("nodemailer");
var xoauth2 = require('xoauth2');

const fs = require('fs');
const readline = require('readline');
//const {google} = require('googleapis');

var ContentData = require("../models/model.myContent");
var Contact = require("../models/model.contact");

var registerUser = function (req, res) {
	console.log(req.body);
	Account.register(new Account({
			username: req.body.username
		}),
		req.body.password,
		function (err, account) {
			if (err) {
				//console.log(err);
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
	var smtpTransport = nodemailer.createTransport({
		//service: "Gmail", // sets automatically host, port and connection security settings
		host: 'smtp.gmail.com',
	    port: 465,
	    secure: true,
		auth: {
			//xoauth2: xoauth2.createXOAuth2Generator({
				type: 'OAuth2',
				user: "krishnakumar4315@gmail.com",
				clientId: "603367316954-67pej7ed33fg529n6e5cmve5pugclro2.apps.googleusercontent.com",
				clientSecret:"QOOem3Zel6T456JXACjWZ1Cv",
				refreshToken: "1/6KhePRPmLJlMpls--t2cP_LJ-gma0-qLLY6bvC4odr2d30Ryt1QoUATvEzgtA2CT",
				accessToken: "ya29.GlsMBtW6Ka79RsyMoV9pPvQ21nRl_ClYEII2b1eVtbCwOeps_oII2gZK8ISEEGiqLq5bCIPKmWUV3hW5JemtiyUwnfz9niwzKKDxKcWECvqzeWvkHFk4lzWXcx0B"
			//})
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
			console.log("Message sent: " + response);
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

var logout = function (req, res) {
	req.logout();
	res.status(200).json({
		status: false
	});
};

var insertContent = function (req, res) {
	var content = new ContentData(req.query);
	content.save(function (err, data) {
		if (err)
			return res.send(err);
		return res.send(data);
	})
};
var babyshower = function (req, res) {
	var participant = new Babyshower(req.body);
	participant.save(function (err, data) {
		if(err)
			return res.send(err);
		return res.send(data);
	})
};
var updateBabyshower = function (req, res) {
	var query = {
		_id: req.body._id
	};
	Babyshower.update(query, req.body, {
		multi: true
	}, function (err, data) {
		if (err)
			return res.send(err);
		return res.send(data);
	});
};
var babyshowerGetAllData = function (req, res) {
	Babyshower.find(function (err, data) {
		if (err)
			return res.send(err);
		return res.send(data);
	})
};
var friendsFamilyInsertContent = function (req, res) {
	var friends = new FriendsFamily(req.body);
	friends.save(function (err, data) {
		if(err)
			return res.send(err);
		return res.send(data);
	})
};
//friendsFamilyInsertContent();
var friendsFamilyGetAllData = function (req, res) {
	FriendsFamily.find(function (err, data) {
		if(err)
			return res.send(err);
		return res.send(data);
	})
};
var friendsFamilyUpdateContent = function(req, res) {
	var query = {
		_id: req.body._id
	};
	FriendsFamily.update(query, req.body, {
		multi: true
	}, function (err, data) {
		if (err)
			return res.send(err);
		return res.send(data);
	});
};

var contact = function (req, res) {
	var contact = new Contact(req.query);
	contact.save(function (err, data) {
		if (err)
			return res.send(err);
		return res.send(data);
	})
};

var getOneContent = function (req, res) {
	console.log(new RegExp(["^", req.query.itemId, "$"].join(""), "i"));
	ContentData.findOne({
		itemId: new RegExp(["^", req.query.itemId, "$"].join(""), "i"),
	}, function (err, data) {
		if (err)
			return res.send(err);
		return res.send(data);
	});
}

var getAllData = function (req, res) {
	ContentData.find(function (err, data) {
		if (err)
			return res.send(err);
		return res.send(data);
	})
};
var getMessages = function (req, res) {

	Contact.find(function (err, data) {
		if (err)
			return res.send(err);
		return res.send(data);
	})
};

var updateContent = function (req, res) {
	console.log(req.body._id);
	var query = {
		_id: req.body._id
	};
	ContentData.update(query, req.body, {
		multi: true
	}, function (err, data) {
		if (err)
			return res.send(err);
		return res.send(data);
	});
};

//flicker api

var Flickr = require("flickrapi"),
	flickrOptions = {
		api_key: "503edfddece76bfac94f1e6fd79fd230",
		secret: "587787127d6a0fdb"
	},
	flickrData = Flickr.loadLocally("./userdata", {
		loadPrivate: false
	});



var getGallery = function (req, res) {

	Flickr.tokenOnly(flickrOptions, function (error, flickr) {
		flickr.people.getPhotos({
			api_key: flickrOptions.api_key,
			user_id: '151533033@N04',
			page: req.query.page,
			per_page: 12,
			extras: "url_z"
		}, function (err, result) {
			return res.send(result);
		});
		//Flickr.result = flickr;
	});


};


//flickr cke api
//flicker api

var FlickrCKE = require("flickrapi"),
	flickrOptions = {
		api_key: "6a96b233ca559e1d013917026213bed6",
		secret: "7839fcdbff109cfc"
	},
	flickrData = Flickr.loadLocally("./userdata", {
		loadPrivate: false
	});



var getGalleryCKE = function (req, res) {

	Flickr.tokenOnly(flickrOptions, function (error, flickr) {
		flickr.people.getPhotos({
			api_key: flickrOptions.api_key,
			user_id: '141675670@N06',
			page: req.query.page,
			per_page: 20,
			extras: "date_upload,url_z"
		}, function (err, result) {
			return res.send(result);
		});
		//Flickr.result = flickr;
	});


};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.logout = logout;
exports.sendEmail = sendEmail;

exports.insertContent = insertContent;
exports.getOneContent = getOneContent;
exports.getAllData = getAllData;
exports.updateContent = updateContent;
exports.contact = contact;
exports.getMessages = getMessages;
exports.getGallery = getGallery;
exports.getGalleryCKE = getGalleryCKE;
exports.babyshower = babyshower;
exports.babyshowerGetAllData = babyshowerGetAllData;
exports.updateBabyshower = updateBabyshower;
exports.friendsFamilyGetAllData = friendsFamilyGetAllData;
exports.friendsFamilyInsertContent = friendsFamilyInsertContent;
exports.friendsFamilyUpdateContent = friendsFamilyUpdateContent;
console.log("controller Initialized");
