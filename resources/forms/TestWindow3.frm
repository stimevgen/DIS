(function(){try{
var ThisWin = App.Window.getWinById(WinId);	
if (!ThisWin){
	Ext.Msg.alert({
		title:'Ошибка окна!',
		msg: 'Не найдено окно "'+WinId+'" для отображения контента.',
		icon: Ext.MessageBox.WARNING,    // иконка мб {ERROR,INFO,QUESTION,WARNING}
		buttons: Ext.Msg.OK,
		modal: true,
	});
	return;
}

var Timers = new Ext.util.TaskRunner();
// Защитный Timer не активности окна
var timerContentTimeOut = Timers.newTask({
	run: function () {
		Ext.Msg.alert({
			title:'Ошибка окна!',
			msg: 'Окно "'+ThisWin.name+' ['+ThisWin.id+']" не отвечает.',
			icon: Ext.MessageBox.WARNING,    // иконка мб {ERROR,INFO,QUESTION,WARNING}
			buttons: Ext.Msg.OK,
			modal: true,
			fn: function(btn) {
				if (ThisWin) {ThisWin.close();}
				timerContentTimeOut.destroy();
			}
		});
	},
	interval: 5000
});
timerContentTimeOut.start();

ThisWin.Elements = {};

//============================================================================================================================
//============================================================================================================================
//             #     #  #  #    #        #######  #        #######  #     #  #######  #    #  #######   ######   
//             #     #  #  ##   #        #        #        #        ##   ##  #        ##   #     #     #         
//             #     #  #  # #  #        ####     #        ####     # # # #  ####     # #  #     #      #####    
//             #  #  #  #  #  # #        #        #        #        #  #  #  #        #  # #     #           #   
//              ## ##   #  #   ##        #######  #######  #######  #     #  #######  #   ##     #     ######    
//============================================================================================================================
//============================================================================================================================

//----------------------------------------
//            ELEMENT TreeStore
//----------------------------------------
var TreeStore = ThisWin.Elements.TreeStore = Ext.create('Ext.data.TreeStore', {
    root: {
		expanded: true,
        children: [
            {	
				text: "Основные элементы",
				leaf: false,
				expanded: true,
				children: [{	
					text: "Элемент1",
					leaf: true,
				},],
			},
			{
				text: "Дополнительные элементы",
				leaf: false,
				expanded: true,
				children: [{	
					text: "Элемент1",
					leaf: true,
				},{	
					text: "Элемент2",
					leaf: true,
				}],
			},
        ]
    }
});

//----------------------------------------
//            ELEMENT Tree
//----------------------------------------
var Tree = ThisWin.Elements.Tree = Ext.create('Ext.tree.Panel', {
    title: 'Элементы окна',
    store: TreeStore,
    rootVisible: false,
});

//----------------------------------------
//            ELEMENT TreeEdit
//----------------------------------------
var TreeEdit = ThisWin.Elements.TreeEdit = Ext.create('Ext.panel.Panel', {
    title: 'Элементы окна',
    items: [{
            xtype: 'textfield',
            id: 'txt',
            height: 20,
		},{
            xtype: 'button',
            width:60,
            height: 20,
            text:'Добавить',
            handler: function() {
                // получаем введенное в текстовое поле значение
                var newNode=centerPanel.getComponent('txt').getValue();
                // Используем метод appendChild для добавления нового объекта
                tree.getRootNode().appendChild({
                    text: newNode,
                    leaf: true
                });
            }
        },{
            xtype: 'button',
            width:60,
            height: 20,
            margin: '0 0 0 20',
            text:'Удалить',
            handler: function() {
                // получаем выделенный узел для удаления
                var selectedNode=tree.getSelectionModel().getSelection()[0];
                // если таковой имеется, то удаляем
                if(selectedNode)
                {
                    selectedNode.remove(true);
                }
            }
        }],
});


//----------------------------------------
//            ELEMENT TabPanel1Tab1
//----------------------------------------
var TabPanel1Tab1 = ThisWin.Elements.TabPanel1Tab1 = Ext.create('Ext.panel.Panel', {
    title: 'Окно',
	layout: 'fit',
	items:[{
        xtype     : 'textareafield',
        grow      : true,
        name      : 'message',
        fieldLabel: 'Message',
        anchor    : '100%'
    }],
});

//----------------------------------------
//            ELEMENT TabPanel1Tab2
//----------------------------------------
var TabPanel1Tab2 = ThisWin.Elements.TabPanel1Tab2 = Ext.create('Ext.panel.Panel', {
    title: 'Модуль',
	layout: 'fit',
	items:[{
        xtype     : 'textareafield',
        grow      : true,
        name      : 'message',
        fieldLabel: 'Message',
        anchor    : '100%'
    }],
});

//----------------------------------------
//            ELEMENT TabPanel1Tab3
//----------------------------------------
var TabPanel1Tab2 = ThisWin.Elements.TabPanel1Tab2 = Ext.create('Ext.panel.Panel', {
    title: 'Модуль',
	layout: 'fit',
	items:[{
        xtype     : 'textareafield',
        grow      : true,
        name      : 'message',
        fieldLabel: 'Message',
        anchor    : '100%'
    }],
});

//----------------------------------------
//            ELEMENT TabPanel1
//----------------------------------------
var TabPanel1 = ThisWin.Elements.TabPanel1 = Ext.create('Ext.tab.Panel', {
	activeTab: 0,
    items: [
		TabPanel1Tab1,
		TabPanel1Tab2,
    ],
});

//----------------------------------------
//            ELEMENT TabPanel1
//----------------------------------------
var Toolbar1 = Ext.create('Ext.toolbar.Toolbar', {
	items: [
        {text: 'Button'},
		{text: 'Button'},
		{text: 'Button'},
    ]
});

ThisWin.addDocked(Toolbar1);
ThisWin.add(TabPanel1);	


//============================================================================================================================
//============================================================================================================================
//                               #######  #     #  #######  #    #  #######   ######   
//                               #        #     #  #        ##   #     #     #         
//                               ####      #   #   ####     # #  #     #      #####    
//                               #          # #    #        #  # #     #           #   
//                               #######     #     #######  #   ##     #     ######    
//============================================================================================================================
//============================================================================================================================

function onWinCreate(obj) {
	obj.setTitle(obj.name+' ['+obj.id+'] Тестирование наследования объектов');
	obj.setIcon('images/ico/table16.png');
	obj.height = 300;
	obj.width  = 600;
}


function onGridCellClick( obj, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
	console.log('onGridCellClick', rowIndex);
}

function onStoreRefresh(obj, eOpts){
	console.log('onStoreRefresh', obj);
}

//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================
//==========================================================================================================================================================================	
	
timerContentTimeOut.destroy();
if (typeof(onWinCreate)==='function') {onWinCreate(ThisWin);}
	
//ThisWin.add(Container);

ThisWin.doLayout();
	
} catch (err) {
	//console.log(err);
	timerContentTimeOut.destroy();
	Ext.Msg.alert({
		title:'Ошибка окна!',
		msg: err.message+'\n'+err.stack,
		icon: Ext.MessageBox.WARNING,    // иконка мб {ERROR,INFO,QUESTION,WARNING}
		buttons: Ext.Msg.OK,
		modal: true,
		fn: function(btn) {
			if (ThisWin) {ThisWin.close();}
		}
    });	
}}());