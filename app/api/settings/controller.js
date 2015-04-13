// SETTINGS
var ACL = require('../acl');
var Models = require('../models');

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


//-------------------------------------------------------------------------
// LIST
exports.list = function (req, res) {
	var ssid   = req.params.ssid;
	ACL.getUserBySsid(ssid, function(curSession, curUser, curRole){
		Models.sysSettings.findAndCountAll({where: {user_guid: curUser.guid}}).success(function(settings) {
			res.send({success: true, total: settings.count,  data: settings.rows});
		}).error(function(err){sendError('settings', err, res)});
	},function (type, error) {sendError(type, error, res)});
};

//-------------------------------------------------------------------------
// GET
exports.get = function (req, res) {
	var ssid   = req.params.ssid;
	var name   = req.params.name;
	ACL.getUserBySsid(ssid, function(curSession, curUser, curRole){
		Models.sysSettings.find({where: {user_guid: curUser.guid, name: name}}).success(function(setting) {
			if (setting){
				sendOk(setting, res);
			} else {
				sendOk({name:name}, res);
			}
		}).error(function(err){sendError('settings', err, res)});
	},function (type, error) {sendError(type, error, res)});	
};

//-------------------------------------------------------------------------
// SET
exports.set = function (req, res) {
    var ssid  = req.params.ssid;
	var name  = req.params.name;
	ACL.getUserBySsid(ssid, function(curSession, curUser, curRole){
		Models.sysSettings.find({where: {user_guid: curUser.guid, name: name}}).success(function(setting) {
			var value = req.body.value;
			if (setting){
				// update
				setting.updateAttributes({value: value}).success(function() {
						res.send({success: true});
					}).error(function(err){sendError('settings', err, res)})
			} else {
				// new
				Models.sysSettings.create({guid: global.UUID.v4(), user_guid:curUser.guid, name: name, value:value})
					.success(function(newrecord) {
						sendOk(newrecord.values, res);
					}).error(function(err){sendError('settings', err, res)})
			}
		}).error(function(err){sendError('settings', err, res)});
	},function (type, error) {sendError(type, error, res)});
};

//-------------------------------------------------------------------------
// DELETE
exports.delete = function (req, res) {
	var ssid   = req.params.ssid;
	var name  = req.params.name;
	ACL.getUserBySsid(ssid, function(curSession, curUser, curRole){
		Models.sysSettings.find({where: {user_guid: curUser.guid, name: name}}).success(function(setting) {
			if (setting){
				setting.destroy().success(function() {
						res.send({success: true});
					}).error(function(err){sendError('settings', err, res)})
			}
		}).error(function(err){sendError('settings', err, res)});
	},function (type, error) {sendError(type, error, res)});
};

//-------------------------------------------------------------------------
// ERROR
exports.error = function (req, res) {
    sendError('settings', 'Unknow error',res);
};