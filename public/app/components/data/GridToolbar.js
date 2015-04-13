/*
	Компонента отображения тулбара для таблицы
	
	Родительская таблица me.grid
	
	Настройки по-умолчанию переопределяются через свойство родительской таблицы setting.toolbar
*/
Ext.define("App.components.data.GridToolar", {
    //requires: [
    //    'Ext.toolbar.*',
    //],
	extend: 'Ext.toolbar.Toolbar',
	alias	: 'widget.TGridToolbar',
    //height: 48,
    border: false,
				
    initComponent: function() {
        //Определение области видимости
		var me	  = this,
			grid  = me.grid;
			
			// Параметры по-умолчанию
			me.actions = {
				select:	{itemId: 'select', hidden: true,  disabled: false, scale: 'medium',	tooltip:'Выбрать',		text:'Выбрать',		  icon: 'images/ico/select24.png'},
				create:	{itemId: 'create', hidden: false, disabled: true,  scale: 'medium', tooltip:'Добавить',		text:'Добавить',	  icon: 'images/ico/add24.png'},
				copy:	{itemId: 'copy',   hidden: false, disabled: false, scale: 'medium', tooltip:'Копировать',	text:'Копировать',	  icon: 'images/ico/copy24.png'},
				edit:	{itemId: 'edit',   hidden: false, disabled: false, scale: 'medium', tooltip:'Редактировать',text:'Редактировать', icon: 'images/ico/edit24.png'},
				delete:	{itemId: 'delete', hidden: false, disabled: false, scale: 'medium', tooltip:'Удалить',		text:'Удалить',		  icon: 'images/ico/delete24.png'},
			}
	
			// Переопределение параметров
			Ext.apply(me, me.grid.setting.toolbar);
			
			
			// Если определена родительская запись
			if ((me.grid.setting.ParentRecord) && (me.grid.setting.ParentRecord.data.id=='-')){
				me.actions.create.disabled = true;
			}
			
			// Формируем список кнопок
			me.items = [
				me.actions.select,
				me.actions.create,
				me.actions.copy,
				me.actions.edit,
				me.actions.delete,
			];
			
			App.components.GridToolbar.superclass.initComponent.apply(me, arguments); 


			//---------------------------------------------------------------------------------------------
			// ON ACTION SELECT
			// Выбрать (вынесли в отдельную функцию чтобы можно было её вызвать при двойном клике на строку)
			me.getComponent('select').clickaction = function(){
                var data =  {
					sender:	 this,
					target:	 '',
					grid:	 grid,
					record:	 grid.getSelectionModel().selected.items[0],
                    url:	 grid.store.proxy.url,
                    setting: grid.setting,
                    itemId:	 grid.itemId,
                    family:	 grid.family
				}
				App.Event.fire('rec_select', data);
            }; 
			me.getComponent('select').on('click',me.getComponent('select').clickaction);
			 
			//---------------------------------------------------------------------------------------------
			// ON ACTION CREATE 
            me.getComponent('create').on('click',function(){
			   //var rec = grid.store.add([{"id":"-"}]);
			   var data =  {
					sender:	this,
					target:	'',
					grid:	grid,
					record:	undefined, //rec[0],
                    url:	grid.store.proxy.url,
                    setting:grid.setting,
                    itemId:	grid.itemId,
                    family:	grid.family
				}
				App.Event.fire('rec_add', data);
             });
			
			//---------------------------------------------------------------------------------------------
			// ON ACTION EDIT
			// Редактировать (вынесли в отдельную функцию чтобы можно было её вызвать при двойном клике на строку)
			me.getComponent('edit').clickaction = function(){
                var data =  {
					sender:	this,
					target:	'',
					grid:	grid,
					record:	grid.getSelectionModel().selected.items[0],
                    url:	grid.store.proxy.url,
                    setting:grid.setting,
                    itemId:	grid.itemId,
                    family:	grid.family
				}
				App.Event.fire('rec_edit', data);
            };			
			me.getComponent('edit').on('click', me.getComponent('edit').clickaction);
			
			//---------------------------------------------------------------------------------------------
			// ON ACTION COPY 
			me.getComponent('copy').on('click',function(){
                var data =  {
					sender:	this,
					target:	'',
					grid:	grid,
					record:	grid.getSelectionModel().selected.items[0].copy(),
                    url:	grid.store.proxy.url,
                    setting:grid.setting,
                    itemId:	grid.itemId,
                    family:	grid.family
				}
				//data.record.data.id = '-';
				App.Event.fire('rec_edit', data);
             });
			 
			//---------------------------------------------------------------------------------------------
			// ON ACTION DELETE
			me.getComponent('delete').on('click',function(){
                var data =  {
					sender:	this,
					target:	'',
					grid:	grid,
					record:	grid.getSelectionModel().selected.items[0],
                    url:	grid.store.proxy.url,
                    setting:grid.setting,
                    itemId:	grid.itemId,
                    family:	grid.family
				}
				App.Event.fire('rec_delete', data);
             });
			 
			
    }
})
