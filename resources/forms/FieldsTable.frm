// Настройка параметров формы
win.setTitle('Поля таблиц');
win.setIcon('images/ico/table16.png');

win.height = 300;
win.width  = 600;

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
		tablename: 'fields',
		//icon: 'images/ico/view24.png',
		EditForm: 'FieldEdit',
		//searchClass: 'App.view.views.',
		url:'../test1.ru/index.php/Ajax/Db/', //'/data/sql.php?type=first',
		
		//allow_select:	true,
		allow_add:		true,
		allow_edit:		true,
		allow_delete:	true,
		
		grid:{
		columns:[
                {text: 'id',		dataIndex: 'id',		hidden: true,	flex: 1,},
                {text: 'Название',  dataIndex: 'name',		hidden: false,	flex: 1,},
				{text: 'Псевдоним', dataIndex: 'alias',		hidden: true,	flex: 1,},
				{text: 'Таблица', 	dataIndex: 'table_id',	hidden: true,	flex: 1,},
				{text: 'Тип', 		dataIndex: 'type',		hidden: true,	flex: 1,},
              ]
		}
	},
}),
//----------------------------------------------------------------------------


];