(function(){
try{
var ThisWin = App.Window.getWinById(curid);	
if (!ThisWin){
	console.log('Не найдена форма "'+curid+'" для отображения контента.');
	return;
}

ThisWin.Elements = {};
//----------------------------------------
//            ELEMENT Store1
//----------------------------------------
Store1 = Ext.create('App.components.data.Store',{

    fields:  [
		{name: 'id',	 type: 'int'	},
		{name: 'name',   type: 'string'	},
		{name: 'alias',  type: 'string'	},
		{name: 'config', type: 'string'	},
	],
			
	proxy: {
        url: '/api/db/sys.tables',  
    	type: 'rest',
		reader: {
            type: 'json',
            root: 'data'
		}
    },
});

ThisWin.Elements.Store1 = Store1;

//----------------------------------------
//            ELEMENT Store2
//----------------------------------------
Store2 = Ext.create('App.components.data.Store',{

    fields:  [
		{name: 'id',	 type: 'int'	},
		{name: 'name',   type: 'string'	},
	],
			
	proxy: {
        url: '/api/db/users',  
    	type: 'rest',
		reader: {
            type: 'json',
            root: 'data'
		}
    },
});

Store2.on({
	refresh: onStore2Refresh,
	scope: this
});

ThisWin.Elements.Store2 = Store2
		
//----------------------------------------
//            ELEMENT Grid1
//----------------------------------------
Grid1 = Ext.create('App.components.data.Grid', {
	conf:{
		store: Store1,
		columns: [
			{ text: 'Id', 		dataIndex: 'id'		},
			{ text: 'Name',		dataIndex: 'name'	},
			{ text: 'Alias',	dataIndex: 'alias'	},
			{ text: 'Config',	dataIndex: 'config'	},
		],
	}
});

Grid1.on({
	cellclick: onGrid1CellClick,
	scope: this
});

ThisWin.Elements.Grid1 = Grid1;

//----------------------------------------
//            ELEMENT Grid2
//----------------------------------------

Grid2 = Ext.create('App.components.data.Grid', {
	conf:{
		store: Store2,
		columns: [
			{ text: 'Id', 		dataIndex: 'id'		},
			{ text: 'Name',		dataIndex: 'name'	},
		],
	}
});

ThisWin.Elements.Grid2 = Grid2;
	
//----------------------------------------
//            ELEMENT Button1
//----------------------------------------
Button1 = Ext.create('Ext.Button', {
    text: 'Button1',
});

Button1.on({
	click: onButton1Click,
	scope: this
});

ThisWin.Elements.Button1 = Button1;

	
//----------------------------------------
//            WINDOW EVENTS
//----------------------------------------
ThisWin.on({
	activate			: onWinActivate,
	/*add					: onNull,
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
	deactivate			: onNull,*/
	destroy				: onWinDestroy,
	/*disable				: onNull,
	dockedadd			: onNull,
	dockedremove		: onNull,
	enable				: onNull,
	expand				: onNull,
	float				: onNull,
	focus				: onNull,
	glyphchange			: onNull,
	hide				: onNull,
	iconchange			: onNull,
	iconclschange		: onNull,*/
	maximize			: onWinMaximize,
	minimize			: onWinMinimize,
	/*move				: onNull,
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
	
	ThisWin.add(new Ext.Panel({
		layout	: 'anchor',
		items: [Button1,Grid1,Grid2],
	}));
	ThisWin.doLayout();
	
	
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//debugger;

function onWinCreate(obj) {
	obj.setTitle('Тестовая форма2');
	obj.setIcon('images/ico/table16.png');
	obj.height = 300;
	obj.width  = 600;
}

function onWinActivate(obj, options) {
	console.log('onActivate', obj);
}
	
function onWinMinimize(obj, options) {
	console.log('onMinimize', obj);
}

function onWinMaximize(obj, options) {
	console.log('onMaximize', obj);
}

function onWinDestroy(obj, options) {
	console.log('onDestroy', obj);
}

function onGrid1CellClick( obj, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
	console.log('onGrid1CellClick', rowIndex);
}

function onStore2Refresh(obj, eOpts){
	console.log('onStore2Refresh', obj);
}

function onButton1Click( obj, e, eOpts ){
	Store1.reload();
	Store2.reload();
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
	
	
	if (typeof(onWinCreate)==='function') {onWinCreate(ThisWin);}
	//------------------------------------------------------------
	
} catch(err){
	console.log('Form error', err);
}})();