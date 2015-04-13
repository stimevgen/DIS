Ext.ns('App.common.Window');
App.Window =
{
    _windows: [],  // массив окон
	_showlogs: false,
	_locked: false,
	x: 5,
	y: 5,
	
	//--------------------------------------------------------------------------------------------------------------
	addWin: function(obj, data){
		this._windows.push({id: data.sender.id, win: data.sender}); // упаковываю подписчика в массив
		this.log('Окна: Объект "'+data.sender.id+'" зарегистрирован (Окон: '+this._windows.length+').');
		//this._x = data.sender.x;
		//this._y = data.sender.y;
	},
	
	delWin: function(obj, data){
		var idx = this.getIdxByWin(data.sender)
		if 	(idx > -1) {	//this._activehistory.pop(data.sender);
			this._windows.splice(idx,1);
			this.log('Окна: Объект "'+data.sender.id+'" удален (Окон: '+this._windows.length+').');
			if (!this._locked) {this.toFront();}
		}
	},
	
	actWin: function(obj, data){
		if (!this._locked) {
			var idx = this.getIdxByWin(data.sender);
			if (idx>-1) {
				var tmp = this._windows[idx].win;
				this._windows.splice(idx,1);
				this._windows.push({id: tmp.id, win: tmp});
				this.log('Окна: Объект "'+data.sender.id+'" активирован.');
			}	
		}
	},
	
	countWin: function(){
		return this._windows.length;
	},
	
	//--------------------------------------------------------------------------------------------------------------
	getIdxByWin: function(obj){
		var answer = -1;
		for (var i = 0; i < this._windows.length; i++ ) {
			if (this._windows[i].id == obj.id) {
				answer = i;
			}
        }
		return answer;
	},
	
	getWinByName: function(name){
		var answer;
		for (var i = 0; i < this._windows.length; i++ ) {
			if (this._windows[i].win.name == name) {
				answer = this._windows[i].win;
			}
        }
		return answer;
	},
	
	getWinById: function(id){
		var answer;
		for (var i = 0; i < this._windows.length; i++ ) {
			if (this._windows[i].win.id == id) {
				answer = this._windows[i].win;
			}
        }
		return answer;
	},
	
	//--------------------------------------------------------------------------------------------------------------
	allClose: function(obj, data){
		this.log('Окна: Закрываем все окна.');
		for (var i = this._windows.length; i > 0 ; i-- ) {
			this._windows[i-1].win.close();
        }	
	},
	
	allMinimize: function(obj, data){
		this._locked = true;
		this.log('Окна: Скрываем все окна.');
		for (var i = 0; i < this._windows.length; i++ ) {
			this._windows[i].win.minimize();
        }
		this._locked = false;		
	},
	
	allShow: function(obj, data){
		this._locked = true;
		this.log('Окна: Отображаем все окна.');
		for (var i = 0; i < this._windows.length; i++ ) {
			this._windows[i].win.setVisible(true);
        }
		this._locked = false;
		this.toFront();		
	},
	
	toFront: function(){
		this.log('Окна: На передний план активное окно.');
		for (var i = this._windows.length; i > 0 ; i-- ) {
			if (this._windows[i-1].win.isVisible()) {
				this._windows[i-1].win.toFront();
				break;
			}
        }	
	},
	
	//---------------------------------------------------------------------------------------------------------------
	createWin: function(fname,uname,data){
		var uname = uname || fname;
		var	win = this.getWinByName(uname);
		if (win) {
			win.toFront();
		} else {
			win = Ext.create('App.components.window.WindowClient', {FormName:fname, ItemId: uname, conf:data});			
			if (win.InitFn) {win.InitFn(win);}
			win.show();
		}
		return win;
	},
	
	//---------------------------------------------------------------------------------------------------------------
	LoadClientWin: function(fname,uname,data){
		var uname = uname || fname;
		var	win = this.getWinByName(uname);
		if (win) {
			win.toFront();
		} else {
			win = Ext.create('App.components.window.WindowClient', {FormName:fname, ItemId: uname, conf:data});			
			if (win.InitFn) {win.InitFn(win);}
			win.show();
		}
		return win;
	},
	
	//---------------------------------------------------------------------------------------------------------------
	LoadServerWin: function(src, name, parent, conf){
		var name = name || src,
			win  = this.getWinByName(name);
		if (win) {
			win.toFront();
		} else {
			win = Ext.create('App.components.window.WindowServer', {src: src, name:name, parent:parent, conf: conf});
			win.show();
			win.loader.load();
		}
		return win;
	},
	
	//---------------------------------------------------------------------------------------------------------------
	LoadDbWin: function(src, name, parent, conf){
		var name = name || src,
			win  = this.getWinByName(name);
		if (win) {
			win.toFront();
		} else {
			var data = App.Meta.getWindow(src);
			if (data){
				win = Ext.create('App.components.window.WindowDb', {src: src, name:name, parent:parent, conf: conf});
				if (win.load(data)){
					win.show();
				}
			} else {
				return undefined;
			}
		}
		return win;
	},
	
	// Вывод лога
	log:function(msg){
		if (this._showlogs) {
			console.log(msg);
		}
	},	
}