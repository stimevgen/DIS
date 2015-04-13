exports.init = function(app)
{
	// Auth
	var auth = require('./api/auth/controller');
	app.post(	'/api/auth/login',  auth.login);  // login
	app.post(	'/api/auth/logout', auth.logout); // logout
	app.all(    '/api/auth/*',		auth.error);  // error
	
	// Meta
	var meta = require('./api/meta/controller');
	app.get(	'/api/:ssid/meta/:type', 	 meta.list);  // list
	app.all(    '/api/:ssid/meta/*',		 meta.error); // error
	
	// Settings
	var settings = require('./api/settings/controller');
	app.get(	'/api/:ssid/settings', 	 	  settings.list);	// list
	app.get(	'/api/:ssid/settings/:name',  settings.get);	// get
    app.post(	'/api/:ssid/settings/:name',  settings.set);    // set
    app.delete(	'/api/:ssid/settings/:name',  settings.delete); // delete
	app.all(    '/api/:ssid/settings/*',	  settings.error);	// error
	
	// Db
	var db = require('./api/db/controller');
	app.get(	'/api/:ssid/db/acl/:table/:action',  db.acl);	  // acl
    app.post(	'/api/:ssid/db/:table', 	 		 db.create);  // create
	app.post(	'/api/:ssid/db/:table/0',    		 db.create);  // create
    app.get(	'/api/:ssid/db/:table', 		 	 db.list);	  // list
	app.get(	'/api/:ssid/db/:table/:id',  		 db.read);	  // read
    app.put(	'/api/:ssid/db/:table/:id',  		 db.update);  // update
    app.delete(	'/api/:ssid/db/:table/:id',	 		 db.delete);  // delete
	app.all(    '/api/:ssid/db/*',			 	 	 db.error);	  // error

	
	// Resource
	var res = require('./api/res/controller');
	app.post(	'/api/:ssid/res/:type',       res.getResource);	// read
	app.post(	'/api/:ssid/res/:type/:src',  res.getResource);	// read
	app.all(    '/api/:ssid/res/*',			  res.error);	    // error
		
}