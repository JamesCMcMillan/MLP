var leaguesList = {};
menuMemory = 
	{
		load : function(){
			leaguesList = getLocalKey('menuMemoryLeagues');
		},
		save : function(){
			setLocalKey('menuMemoryLeagues', leaguesList);
		}
	};