var Account = require("../models/model.account");
var Babyshower = require("../models/model.babyshower");
var FriendsFamily = require("../models/model.friendsFamily");
var GiftRegistry = require("../models/model.giftRegistry");
// var Dhk = require("../models/model.dhk");

//var Universities = require("../models/model.univ");
var passport = require("passport");
var nodemailer = require("nodemailer");
var xoauth2 = require('xoauth2');
var request = require('request'),
	cheerio = require('cheerio'),
	path = require('path'),
	bodyParser = require('body-parser'),
	env  = process.env;
var puppeteer = require('puppeteer');

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

/**
 * GET meta tags from urls
 */
var getMetaItemsFromURL = function (req, res) {
	/**
	 * 	fullName
		giftName
		giftUrl
		isAnonymous
	 */
	//make a new request to the URL provided in the HTTP POST request
	
	let form = {
		fullName: req.body.fullName,
		giftName: req.body.giftName,
		giftUrl: req.body.giftUrl,
		isAnonymous: req.body.isAnonymous,
		giftDescription: '',
		giftTitle: '',
		imageUrl: '',
	};
	if(form.giftUrl) {
		puppeteer
		.launch()
		.then(function(browser) {
			return browser.newPage();
		})
		.then(function(page) {
			return page.goto(req.body.giftUrl).then(function() {
			return page.content();
			});
		})
		.then(function(html) {
			//create the cheerio object
			resObj = {},
				//set a reference to the document that came back
				$ = cheerio.load(html),
				//create a reference to the meta elements
				$title = $('head title').text(),
				$desc = $('meta[name="description"]').attr('content'),
				$kwd = $('meta[name="keywords"]').attr('content'),
				$ogTitle = $('meta[property="og:title"]').attr('content'),
				$ogImage = $('meta[property="og:image"]').attr('content'),
				$ogkeywords = $('meta[property="og:keywords"]').attr('content'),
				$images = $('#main-image-container img');

			if ($title) {
				resObj.title = $title;
			}

			if ($desc) {
				resObj.description = $desc;
			}

			if ($kwd) {
				resObj.keywords = $kwd;
			}

			if ($ogImage && $ogImage.length){
				resObj.ogImage = $ogImage;
			}

			if ($ogTitle && $ogTitle.length){
				resObj.ogTitle = $ogTitle;
			}

			if ($ogkeywords && $ogkeywords.length){
				resObj.ogkeywords = $ogkeywords;
			}

			if ($images && $images.length){
				resObj.images = $($images[0]).attr('src');

				// for (var i = 0; i < $images.length; i++) {
				//     resObj.images.push($($images[i]).attr('src'));
				// }
			}

			//send the response
			form.giftTitle = resObj.title;
			form.giftDescription = resObj.description;
			form.imageUrl = resObj.images;
			
			var gifts = new GiftRegistry(form);
			gifts.save(function (err, data) {
				if(err)
					return res.send(err);
				data.fullName = data.isAnonymous != "false" ? 'One of the participants' : data.fullName;
				return res.status(200).json({
					data: data
				});
			});
		})
		.catch(function(err) {
			console.log(err);
			return res.send(JSON.stringify({error: 'There was an error of some kind'}));
		});
	} else {
		var gifts = new GiftRegistry(form);
		gifts.save(function (err, data) {
			if(err)
				return res.send(err);
			data.fullName = data.isAnonymous != "false" ? 'One of the participants' : data.fullName;
			return res.status(200).json({
				data: data
			});
		});
	}   
}

//Get all gifts();
var getAllGiftRegistry = function (req, res) {
	GiftRegistry.find(function (err, data) {
		if(err)
			return res.send(err);
		let allData = data;
		allData.forEach(item => {			
			if(item.isAnonymous != "false") {
				item.fullName = 'One of the participants'
			}
		})
		return res.status(200).json({
			data: allData
		});
	})
};



/**
 * First Birthday
 */


/**
* DHK 
*/

/**
 var getDhkAllKitchens = function(req, res) {
	Dhk.find(function (err, data) {
		if(err)
			return res.send(err);
		return res.send(data);
	});
};

var insertOnce = function () {
	let dhkonce = {
	  	"id": "12ab",
	  	"name": "My Kitchen",
	  	"img": "//chottukieducation.com/static/dhk/home-img1.jpg",
	  	"address1": "123 Broken Bridge",
	  	"address2": "#321",
	  	"city": "Plano",
	  	"state": "TX",
	  	"country": "USA",
	  	"location": "",
	  	"tagline": "Authentic south Indian food",
	  	"menu": [{
	  	  	"id": "12ab-12bc",
	      	"name": "Dosa",
	      	"img": "//chottukieducation.com/static/dhk/dosa.jpg",
	      	"category": "Tiffen",
	      	"region": "Indian",
	      	"taste": "",
	      	"price": "USD-6",
	      	"minimumQuntity": "2 lbs",
	      	"likes": 34,
	      	"isActive": true
	  	}],
	  	"phone": "8452147847",
	  	"email1": "test@test.com",
	  	"email2": "test2@test.com",
	  	"likes": 234,
	  	"description": "Best food in Plano area for South Indian varities",
	  	"isActive": true
	};
	var dhk = new Dhk(dhkonce);
	dhk.save(function (err, data) {
		if(err)
			console.log(err);
		console.log("Inserted");
	})

};
insertOnce();

var insertDhkKitchen = function(req, res) {
	var dhk = new Dhk(req.body);
	dhk.save(function (err, data) {
		if(err)
			return res.send(err);
		return res.send(data);
	})
}
 */

/*==================*/

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
exports.getMetaItemsFromURL = getMetaItemsFromURL;
exports.getAllGiftRegistry = getAllGiftRegistry;

// exports.getDhkAllKitchens = getDhkAllKitchens;
// exports.insertDhkKitchen = insertDhkKitchen;
console.log("controller Initialized");
