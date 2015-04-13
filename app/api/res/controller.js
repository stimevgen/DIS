// RSOURCES
var ACL = require('../acl');
var fs   = require('fs');
var path = require('path');
var RES  = global.RESOURCES;

/* Формирование ответа об ошибке */
function sendError(type, error, res){
	if (typeof(error)==='object'){
		res.send({success: false, type: type, message: [error.message]});
	} else {
		res.send({success: false, type: type, message:[error]});
	}
}

// Отправка файла
function sendFile(filePath, req, res) {
    fs.readFile(filePath, function(err, content){
        if (err) {
			sendError('resources', 'Resources not found', res);
			return;
		};
		
		// замена
		var str = content.toString(); //Buffer To String
		str = str.replace(new RegExp("%ContainerId%",'g'), req.body.id);
		str = str.replace(new RegExp("%ContainerData%",'g'), JSON.stringify(req.body));		
	
		// отправка
		res.end(str);
    });
}

function sendFileSafe(filePath, req, res){
    try {
      filePath = decodeURIComponent(filePath);
    } catch(e) {
      sendError('resources', 'Bad Request', res);
      return;
    }

    if (~filePath.indexOf('\0')){
		sendError('resources', 'Bad Request', res);
        return;
    }

    filePath = path.normalize(path.join(RES,filePath));


    if (filePath.indexOf(RES) != 0){
        sendError('resources', 'Resources not found', res);
        return;
    }

    fs.stat(filePath, function(err,stats){
       if (err || !stats.isFile()){
		   sendError('resources', 'Resources not found', res);
           return;
       }

       sendFile(filePath, req, res);
    });
}

//-------------------------------------------------------------------------
// READ

exports.getResource = function (req, res) {
	var ssid   = req.params.ssid;
	ACL.getUserBySsid(ssid, function(curSession, curUser, curRole){
		if (req.params.type === 'content'){
			var src = req.params.src || req.body.src;
			sendFileSafe('content/'+src+'.htc', req, res);
		}
	},function (type, error) {sendError(type, error, res)});
};

//-------------------------------------------------------------------------
// ERROR
exports.error = function (req, res) {
    sendError('resources', 'Unknow error',res);
};
