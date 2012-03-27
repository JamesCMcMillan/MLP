sync = 
	{
		hasConnection: function (){
		    var networkState = navigator.network.connection.type;
		    return (networkState == Connection.ETHERNET  ||
		    	networkState == Connection.WIFI      ||
		    	networkState == Connection.CELL_2G   ||
		    	networkState == Connection.CELL_3G   ||
		    	networkState == Connection.CELL_4G) ? true : false;
		}

	};