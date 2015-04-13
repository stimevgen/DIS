
Ext.define('App.components.aceeditor.Editor', {
    extend: 'Ext.util.Observable',
    path: '',
    sourceCode: '',
    autofocus: true,
    fontSize: '12px',
    theme: 'clouds',
	mode: 'javascript',
    printMargin: false,
    printMarginColumn: 80,
    highlightActiveLine: true,
    highlightGutterLine: true,
    highlightSelectedWord: true,
    showGutter: true,
    fullLineSelection: true,
    tabSize: 4,
    useSoftTabs: false,
    showInvisible: false,
    useWrapMode: false,
    codeFolding: true,
    readonly: false,
	
    constructor: function(owner, config)
    {
        var me = this;
        me.owner = owner;      
        
        me.addEvents({
            'editorcreated': true
             },
            'change');      

        me.callParent();
    },
    
    initEditor: function()
    {
        var me = this;       
		
        me.editor = ace.edit(me.editorId);
        me.editor.ownerCt = me;
        me.editor.$blockScrolling = true;
		
        me.setTheme(me.theme);
		me.setMode(me.mode);
		
        me.editor.setShowFoldWidgets(me.codeFolding);
        me.editor.setShowInvisibles(me.showInvisible);
        me.editor.setHighlightGutterLine(me.highlightGutterLine);
        me.editor.setHighlightSelectedWord(me.highlightSelectedWord);
        me.editor.renderer.setShowGutter(me.showGutter);
        me.editor.setFontSize(me.fontSize);
        me.editor.setShowPrintMargin(me.printMargin);
        me.editor.setPrintMarginColumn(me.printMarginColumn);
        me.editor.setHighlightActiveLine(me.highlightActiveLine);
		
		
		me.editor.getSession().setUseWrapMode(me.useWrapMode);
        me.editor.getSession().setTabSize(me.tabSize);
        me.editor.getSession().setUseSoftTabs(me.useSoftTabs);
        me.editor.getSession().setValue(me.sourceCode);
		
		me.editor.setReadOnly(me.readonly);
		
        me.editor.getSession().on('change', function()
        {
            me.fireEvent('change', me);  
        }, me);
        
        if(me.autofocus)
            me.editor.focus();
        else
        {
            me.editor.renderer.hideCursor();
            me.editor.blur();
        }
        
        me.editor.initialized = true;
        me.fireEvent('editorcreated', me);
    },
    
    getEditor: function()
    {
		if (!this.editor) {
			this.initEditor();
		}
		return this.editor;
    },
    
    getSession: function()
    {
		if (!this.editor) {
			this.initEditor();
		}
        return this.editor.getSession();
    },
    
    setTheme: function(name)
    {
        this.theme = name;
		if (this.editor) {
			this.editor.setTheme("ace/theme/" + name);
		}
    },
	
	setReadOnly: function(value)
    {
		this.readonly = value;
		if (this.editor) {
			this.editor.setReadOnly(this.readonly);
		}
    },
    
    setMode: function(mode)
    {
		this.mode = mode;
		if (this.editor) {
			this.editor.getSession().setMode("ace/mode/" + mode);
		}
    },
    
    getValue: function()
    {
		if (this.editor){
			return this.editor.getSession().getValue();
		} else {
			return this.sourceCode;
		}
    },
    
    setValue: function(value)
    {
		this.sourceCode = value;
		if (this.editor){
			this.editor.getSession().setValue(value);
		}
    },
    
    setFontSize: function(value)
    {
        this.fontSize = value;
		if (this.editor) {
			this.editor.setFontSize(value);
		}
    },
    
    undo: function()
    {
        this.editor.undo();
    },
    
    redo: function()
    {
        this.editor.redo();
    }
});
