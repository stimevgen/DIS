//------------------------------------------------------------------------------
//
//        					ШАБЛОН ОКОН
//
//------------------------------------------------------------------------------
Ext.define('App.components.window.WindowClient', {
    extend: 'Ext.window.Window',
    alias: 'widget.TWindowClient',

	//Параметры по-умолчанию 1
	constrain:		true,			//Ограничивать перемещения областью панели родителя
	border:			false,			//Бордюр
	minimizable: 	true,			//Кнопка минимизации
	maximizable: 	true,			//Кнопка максимизации
	title: 			'Window',		//Заголовок по умолчанию
    layout:			'fit',			//Контент растянуть на всю область		
	stateful:		true,			//Запоминать положение и размер окна
	Changed:        false,
	
    initComponent: function() {
        var me = this;
		
		//Параметры по-умолчанию 3 после переданных при расширении от 'App.common.CommonWindow'
		me.ItemId		= me.ItemId	|| me.id;	//Уникальное имя для поиска формы				
		me.ToRender		= 'centralPanel';		//Где будем прорисовывать окно
		me.BtnRender	= true; 
		me.FormUrl		= 'app/view/forms/';	//URL загрузки контента
		//me.FormName		= '';				//Имя формы загрузки контента
		me.stateId		= me.FormName;			//Имя под которым будет храниться информация о положении и размере окна
		
		//me.Store -- ссылки на данные
		//me.Record -- ссылки на данные
		
		//Переопределение параметров из conf
		Ext.apply(me, me.conf);
		
		//if (me.conf) {		
		//	me._RenderTo	= 	me.conf.RenderTo 	|| 'centralPanel';		
		//	me._RenderBtn	=	me.conf.RenderBtn	|| true; 
		//	me._Parent		= 	me.conf.Parent;								//Ссылка на окно родитель
		//	me._Child		= 	me.conf.Child 		|| [];					//Массив ссылок на окна потомки
		//	me._FormUrl		=	me.conf.FormUrl 	|| 'app/view/forms/';	//URL загрузки контента
			//me._FormName	=	me.conf.FormName ;							//Имя формы загрузки контента
				
		//	me.title		=	me.conf.title		|| me.title;
		//	me.icon			=	me.conf.icon		|| me.icon;
		//	me.items		=	me.conf.items		|| me.items;
		//	me.buttons		=	me.conf.buttons		|| me.buttons;
			
		//	me.stateful		=	me.conf.stateful	|| me.stateful;
		//	me.stateId		=	me.conf.stateId		|| me.stateId;
		//	me.ItemId		=	me.conf.ItemId		|| me.ItemId;
			
		//	me.x 			=	me.conf.x			|| me.x;
		//	me.y 			=	me.conf.y			|| me.y;
		//	me.minWidth  	=	me.conf.minWidth	|| me.minWidth;
		//	me.minHeight 	=	me.conf.minHeight	|| me.minHeight;
		//}
		
		
		//------------------------------------------------------------------------------------------------------------------------------
		//
		//            ПОЛУЧАЕМ ПАРАМЕТРЫ
		//
		//------------------------------------------------------------------------------------------------------------------------------
		
		//me.x = 10;
		//me.y = 10;
		//me.minWidth  = 150;
		//me.minHeight = 100;
		
		
		//me.autoPos   = true;
		
		//------------------------------------------------------------------------------------------------------------------------------
		//
		//             КНОПКА ТУЛБАРА
		//
		//------------------------------------------------------------------------------------------------------------------------------
		// Создаем кнопку в тулбаре
		me.linkButton = Ext.create('Ext.Button', {
						linkWindows: me,
						icon: me.icon,
						text: me.title,
						handler: function() {
							this.linkWindows.setVisible(true);
							this.linkWindows.toFront();
						}
					});
		
		// Если получено сообщение о активации окна то активируем и кнопку
		App.Event.subscribe('win_activate',	me.linkButton);
		me.linkButton.on('_win_activate', function(obj, data) {
			
			if ((this.linkWindows.id == data.sender.id) && (data.sender.isVisible())) { // Если выбрано наше окно то себя подсвечиваем
				this.toggle(true);
				//console.log('Кнопка "'+this.id+'" получил сообщение "win_activate" от родителя "'+data.sender.id+'"');
			} else {
				this.toggle(false);
			}
		});
		
		// Если получили сообщение о минимизации окна то деактивировали и кнопку
		App.Event.subscribe('win_minimize',	me.linkButton);
		me.linkButton.on('_win_minimize', function(obj, data) {
			if ((this.linkWindows.id == data.sender.id)) { // Если выбрано наше окно то себя подсвечиваем
				//console.log('Объект "'+this.id+'" получил сообщение "win_minimize" от "'+data.sender.id+'"');
				this.toggle(false);
				return false; // Прервать дальнейшее распространение сообщения
			}
		});
		
		//------------------------------------------------------------------------------------------------------------------------------
		//
		//               ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ
		//
		//------------------------------------------------------------------------------------------------------------------------------
		
		me.setTitle = function(title){
				this.title = title;
				this.linkButton.setText(title);
			};
		
		me.setIcon = function(icon){
				this.icon = icon;
				this.linkButton.setIcon(icon);
			};
			
		//------------------------------------------------------------------------------------------------------------------------------
		//
		//               ОТРАБАТЫВАЕМ СООБЩЕНИЯ
		//
		//------------------------------------------------------------------------------------------------------------------------------
		
		me.on({
			// Когда окно выбрали
			activate: function(win, options){
				App.Event.fire('win_activate',{sender:win, options: options});
			},
			// Когда окно свернули
			minimize: function(win, options){
				App.Event.fire('win_minimize',{sender:win, options: options});
				win.setVisible(false);
			},
			// Когда окно уничтожили
			destroy: function(win, options){
				win.linkButton.destroy();
				App.Event.fire('win_close',{sender:win, options: options});
			},
			scope: this
		});
		
		
		
		//------------------------------------------------------------------------------------------------------------------------------
		//
		//           AJAX CONTENT
		//
		//------------------------------------------------------------------------------------------------------------------------------
		if (me.FormName)
		{
			console.log('before form "'+me.FormName+'" loading');
			try {
				Ext.Ajax.request({
					async: 	false,
					url: 	me.FormUrl+'frm'+me.FormName+'.js',
					params: {id: 1},
					failure : function(){console.log('Ошибка загрузки формы "'+me.FormName+'"'); me.close();},
					success : function(response){eval(response.responseText);},
				});
			} 
			catch(err) {
				console.log('error load form "'+me.FormName+'": '+err.message);
			}
			console.log('after form "'+me.FormName+'" loading');
		}
		
		
		//------------------------------------------------------------------------------------------------------------------------------
		//
		//          ЗАВЕРШАЮЩАЯ ОТРИСОВКА
		//
		//------------------------------------------------------------------------------------------------------------------------------
		if (me.BtnRender){
			Ext.getCmp(me.ToRender).getDockedItems()[0].add(me.linkButton);
		}	
		Ext.getCmp(me.ToRender).add(me);
		
		App.components.window.WindowClient.superclass.initComponent.apply(me, arguments);
		App.Event.fire('win_init',{sender:me});
		
    },
	
	
	
	
	
	// fix
	getState: function() {
                var me = this,
                    state = me.callSuper(arguments) || {},
                    maximized = !!me.maximized,
                    ghostBox = me.ghostBox,
                    pos;

                state.maximized = maximized;
                if (maximized) {
                    pos = me.restorePos;
                } else if (ghostBox) {
                    // If we're animating a show, it will be from offscreen, so
                    // grab the position from the final box
                    pos = [ghostBox.x, ghostBox.y];

                    // <WestyFix>
                    var isContainedFloater = me.isContainedFloater(),
                        floatParentBox;

                    if (isContainedFloater) {
                        floatParentBox = me.floatParent.getTargetEl().getViewRegion();
                        pos[0] -= floatParentBox.left;
                        pos[1] -= floatParentBox.top;
                    }
                    // </WestyFix>
                } else {
                    // <WestyFix>
                    pos = me.getPosition(true);
                    // </WestyFix>

                    //if (window.console) {
                    //    window.console.log('Non-ghostbox pos:' + pos[0] + ', ' + pos[1]);
                    //}
                }
				
                if (me.autoPos) {
					App.Window.x = App.Window.x + 24;
					App.Window.y = App.Window.y + 24;
					pos[0] = App.Window.x;
                    pos[1] = App.Window.y;
				}
				
				Ext.apply(state, {
                    size: maximized ? me.restoreSize : me.getSize(),
                    pos: pos
                });
				
                return state;
    },
	
});