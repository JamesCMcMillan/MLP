function Shot(cup, number, team_id, player_id){	
	this.shot = {
				cup: cup + "",
				league_id:storage.getLocalKey('currentLeagueId'),
				season_id:storage.getLocalKey('currentSeasonId'),
				number: shotsInRound-1 + "",
				team_id:team_id + "",
				player_id:player_id + ""
				};
}