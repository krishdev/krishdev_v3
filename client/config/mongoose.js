var mongoose = require('mongoose');
var config = require('./config');;
module.exports = function () {
	mongoose.Promise = global.Promise;
	mongoose.connect(config.dbconnection);
};
