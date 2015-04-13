	win.setTitle('Форма '+win.title);
	win.setIcon('images/ico/form16.png');

	//win.height = 150;
	//win.width  = 400;

	win.add(
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
                    }
                ]
            }
        );
	
	win.dockedItems.items[1].add(
	//win.dockedItems.add({
                        //xtype: 'toolbar',
                        //dock: 'bottom',
                        //items: [
						{
									text: 'Сохранить',
									handler: function () {
										var wind		= this.up('window'), // нахожу родительский контейнер с окном
											form	= wind.down('form'); // нахожу родительский контейнер с формой
											record	= form.getRecord(),
											values  = form.getValues();
											if (record==undefined) {
												var store = wind.Store;
												record = store.add([{'id':'-'}])[0];
											}
											App.Event.fire('rec_changed',{sender: this, record: record,values: values,});
											wind.close();
									},
								},
								{
									text: 'Отменить',
									handler: function () {
										var wind  = this.up('window');
										wind.close();
									},
								}
						//		]
        //}
		);    
	
	//win.doLayout();
	
	//win.InitFn = function(){
	if (win.Record){
		win.down('form').loadRecord(win.Record);
	}
	//};
}
