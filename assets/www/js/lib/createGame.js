function goBack(){
	storage.setLocalKey("jumpTo","games");
	window.location = 'index.html';
}

function createGame(){
	newGame = new game(
			storage.getLocalKey('currentLeagueSlug'),
			storage.getLocalKey('currentSeasonId'),
			$('#game_date').val(),
			$('#game_time').val(),
			$('#away_team').val(),
				$('#player1_picker').val(),
				$('#player2_picker').val(),
				$('#player3_picker').val(),
			$('#home_team').val(),
				$('#player4_picker').val(),
				$('#player5_picker').val(),
				$('#player6_picker').val()
	);
	console.log(JSON.stringify(newGame));
	$.ajax({
		type : 'POST',
		url : 'http://mlpong.herokuapp.com' + storage.getLocalKey('currentSeasonUrl') + '/games?auth_token=' + storage.getLocalKey('authToken'),
		contentType : 'application/json',
		headers: {
	        "Accept" : "application/json"
	    },
		data : JSON.stringify(newGame),
		success : function(data) {
			alert("Data:"+JSON.stringify(data));
		}
	});	
}

function game(in_league_id, in_season_id,in_date,in_time,
			  in_away_team_id,
			  	   in_player1_id,in_player2_id,in_player3_id,
			  in_home_team_id,			  
			  	   in_player4_id,in_player5_id,in_player6_id){
    
	this.league_id = in_league_id;
    this.season_id = in_season_id;
    
    this.game = {
	    "date_string" : in_date,
	    "time_string" : in_time,
	    
	    "away_team_id" : in_away_team_id,
	    "away_player_ids" : [
	             in_player1_id,
	             in_player2_id,
	             in_player3_id
	        ],
	    
	    "home_team_id" : in_home_team_id,
	    "home_player_ids" : [
	             in_player4_id,
	             in_player5_id,
	             in_player6_id            
	        ]
	    };
}
    /*
    "rounds": [
        {
            "id": 284,
            "number": 1,
            "shots": [
                {
                    "id": 1699,
                    "number": 0,
                    "cup": 1,
                    "player_id": 21,
                    "team_id": 10
                },
                {
                    "id": 1700,
                    "number": 1,
                    "cup": 0,
                    "player_id": 23,
                    "team_id": 10
                },
                {
                    "id": 1701,
                    "number": 2,
                    "cup": 0,
                    "player_id": 25,
                    "team_id": 10
                },
                }
                {
                    "id": 1702,
                    "number": 3,
                    "cup": 1,
                    "player_id": 32,
                    "team_id": 11
                },
                {
                    "id": 1703,
                    "number": 4,
                    "cup": 0,
                    "player_id": 27,
                    "team_id": 11
                },
                {
                    "id": 1704,
                    "number": 5,
                    "cup": 0,
                    "player_id": 24,
                    "team_id": 11
                }
            ]
        }
    ]*/