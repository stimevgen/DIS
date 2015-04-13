Ext.define("App.common.CommonEditor",{
        extend: 'Ext.window.Window',
        alias:  'widget.commoneditor',
        title:	'CommonEditor',
        autoHeight  : true,
        autoScroll  : true,        // скроллинг если текст не влезает.
        closeAction : 'destroy',   // !!! Важно. Указание на то, что окно при закрывании не удаляется вместе с содержимым,
        modal : false,             //  modal = true задает модальное окно. При открсытии делает недоступными все остальные окна
        items : [{
           xtype: 'form',
           bodyStyle : 'border:none;padding:10px;',
           defaultType: 'textfield',
           buttons: [{
                    text: 'Отменить',
                    handler: function() {
                        this.up('form')      // нахожу родительский контейнер с формой
                        .getForm().reset();  // и сбрасываю ее
                        }
                    },
                    {
                        text: 'Сохранить',
                        formBind: true, //only enabled once the form is valid
                        disabled: true, // запретить submit если есть ошибки заполнения
                        handler: function() {
                            var form = this.up('form').getForm(); // нахожу родительский контейнер с формой
                            if (form.isValid()) { // если форма валидна
                                var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
                                myMask.show();   // вывожу сообщение об отправке данных
                                var p=this.up('commoneditor'); // опредляю родительский commoneditor
                                var url=p.data.url;  // вытаскиваю из него url сабмита
                                form.submit({
                                    url:url,
                                    params:{save:1,id:p.data.id}, // дополнительные данные
                                    success: function(form, action) { // нормальное сохранение
                                      var ok=Ext.Msg.alert('Ok!', 'Внесенные изменения сохранены');
                                      myMask.destroy();
                                      // оповещение таблички об изменениях
                                      if (action.result['new'] == 0  ) { // ghbpyfr bpvty

                                      }
                                      if (p.data.id) { // для редактирования обновляю только строку в таблице
                                        app.Event.fire('changed',{data:action.result.data,id:this.params.id,family:p.family});
                                      } else {
                                        app.Event.fire('page',{itemId:p.itemId,page:1});
                                      }

                                    },
                                    failure: function(form, action) {
                                      myMask.destroy(); // облом сохранения
                                      Ext.Msg.alert('Failed', action.result.msg || 'Внесенные исправления не сохранены. Произошла ошибка на стороне сервера');
                                    }
                                });}
                    }}]
            }],
        initComponent: function() {
                    this.items[0].items=this.form;
                    app.Event.subscribe('rec_deleted',this);  // Подписка на событие удаления записи через общий обозреватель приложения
                    App.Common.CommonEditor.superclass.initComponent.apply(this, arguments);
        },
        listeners:{
                afterrender:function(){
                  var url= this.data.url+'&one='+this.data.id;
                  var that=this;
                  this.down('form').getForm().load({
                      url: url,
                      win: this, // родительское окно
                      success: function(form,response){
                               var r=Ext.JSON.decode(response.response.responseText); // установка Title
                               this.win.setTitle( r.data.id );
                           },
                      failure: function(form, action) {
                          Ext.Msg.alert("Load failed");
                      }
                  })
                },
                Ev_deleted: function(obj,data) {  // удаление окна после удаления записи и подтверждения с сервера
                    if (this.data.id == data.id) this.destroy();
                },
        }
    });

       app.Editor  = Ext.create('Ext.Component', {
       initComponent: function() {
                    this.family = 'common';
                    app.Event.subscribe('edit',this);  // Подписка на событие редактирования записи через общий обозреватель приложения
                    Ext.Component.superclass.initComponent.apply(this, arguments);
        },
        listeners :
        {
            Ev_edit  :function(obj,data){

                var id='editor-'+data.family+'-'+data.rec.id,       // задаю уникалльный id редактора
                    editor = Ext.getCmp(id);    // определяю не открыт ли он ранее
                if (editor) {editor.focus();return;} // фокусирую если он уж существует

                var app=data.family+'Editor',    // определяю класс редактора
                    params = {id:id,
                             family:data.family,
                             itemId:data.itemId,
                             data: {
                                    url:data.url, // определяю url для загрузки данных,
                                    id:data.rec.id}
                            };

                Ext.require(         // загружаю класс редактора, если он не загружен
                      app,function(){
                            var editor = // создаю новый редактор
                            Ext.create(app,params);
                            editor.show();
                        }
                   );
            },
        }

});
