menuMemory = 
	{
		load : function(itemName){
			return $.parseJSON(storage.getLocalKey('mem' + itemName));
		},
		save : function(itemName, item){
			storage.setLocalKey('mem' + itemName, JSON.stringify(item));
		}
	};