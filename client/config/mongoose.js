var mongoose = require('mongoose');
var config = require('./config');;
module.exports = function () {
	mongoose.connect(config.dbconnection);
};
