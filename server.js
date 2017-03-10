var config = require("./client/config/config");
var mongoose = require("./client/config/mongoose");
mongoose();

var port = config.port,
	expressServer = require("./client/config/express");
var app = expressServer();

app.listen(port);
console.log("app listenting to port " + port);
