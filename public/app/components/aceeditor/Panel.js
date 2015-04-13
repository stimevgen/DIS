Ext.define('App.components.aceeditor.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.AceEditor',
    mixins: {
        editor: 'App.components.aceeditor.Editor'
    },
    layout: 'fit',
    autofocus: true,
    border: false,
	//autoEl: {
    //    tag: 'div',
    //    cls: 'ace_editor ace-eclipse',
    //    style: 'position:relative;'
    //},
	
    listeners: {
        resize: function()
        {
            if(this.editor)
            {
                this.editor.resize();
            }
        },
        activate: function()
        {
            if(this.editor && this.autofocus)
            {
                this.editor.focus();
            }
        }
    },
    
    initComponent: function()
    {
        var me = this,
            items = {
                xtype: 'component',
                autoEl: {
					tag: 'div',
					cls: 'ace_editor ace-eclipse',
					style: 'position:relative;'
				},
            };

        Ext.apply(me, {
            items: items
        });
        
        me.callParent(arguments);
    },
    
    onRender: function()
    {
        var me = this;

        if(me.sourceEl != null)
        {
            //me.sourceCode = Ext.get(me.sourceEl).getHTML();
            //me.sourceCode = Ext.get(me.sourceEl).dom.innerHTML; 
            Ext.get(me.sourceEl).dom.outerText; 
            //me.sourceCode = Ext.get(me.sourceEl).dom.value;
        }
        
        me.editorId = me.items.keys[0];
        me.oldSourceCode = me.sourceCode;
		
        me.callParent(arguments);

		//me.initEditor();
		
        // init editor on afterlayout
        me.on('afterlayout', function()
        {
            if(me.url)
            {
                Ext.Ajax.request({
                    url: me.url,
                    success: function(response)
                    {
                        me.sourceCode = response.responseText;
                        me.initEditor();
                    }
                });
            }
            else
            {
                me.initEditor();
				if(this.editor && this.autofocus)
				{
					this.editor.focus();
				}
            }
            
        }, me, {
            single: true,
        });
    }
});