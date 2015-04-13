// Настройка параметров формы
win.height		= 400;
win.width		= 500;
win.setTitle('Жора');
win.setIcon('images/ico/table16.png');

// Настройка содержимого формы
win.items = [

//----------------------------------------------------------------------------
//--------------------------------------GRID----------------------------------

Ext.create('App.common.CommonGrid', {
    requires: [
        'App.common.CommonGrid',
    ],
	
	conf: {
		//title: 'Представления',
		tablename: 'tables',
		//icon: 'images/ico/view24.png',
		viewClass: 'widget.ViewTables',
		editClass: 'widget.EditTables',
		searchClass: 'App.view.views.',
		url:'../test1.ru/index.php/Ajax/Db/', //'/data/sql.php?type=first',
		
		//allow_select:	true,
		allow_add:		true,
		allow_edit:		true,
		allow_delete:	true,
		
		grid:{
		columns:[
                {text: 'id',		dataIndex: 'id',		hidden: true,	flex: 1,},
                {text: 'Название',  dataIndex: 'name',		hidden: false,	flex: 1,},
				{text: 'Таблица',   dataIndex: 'tabname',	hidden: true,	flex: 1,},
              ]
		}
	},
}),
//----------------------------------------------------------------------------


];