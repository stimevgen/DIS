(function(){try{
var ThisWin = App.Window.getWinById(WinId);	
if (!ThisWin){
	Ext.Msg.alert({
		title:'Ошибка окна!',
		msg: 'Не найдено окно "'+WinId+'" для отображения контента.',
		icon: Ext.MessageBox.WARNING,    // иконка мб {ERROR,INFO,QUESTION,WARNING}
		buttons: Ext.Msg.OK,
		modal: true,
	});
	return;
}

var Timers = new Ext.util.TaskRunner();
// Защитный Timer не активности окна
var timerContentTimeOut = Timers.newTask({
	run: function () {
		Ext.Msg.alert({
			title:'Ошибка окна!',
			msg: 'Окно "'+ThisWin.name+' ['+ThisWin.id+']" не отвечает.',
			icon: Ext.MessageBox.WARNING,    // иконка мб {ERROR,INFO,QUESTION,WARNING}
			buttons: Ext.Msg.OK,
			modal: true,
			fn: function(btn) {
				if (ThisWin) {ThisWin.close();}
				timerContentTimeOut.destroy();
			}
		});
	},
	interval: 5000
});
timerContentTimeOut.start();

ThisWin.Elements = {};

//============================================================================================================================
//============================================================================================================================
//             #     #  #  #    #        #######  #        #######  #     #  #######  #    #  #######   ######   
//             #     #  #  ##   #        #        #        #        ##   ##  #        ##   #     #     #         
//             #     #  #  # #  #        ####     #        ####     # # # #  ####     # #  #     #      #####    
//             #  #  #  #  #  # #        #        #        #        #  #  #  #        #  # #     #           #   
//              ## ##   #  #   ##        #######  #######  #######  #     #  #######  #   ##     #     ######    
//============================================================================================================================
//============================================================================================================================

//----------------------------------------
//            ELEMENT Store1
//----------------------------------------
var Store1 = ThisWin.Elements.Store1 = Ext.create('App.components.data.Store',{
	fields:  [
		{name: 'id',	 type: 'int'	},
		{name: 'name',   type: 'string'	},
		{name: 'alias',  type: 'string'	},
		{name: 'config', type: 'string'	},
	],
	proxy: App.ProxyDB('sys.tables'),
	listeners: {
		refresh: onStoreRefresh,
	}
});

//----------------------------------------
//            ELEMENT Store2
//----------------------------------------
var Store2 = ThisWin.Elements.Store2 = Ext.create('App.components.data.Store',{
	fields:  [
		{name: 'id',	 type: 'int'	},
		{name: 'name',   type: 'string'	},
	],		
	proxy: App.ProxyDB('users'),
	listeners: {
		refresh: onStoreRefresh,
	},
});
		
//----------------------------------------
//            ELEMENT Grid1
//----------------------------------------
var Grid1 = ThisWin.Elements.Grid1 = Ext.create('App.components.data.Grid', {
	conf:{
		store: Store1,
		columns: [
			{ text: 'Id', 		dataIndex: 'id'		},
			{ text: 'Name',		dataIndex: 'name'	},
			{ text: 'Alias',	dataIndex: 'alias'	},
			{ text: 'Config',	dataIndex: 'config'	},
		],
		listeners: {cellclick: onGridCellClick,},
	}
});

//----------------------------------------
//            ELEMENT Grid2
//----------------------------------------
var Grid2 = ThisWin.Elements.Grid2 = Ext.create('App.components.data.Grid', {
	conf:{
		store: Store2,
		columns: [
			{ text: 'Id', 		dataIndex: 'id'		},
			{ text: 'Name',		dataIndex: 'name'	},
		],
		listeners: {cellclick: onGridCellClick,},
	}
});
		
	
//----------------------------------------
//            ELEMENT Button1
//----------------------------------------
var Button1 = ThisWin.Elements.Button1 = Ext.create('Ext.Button', {
	text: 'Button1',
	listeners: {click: onButton1Click,},
});

//----------------------------------------
//        ELEMENT Base Container
//----------------------------------------
var Container = ThisWin.Elements.Container = Ext.create('Ext.container.Container', {
	items: [Button1,Grid1,Grid2],
	listeners: {render: onConteinerRender,},
});

//----------------------------------------
//            WINDOW EVENTS
//----------------------------------------
ThisWin.on({
	/*activate			: onWinActivate,
	add					: onNull,
	added				: onNull,
	afterlayout			: onNull,
	afterrender			: onNull,
	beforeactivate		: onNull,
	beforeadd			: onNull,
	beforeclose			: onNull,
	beforecollapse		: onNull,
	beforedeactivate	: onNull,
	beforedestroy		: onNull,
	beforeexpand		: onNull,
	beforehide			: onNull,
	beforeremove		: onNull,
	beforerender		: onNull,
	beforeshow			: onNull,
	beforestaterestore	: onNull,
	beforestatesave		: onNull,
	blur				: onNull,
	boxready			: onNull,
	close				: onNull,
	collapse			: onNull,
	deactivate			: onNull,
	destroy				: onWinDestroy,
	disable				: onNull,
	dockedadd			: onNull,
	dockedremove		: onNull,
	enable				: onNull,
	expand				: onNull,
	float				: onNull,
	focus				: onNull,
	glyphchange			: onNull,
	hide				: onNull,
	iconchange			: onNull,
	iconclschange		: onNull,
	maximize			: onWinMaximize,
	minimize			: onWinMinimize,
	move				: onNull,
	remove				: onNull,
	removed				: onNull,
	render				: onNull,
	resize				: onNull,
	restore				: onNull,
	show				: onNull,
	staterestore		: onNull,
	statesave			: onNull,
	titlechange			: onNull,
	unfloat				: onNull,*/
	scope: this
});
	
	
//============================================================================================================================
//============================================================================================================================
//                               #######  #     #  #######  #    #  #######   ######   
//                               #        #     #  #        ##   #     #     #         
//                               ####      #   #   ####     # #  #     #      #####    
//                               #          # #    #        #  # #     #           #   
//                               #######     #     #######  #   ##     #     ######    
//============================================================================================================================
//============================================================================================================================

function onWinCreate(obj) {
	obj.setTitle(obj.name+' ['+obj.id+']');
	obj.setIcon('images/ico/table16.png');
	obj.height = 300;
	obj.width  = 600;
}


function onGridCellClick( obj, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
	console.log('onGridCellClick', rowIndex);
}

function onStoreRefresh(obj, eOpts){
	console.log('onStoreRefresh', obj);
}

function onButton1Click( obj, e, eOpts ){
	Store1.reload();
	Store2.reload();
}

function onConteinerRender( obj, eOpts ) {
	console.log('ConteinerRender', obj.id);
}

//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================	
	
timerContentTimeOut.destroy();
if (typeof(onWinCreate)==='function') {onWinCreate(ThisWin);}
	
ThisWin.add(Container);
ThisWin.doLayout();
	
} catch (err) {
	//console.log(err);
	timerContentTimeOut.destroy();
	Ext.Msg.alert({
		title:'Ошибка окна!',
		msg: err.message+'\n'+err.stack,
		icon: Ext.MessageBox.WARNING,    // иконка мб {ERROR,INFO,QUESTION,WARNING}
		buttons: Ext.Msg.OK,
		modal: true,
		fn: function(btn) {
			if (ThisWin) {ThisWin.close();}
		}
    });	
}}());