function Game(in_league_id, in_season_id,in_date,in_time,
			  in_away_team_id,
			  	   in_player1_id,in_player2_id,in_player3_id,
			  in_home_team_id,			  
			  	   in_player4_id,in_player5_id,in_player6_id){
    
	this.league_id = in_league_id + "";
    this.season_id = in_season_id + "";
    
    this.game = {
	    "date_string" : in_date,
	    "time_string" : in_time,
	    
	    "away_team_id" : in_away_team_id + "",
	    "away_player_ids" : [
	             in_player1_id + "",
	             in_player2_id + "",
	             in_player3_id + ""
	        ],
	    
	    "home_team_id" : in_home_team_id + "",
	    "home_player_ids" : [
	             in_player4_id + "",
	             in_player5_id + "",
	             in_player6_id + ""
	        ]
	    };
}