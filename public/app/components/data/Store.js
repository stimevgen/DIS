/**
 * Small helper class to create an {@link Ext.data.Store}
 *
 */
Ext.define('App.components.data.Store', {
    /* Begin Definitions */
    
    extend: 'Ext.data.Store',

    alias:  'store.TStore',
   
    autoLoad:       true,
	autoSync:		false,
	pageSize:       25,
    remoteFilter:   true,
	remoteSort:     true,
	disableCaching: true,
	sorters:		'id',
	
    /* End Definitions */

    constructor : function(config){
        config = Ext.apply({}, config);
        if (!config.proxy) {
            var proxy = {
                type: 'rest',
                reader: {
                    type: 'json'
                }
            };
            Ext.copyTo(proxy, config, 'paramOrder,paramsAsHash,directFn,api,simpleSortMode');
            Ext.copyTo(proxy.reader, config, 'totalProperty,root,idProperty');
            config.proxy = proxy;
        }
        this.callParent([config]);
    }    
});