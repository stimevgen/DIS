Ext.define('App.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    requires: [
        'App.view.Top',
        //'App.view.Left',
		'App.view.Center',
        //'App.view.Right',
        //'App.view.Bottom'
    ],
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'panel',
                    border: false,
					id    : 'viewport',
                    //layout: {
                    //    type: 'vbox',
                    //    align: 'stretch'
                    //},
					layout: {
						type: 'border',
						padding: 1,
					},
					defaults: {
						//	split: true
						//border: true,
					},
                    
                    dockedItems: [
                        
                    ],
                    
                    items: [
						Ext.create('App.view.Top'),
                        //Ext.create('App.view.Left'),
						Ext.create('App.view.Center'),
						//Ext.create('App.view.Right'),
						//Ext.create('App.view.Bottom'),
                        //Ext.create('App.view.user.List'),
                        //Ext.create('App.view.user.List')
                    ]
                }
            ]
        });
                
        me.callParent(arguments);
    }
});