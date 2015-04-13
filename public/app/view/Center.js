Ext.define('App.view.Center', {
    extend: 'Ext.Panel', 
	
	requires: [
        'App.common.Window',
    ],
	
	id : 'centralPanel',
	
	border: true,
	region: 'center',
	padding: 1,
	layout: 'anchor',
	
    initComponent: function() {
		var me = this;
		
		//var winPanel=Ext.create('Ext.Panel', {
            //title: 'winPanel',
            //flex: 1,
			//height: '100%',
		//	border: false,
        //    anchor: '0, -40',
		//	id : 'winPanel',
        //});
		
		//var trayPanel=Ext.create('Ext.panel.Panel', {
            //title: 'trayPanel',
            //height: 40,
        //    id : 'trayPanel',
        //});
		
		Ext.apply(me, {
		items: [
				//winPanel,
				//trayPanel
			],	
		//bbar: [],
		});
		
		me.bbar = Ext.create('Ext.toolbar.Toolbar', {
			enableOverflow    : true,  
			items: [
					Ext.create('Ext.Button', {
						id: 'button_close_all',
						//text: 'Закрыть все окна',
						icon: 'images/ico/form_close.png',
						handler: function() {
							App.Event.fire('win_all_close',{sender:this});
						},
						listeners: {
						  afterrender: function() {
							Ext.create('Ext.tip.ToolTip',{
							  target: 'button_close_all',
							  html: 'Закрыть все окна',
							  anchor: 'top'
							});
						  }
						},
					}),
					Ext.create('Ext.Button', {
						id: 'button_hide_all',
						//text: 'Свернуть все окна',
						icon: 'images/ico/form_hide.png',
						handler: function() {
							App.Event.fire('win_all_minimize',{sender:this});
						},
						listeners: {
						  afterrender: function() {
							Ext.create('Ext.tip.ToolTip',{
							  target: 'button_hide_all',
							  html: 'Свернуть все окна',
							  anchor: 'top'
							});
						  }
						},
					}),
					Ext.create('Ext.Button', {
						id: 'button_show_all',
						//text: 'Развернуть все окна',
						icon: 'images/ico/form_show.png',
						handler: function() {
							App.Event.fire('win_all_show',{sender:this});
						},
						listeners: {
						  afterrender: function() {
							Ext.create('Ext.tip.ToolTip',{
							  target: 'button_show_all',
							  html: 'Развернуть все окна',
							  anchor: 'top'
							});
						  }
						},
					}),
					'-',
					]
		});
		
        me.callParent(arguments);
    }
});