storage = 
	{
		setLocalKey : function (keyName,keyValue){
			window.localStorage.setItem(keyName, keyValue);
		},
		getLocalKey : function (keyName){
			return window.localStorage.getItem(keyName);
		},
		removeLocalKey : function (keyName){
			window.localStorage.removeItem(keyName);
		},
		getDB: function (){
			return window.openDatabase("games", "1.0", "Games DB", 10000);
		}
	};