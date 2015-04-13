Ext.define('App.components.CodeEditor', {
    
extend : 'Ext.Component',//Extending the TextField

    alias : 'widget.codeeditor',//Defining the xtype

    config : {
        showPrintMargin: false,
        fontSize: '14px'
    },
    
    autoEl: {
        tag: 'div',
        cls: 'ace_editor ace-eclipse',
        style: 'position:relative;'
    },

    constructor : function(cnfg) {
        this.callParent(arguments);//Calling the parent class constructor
        this.initConfig(cnfg);//Initializing the component
        this.on('resize', this.editorResize);//Associating a new defined method with an event
    },
    
    onRender: function () {
        this.callParent(arguments);
        
        this.editorObject = ace.edit(this.el.dom.id);
        this.editorObject.setTheme("ace/theme/eclipse");
        var JavaScriptMode = ace.require("ace/mode/javascript").Mode;
        this.editorObject.getSession().setMode(new JavaScriptMode());
        this.editorObject.setShowPrintMargin(this.showPrintMargin);
        this.editorObject.setFontSize(this.fontSize);
    },

    editorResize: function () {
        this.editorObject.resize();
    },
    
    setFontSize: function (value) {
        this.fontSize = value;
        if (this.editorObject)
            this.editorObject.setFontSize(value);
    },
    
    setShowPrintMargin: function (value) {
        this.showPrintMargin = value;
        if (this.editorObject)
            this.editorObject.setShowPrintMargin(value);
    },
    
    setValue: function (value) {
        this.editorObject.getSession().setValue(value);
    },
    
    getValue: function () {
        return this.editorObject.getSession().getValue();
    }
});