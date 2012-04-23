menuCacher = 
	{
		loadMenu : function(menuType,menuId){
			console.log("@loadMenu");
			list = menuMemory.load(menuId);
			if (null != list){
				console.log("there is a cache: " + JSON.stringify(list));
				switch(menuType){
					case "leagues":
						console.log("using menu type leagues");
						eachFunc.leagues(list);
						break;
					case "teams":
						console.log("using menu type teams");
						eachFunc.teams(list);
						break;
					case "seasons":
						console.log("using menu type seasons");
						eachFunc.seasons(list);
						break;
					case "games":
						console.log("using menu type games");
						eachFunc.games(list);
						break;
					case "players":
						console.log("using menu type players");
						eachFunc.players(list);
						break;
					default:
						break;
				}
			}
		}
	};