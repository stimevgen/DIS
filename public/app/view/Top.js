Ext.define('App.view.Top', {
    extend: 'Ext.Panel',

    //height: 60,
	region: 'north',
	padding: 1,
    border: false,
	layout: 'fit',
	
    initComponent: function() {
		var me = this;
		
	    //Ext.applyIf(me, {
        //    html: '<h1>Конфигуратор</h1>'
        //});
		
		var menu1 = App.view.Top.menu1 = Ext.create('Ext.toolbar.Toolbar', {
			enableOverflow    : true,  
			//height: 26,
			frame: true,
			border: false,
			items: []
		});
	
	
		var menu2 = App.view.Top.menu2 = Ext.create('Ext.toolbar.Toolbar', {
			enableOverflow    : true,  
			//height: 26,
			flex: 1,
			//frame: true,
			border: false,
			items: [],
		})
			
		var menu3 = App.view.Top.menu3 = Ext.create('Ext.toolbar.Toolbar', {
			enableOverflow    : true,  
			//height: 48,
			//frame: true,
			border: false,
			items: [
					Ext.create('Ext.Button', {
						//height: 44,
						text: App.CONST.Me.name+' ('+App.CONST.Me.role+')',
						icon: 'images/ico/user16.png',
						handler: function() {
							Ext.Ajax.request({
								url: App.CONST.api.logout,
								method: 'POST',
								params: {
									ssid: App.CONST.Me.ssid
								},
								success: function(response){
									var resp = Ext.JSON.decode(response.responseText);
									if (resp.success) {
										Ext.util.Cookies.clear('DIS_SESSION_KEY');
										location.reload();
									} else {
										Ext.Msg.alert('Error',resp.type+'<br>'+resp.message);
									}
								},
								failure: function(response, opts) {
									Ext.Msg.alert('Error', response.status);
								}
							});
						}
					}),
					]
		});

		var TopPanel = App.view.Top.TopPanel = Ext.create('Ext.panel.Panel', {
			layout: 'anchor',
			border: false,
			items: [{
				xtype:'panel',
				border: false,
				frame: true,
				//anchor: '50',
				html: '<img height="40px" width="80px" src="images/logoSmall.jpg">'
			},{
				xtype:'panel',
				border: false,
				layout: 'hbox',
				items: [menu1,  menu2, menu3]
			}]
		});

		me.items = [TopPanel];
                
        me.callParent(arguments);
    }
});