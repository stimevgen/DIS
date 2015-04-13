Ext.define("App.common.CommonTree",{
    extend: 'Ext.tree.Panel',
    alias	: "widget.commontree",
    
	requires: [
		'App.common.CommonTreeTBar',
	//	'Ext.PagingToolbar',
	//	'Ext.ux.grid.FiltersFeature',
    ], 
	
	 
    initComponent: function() {
        var me = this;
		
		Ext.apply(me, me.conf);
		
		me.columns = me.setting.columns;
        
		me.store = Ext.create('Ext.data.TreeStore', {
			proxy: {
				type: 'ajax',
				url: me.setting.url,
			},
			root: {
				text: 'Объекты',
				id: '0',
				expanded: true
			},
			//folderSort: true,
			//sorters: [{
			//	property: 'text',
			//	direction: 'ASC'
			//}//]
		});	
		
		
		me.tbar = new App.common.CommonTreeTBar({tree: me});
		
		me.getSelectionModel().on('selectionchange', function(selModel, selections) {
			me.down('#select').setDisabled(selections.length === 0);
			me.down('#edit').setDisabled(selections.length === 0);
			me.down('#copy').setDisabled(selections.length === 0);
			me.down('#delete').setDisabled(selections.length === 0);
		}, me);
		
		App.common.CommonTree.superclass.initComponent.apply(me, arguments);
    },
});