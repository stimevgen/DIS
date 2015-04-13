win.setTitle('Таблица '+win.title);
win.setIcon('images/ico/form16.png');

win.height = 150;
win.width  = 400;
win.layout = 'fit';

win.FieldSettings = Ext.create('Ext.grid.property.Grid', {
						//width: 300,
						height: 300,
						//border: false,
						flex: 1,
						//renderTo: 'grid-container',
						propertyNames: { //Имена параметров
							tested: 'QA',
							borderWidth: 'Border Width'
						},
						source: {
							"(name)":"Properties Grid",
						}
					});
					
win.items = [
            {
                xtype: 'form',
				frame: true,
                //border: false,
				bodyStyle:'padding:5px 5px 0',
				//width: 350,
				fieldDefaults: {
					msgTarget: 'side',
					labelWidth: 100
				},
				defaultType: 'textfield',
				defaults: {
					anchor: '100%'
				},			
				items: [
                    {
                        xtype: 'textfield',
						name : 'name',
                        fieldLabel: 'Наименование'
                    },
					win.FieldSettings,
                    //{
                    //    xtype: 'textfield',
                    //    name : 'alias',
                    //    fieldLabel: 'Псевдоним'
                    //},
					
                ]
            },
			//Ext.create('App.common.CommonGrid', {
			//	requires: [
			//		'App.common.CommonGrid',
			//	],
			//	
			//	conf: {
			//		//title: 'Представления',
			//		tablename: 'fields',
			//		//icon: 'images/ico/view24.png',
			//		EditForm: 'FieldEdit',
			//		//searchClass: 'App.view.views.',
			//		url:'../test1.ru/index.php/Ajax/Db/', //'/data/sql.php?type=first',
			//		
			//		//allow_select:	true,
			//		allow_add:		true,
			//		allow_edit:		true,
			//		allow_delete:	true,
			//		
			//		grid:{
			//		columns:[
			//				{text: 'id',		dataIndex: 'id',		hidden: true,	flex: 1,},
			//				{text: 'Название',  dataIndex: 'name',		hidden: false,	flex: 1,},
			//				{text: 'Псевдоним', dataIndex: 'alias',		hidden: false,	flex: 1,},
			//				{text: 'Таблица', 	dataIndex: 'table_id',	hidden: false,	flex: 1,},
			//				{text: 'Тип', 		dataIndex: 'type',		hidden: false,	flex: 1,},
			//			  ]
			//		}
			//	},
			//})
        ];
		
win.buttons = [
			{
                text: 'Сохранить',
                handler: function () {
					var win		= this.up('window'), // нахожу родительский контейнер с окном
						form	= win.down('form'), // нахожу родительский контейнер с формой
						record	= form.getRecord(),
						values  = form.getValues();
						
						Ext.apply(values, {config:JSON.stringify(win.FieldSettings.source)});
						
						if (record==undefined) {
							var store = win.Store;
							record = store.add([{'id':'-'}])[0];
						}
						
						App.Event.fire('rec_changed',{sender: this, record: record,values: values,});
						win.close();
				},
            },
            {
                text: 'Отменить',
                handler: function () {
					var win  = this.up('window');
					win.close();
				},
            }
        ];
		
win.InitFn = function(){
	if (this.Record){
		this.down('form').loadRecord(this.Record);
		
		try {
			var val = JSON.parse(this.Record.data.config);
			if (val!=null) {win.FieldSettings.setSource(val);}
		} 
		catch(err) {
			console.log('error parse config: '+err.message);
		}
	
	}
};	

//App.Window.debaglog(val);