win.setTitle('Поле '+win.title);
win.setIcon('images/ico/form16.png');

win.height = 150;
win.width  = 400;

win.items = [
            {
                xtype: 'form',
				frame: true,
                //border: false,
				bodyStyle:'padding:5px 5px 0',
				width: 350,
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
                    {
                        xtype: 'textfield',
                        name : 'alias',
                        fieldLabel: 'Псевдоним'
                    },
                    {
                        xtype: 'textfield',
                        name : 'table_id',
                        fieldLabel: 'Таблица'
                    },
                    {
                        xtype: 'textfield',
                        name : 'type',
                        fieldLabel: 'Тип'
                    }
                ]
            }
        ];
		
win.buttons = [
            {
                text: 'Сохранить',
                handler: function () {
					var win		= this.up('window'), // нахожу родительский контейнер с окном
						form	= win.down('form'); // нахожу родительский контейнер с формой
						record	= form.getRecord(),
						values  = form.getValues();
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
	}
};	
	