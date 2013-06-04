var fs = require('fs');

function Logg(msg){
	this.msg = msg;
};

var logger = require('../node_modules/tracer').dailyfile({root:'.'});

module.exports = Logg;

Logg.log = function(data){
	logger.log(data);
};
Logg.trace = function(data){
	logger.trace(data);
};
Logg.debug = function(data){
	logger.debug(data);
};
Logg.info = function(data){
	logger.info(data);
};
Logg.warn = function(data){
	logger.warn(data);
};
Logg.error = function(data){
	logger.error(data);
};
