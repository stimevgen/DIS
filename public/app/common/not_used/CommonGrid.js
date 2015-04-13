Ext.define("App.common.CommonGrid",{
    extend: 'Ext.grid.Panel',
    alias	: "widget.commongrid",
    
	requires: [
		'App.common.CommonGridTBar',
		'Ext.PagingToolbar',
		//'Ext.ux.grid.FiltersFeature',
    ], 
	
	border	: false,
	padding	: 0,
	layout	: 'fit',
	
	features: [{
        ftype: 'filters',
        encode: true,
        local: false
    }],
	
    initComponent: function() {
        var me = this;
		
		//------------------------------------------------------------------------------------------------------------------------------
		//
		//            ПОЛУЧАЕМ ПАРАМЕТРЫ
		//
		//------------------------------------------------------------------------------------------------------------------------------
		// Default
		//grid:{
		//	url:		'../test1.ru/index.php/Ajax/Db/',
		//	tablename:	'types',
		//	addform:	'TypeEdit',
		//	defvalue:	[name:'Новый тип'],
		//	editform:	'TypeEdit',
		//	fields:		['id','name','alias','config'];
		//	filter:	[],
		//	sort:	[],
		//	columns:[
        //          {text: 'Название',     dataIndex: 'name',   hidden: false, 	flex: 1,},
		//		  {text: 'Псевдоним',    dataIndex: 'alias',  hidden: false, 	flex: 1,},
        //    ]
		//}

		Ext.apply(me, me.conf);
		
		//var i,fields=[];

		//for (i in me.columns) {
		//	if (me.columns[i].dataIndex) fields.push(me.columns[i].dataIndex);
        //}
        
		me.columns = me.setting.columns;
		
		//------------------------------------------------------------------------------------------------------------------------------
		//
		//            СОЗДАЕМ STORE
		//
		//------------------------------------------------------------------------------------------------------------------------------		
		me.store= Ext.create('Ext.data.Store',{
            autoLoad: true,
			pageSize: 25,
            remoteFilter: true,
			remoteSort:  true,
			disableCaching: true,
			
			filters: me.setting.filter,
			sorters: me.setting.sort,
            fields:  me.setting.fields,
            /*
			//ajax
            proxy: {
                url: me.setting.url,  //
           		type: 'ajax',
				actionMethods: {create: "POST", read: "POST", update: "POST", destroy: "POST"},
				extraParams: {table: me.setting.tablename},
				api: {
					create:  me.setting.url+'?action=create',
					read:    me.setting.url+'?action=read',
					update:  me.setting.url+'?action=update',
					destroy: me.setting.url+'?action=delete',
				},
				reader: {
                    type: 'json',
                    root: 'data'
                }
            },
			*/
			proxy: {
                url: me.setting.url,  
           		type: 'rest',
				reader: {
                    type: 'json',
                    root: 'data'
                }
            },
			listeners: {
               write: function(store, operation, eOpts) {
					store.load(); // На всяк случай обновляем табличку
				},
            }
        });
		
		
		//------------------------------------------------------------------------------------------------------------------------------
		//
		//            СОЗДАЕМ TOOLBAR
		//
		//------------------------------------------------------------------------------------------------------------------------------
		me.tbar = new App.common.CommonGridTBar({grid: me});
		
		me.getSelectionModel().on('selectionchange', function(selModel, selections) {
			me.down('#select').setDisabled(selections.length === 0);
			me.down('#edit').setDisabled(selections.length === 0);
			me.down('#copy').setDisabled(selections.length === 0);
			me.down('#delete').setDisabled(selections.length === 0);
		}, me);
		
		//------------------------------------------------------------------------------------------------------------------------------
		//
		//            СОЗДАЕМ BOOTOMBAR
		//
		//------------------------------------------------------------------------------------------------------------------------------
		me.bbar = new Ext.PagingToolbar({
                    border: false,
					store: me.store,
	                displayInfo: true,
                    pageSize:25,
	                displayMsg: 'Показано  {0} - {1} из {2}',
        });
		
        //App.Event.subscribe('rec_delete' ,me);  // Подписка на событие удаления записи через общий обозреватель приложения
        //App.Event.subscribe('rec_deleted',me);  // Подписка на событие удаления записи через общий обозреватель приложения
        //App.Event.subscribe('rec_changed',me);  // Подписка на событие удаления записи через общий обозреватель приложения
        //App.Event.subscribe('rec_reload',me);   // перезагрузка
        //App.Event.subscribe('rec_page',  me);   // установка пейджера на заданную страницу
		
		//me.restoreState();
		//me.stateful = 	true;
		//me.stateId = 	'grid1';
		
		//me.store.filter("id", "10");
		//me.store.filter("name", "Тестовая");
		//me.store.filter("alias", "forms");
		
		App.common.CommonGrid.superclass.initComponent.apply(me, arguments);
    },
	
    /* обработчики  ************************************************************************************************************************/
    listeners: { // события
        /* клик мышкой по ячейке таблицы */
        cellclick : function(
            grid,       // таблица
            cell,
            columnIndex,// индекс колонки
            record ,    // запись в хранилище, соотв. строке
            node ,
            rowIndex , // индекс столбца
            evt){
                //alert('cellclick');
				col = this.columns[columnIndex];
                if (col.action) {
                  App.Event.fire(col.action,{
                    sender: this,
					target: '',
					grid: grid,
					cell: cell,
					columnIndex: columnIndex,
					record: record,
					node: node,
					rowIndex: rowIndex,
					evt: evt,
                    url:  grid.store.proxy.url,
                    setting: this.setting,
                    itemId:this.itemId,
                    family:this.family});
            }
        },
		
		celldblclick : function(grid,row,col,rec){
                if (this.down('#select').isVisible()) {
					//alert('celldblclick выбрать');
					this.down('#select').clickaction();
				} else {
					//alert('celldblclick редактировать');
					this.down('#edit').clickaction();
				}	
				//col = this.conf.grid.columns[columnIndex];
                //if (col.action) {
                //  App.Event.fire(col.action,{
                //    sender: this,
				//	target: '',
				//	grid: grid,
				//	cell: cell,
				//	columnIndex: columnIndex,
				//	record: record,
				//	node: node,
				//	rowIndex: rowIndex,
				//	evt: evt,
                //    url:  grid.store.proxy.url,
                //    conf: this.conf,
                //    itemId:this.itemId,
                //    family:this.family});
				//}
        },
	},

});