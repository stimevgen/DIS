// Auth
var ACL = require('../acl');

/* Формирование положительного ответа */
function sendOk(data, res){
	res.send({success: true, data: data});
}

/* Формирование ответа об ошибке */
function sendError(type, error, res){
	if (typeof(error)==='object'){
		res.send({success: false, type: type, message: [error.message]});
	} else {
		res.send({success: false, type: type, message:[error]});
	}
}
 
/* Вход по логину и паролю */	
function loginByPass (login, pass, res) {
	ACL.loginByPass(login, pass, function(data){
			sendOk(data, res);
		}, function(type, err){
			sendError(type, err, res);
		});
}

/* Вход по ssid */
function loginBySsid(ssid, res) {
	ACL.loginBySsid(ssid, function(data){
			sendOk(data, res);
		}, function(type, err){
			sendError(type, err, res);
		});
}	

var logoutBySsid = function (ssid, res) {
	ACL.logout(ssid, function(data){
			sendOk(data, res);
		}, function(type, err){
			sendError(type, err, res);
		});
}

//-------------------------------------------------------------------------
// LOGIN
exports.login = function (req, res) {
	var params = req.body; //POST
	if (params.login && params.pass) {
		loginByPass( params.login, params.pass, res );
	} else if (params.ssid) {
		loginBySsid( params.ssid, res );
	} else {sendError('query', 'Bad params', res);}	
};

//-------------------------------------------------------------------------
// LOGOUT
exports.logout = function (req, res) {
	var ssid = req.body.ssid; //POST
	if (ssid) {
		logoutBySsid( ssid, res );
	} else {sendError('query', 'Bad params', res);}
}


//-------------------------------------------------------------------------
// ERROR
exports.error = function (req, res) {
    sendError('query', 'Unknow error', res);
};
