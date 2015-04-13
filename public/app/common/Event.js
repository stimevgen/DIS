Ext.ns('App.common.Event');
App.Event =
{
    _observers : [],	// массив подписчиков
	_counter: 0,		// счетчик событий
	_locked: false,	// флаг блокировки отписывания
	_showlogs: false,	// показывать логи
	
	// Информирование о событии
	fire: function (type, data) {
		var old_locked = this._locked; 
		this._locked = true;
		this._counter++;
		var count = this._counter;
		
		if (!old_locked) {
			this.log('Событие ['+count+']: Установлена блокировка на удаление подписчиков.');
		}
		
		this.log('Событие ['+count+']: Объект "'+data.sender.id+'" сгенерировал событие: "'+type+'".');
		for (var i in this._observers) { // перебираю массив подписчиков   
		   if ((this._observers[i].enable) && (this._observers[i].type == type)) { // проверяю подписчиков на тип события
			   var item = this._observers[i];
                this.log('Событие ['+count+']: Объект "'+item.obj.id+'" информирован о событии: "'+type+'"');
				if (!item.obj.fireEvent('_'+type, item.obj, data)) {
					this.log('СОбытие ['+count+']: Объект "'+item.obj.id+'" остановил событие: "'+type+'".');
					break;
				} // вызываю событие	
            }
        }
		this.log('Событие ['+count+']: Объект "'+data.sender.id+'", завершено информирование о событии: "'+type+'".');
		this._locked = old_locked;
		if (!this._locked) {
			this.log('Событие ['+count+']: Сняли блокировку на удаление подписчиков.');
			this.unlocked();
		} 	
    },
	
	// Подписка на события
    subscribe: function (type,obj) {
        this.log('События: Объект "'+obj.id+'" подписался на событие: "'+type+'".');
		var c = obj || null;
        if (c) {
              this._observers.push({type:type, obj: obj, id:obj.id, enable:true }); // упаковываю подписчика в массив
              obj.on('beforedestroy', this.unsubscribe,this,{id:obj.id});
        }
    },
	
	// Отписать объект от подписки
    unsubscribe:function(obj,data){
		for (var i = this._observers.length; i > 0 ; i-- ) {
			var idx = i-1;
			if (this._observers[idx].id == data.id) {
				if (this._locked){
					this.log('События: Объект "'+data.id+'" пометили на отписание от события "'+this._observers[idx].type+'".');
					this._observers[idx].enable = false;
				} else {
					this.log('События: Объект "'+data.id+'" отписали от события "'+this._observers[idx].type+'".');
					this._observers.splice(idx,1);
				}
			}
        }
    },
	
	// Удаляем помечанные на удаление объекты
	unlocked:function(){
		for (var i = this._observers.length; i > 0 ; i-- ) {
			var idx = i-1;
			if (!this._observers[idx].enable) {
				this.log('События: Удалили подписку объекта "'+this._observers[idx].id+'" на событие "'+this._observers[idx].type+'".');
				this._observers.splice((idx),1);  
			}
		}
	},
	
	// Вывод лога
	log:function(msg){
		if (this._showlogs) {
			console.log(msg);
		}
	},	
}