Ext.define("App.common.CommonGridTBar", {
    //requires: [
    //    'Ext.toolbar.*',
    //],
	extend: 'Ext.toolbar.Toolbar',
    //height: 48,
    border: false,
	//items:[
    //    {itemId:'select',	scale: 'large', text:'Выбрать',			icon: 'images/ico/select32.png'},
	//	{itemId:'create',	scale: 'large', text:'Добавить',		icon: 'images/ico/add32.png'},
    //    {itemId:'edit',		scale: 'large', text:'Редактировать',	icon: 'images/ico/edit32.png'},
    //    {itemId:'delete',	scale: 'large', text:'удалить',			icon: 'images/ico/delete32.png'},
	//],
				
    initComponent: function() {
        var
			me				= this,
			grid			= me.grid,
			
			allow_select	= false,
			allow_add		= true,
			allow_edit		= true,
			allow_copy		= true,
			allow_delete	= true,
			
			disabled_select	= true,
			disabled_add	= false,
			disabled_edit	= true,
			disabled_copy	= true,
			disabled_delete	= true;
			
			Ext.apply(me, me.grid.setting.toolbar);
			
			if ((me.grid.setting.ParentRecord) && (me.grid.setting.ParentRecord.data.id=='-')){
				disabled_add	= true;
			}
			//if (me.gridLink.grid.allow_select	!== undefined) {allow_select	= me.grid.conf.allow_select;}
			//if (me.gridLink.conf.allow_add		!== undefined) {allow_add		= me.grid.conf.allow_add;}
			//if (me.gridLink.conf.allow_edit		!== undefined) {allow_edit		= me.grid.conf.allow_edit;}
			//if (me.gridLink.conf.allow_copy		!== undefined) {allow_copy		= me.grid.conf.allow_copy;}
			//if (me.gridLink.conf.allow_delete	!== undefined) {allow_delete	= me.grid.conf.allow_delete;} 
			
			me.items = [
				{itemId:'select',	scale: 'medium', tooltip:'Выбрать',			text:'Выбрать',			hidden: !allow_select,	disabled: disabled_select,	icon: 'images/ico/select24.png'},
				{itemId:'create',	scale: 'medium', tooltip:'Добавить',		text:'Добавить',		hidden: !allow_add,		disabled: disabled_add,		icon: 'images/ico/add24.png'},
				{itemId:'copy',		scale: 'medium', tooltip:'Копировать',		text:'Копировать',		hidden: !allow_copy,	disabled: disabled_copy,  	icon: 'images/ico/copy24.png'},
				{itemId:'edit',		scale: 'medium', tooltip:'Редактировать',	text:'Редактировать',	hidden: !allow_edit,	disabled: disabled_edit,  	icon: 'images/ico/edit24.png'},
				{itemId:'delete',	scale: 'medium', tooltip:'Удалить',			text:'Удалить',			hidden: !allow_delete,	disabled: disabled_delete,  icon: 'images/ico/delete24.png'},
			];
			
			App.common.CommonGridTBar.superclass.initComponent.apply(me, arguments); 
			
			//appForm = grid.searchClass+'FormSearch';
            //Ext.require(
            //    appForm, function(){
            //        var form = Ext.create(appForm,{grid:grid});
            //        me.add(['->',form]);
            //    }
            //);
			
			// Выбрать (вынесли в отдельную функцию чтобы можно было её вызвать при двойном клике на строку)
			me.getComponent('select').clickaction = function(){
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
				App.Event.fire('rec_select', data);
            }; 
			me.getComponent('select').on('click',me.getComponent('select').clickaction);
			 
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
