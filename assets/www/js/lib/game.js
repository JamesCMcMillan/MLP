function shootsFirst(){
	console.log("@shootsFirst");
	$('#whoStarts').hide();
	teamUp();
	$('#gameDiv').show();
	shotsInRound = 6;
	roundCount = currentRound = currentCup = 0;
}

function teamUp(){
	console.log("@teamUp");
	if (homeAway == "home"){
		console.log("home team up to shoot");
		$('#first_player').text(thisGame.home_team.players[0].name);
		$('#second_player').text(thisGame.home_team.players[1].name);
		$('#third_player').text(thisGame.home_team.players[2].name);
		
		$('#player1hit').click(function(){addShot('hit',thisGame.home_team.players[0].id, thisGame.home_team_id);});
		$('#player2hit').click(function(){addShot('hit',thisGame.home_team.players[1].id, thisGame.home_team_id);});
		$('#player3hit').click(function(){addShot('hit',thisGame.home_team.players[2].id, thisGame.home_team_id);});
		
		$('#player3miss').click(function(){addShot('miss',thisGame.home_team.players[0].id, thisGame.home_team_id);});
		$('#player3miss').click(function(){addShot('miss',thisGame.home_team.players[1].id, thisGame.home_team_id);});
		$('#player3miss').click(function(){addShot('miss',thisGame.home_team.players[2].id, thisGame.home_team_id);});
	}else{ 
		console.log("away team up to shoot");
		$('#first_player').text(thisGame.away_team.players[0].name);
		$('#second_player').text(thisGame.away_team.players[1].name);
		$('#third_player').text(thisGame.away_team.players[2].name);
		
		$('#player1hit').click(function(){addShot('hit',thisGame.away_team.players[0].id, thisGame.away_team_id);});
		$('#player2hit').click(function(){addShot('hit',thisGame.away_team.players[1].id, thisGame.away_team_id);});
		$('#player3hit').click(function(){addShot('hit',thisGame.away_team.players[2].id, thisGame.away_team_id);});
		
		$('#player1miss').click(function(){addShot('miss',thisGame.away_team.players[0].id, thisGame.away_team_id);});
		$('#player2miss').click(function(){addShot('miss',thisGame.away_team.players[1].id, thisGame.away_team_id);});
		$('#player3miss').click(function(){addShot('miss',thisGame.away_team.players[2].id, thisGame.away_team_id);});
	}
}

function loadGame(){
	console.log("@loadGame");
	$.ajax({
		url : 'http://mlpong.herokuapp.com' + storage.getLocalKey('currentGameUrl') + '.json',
		success : function(data) {
			thisGame = data;
			
			$('#homeTeamName').text(data.home_team.name);
			$('#awayTeamName').text(data.away_team.name);
			$('#player1').text(data.home_team.players[0].name).attr('pid', data.home_team.players[0].id);
			$('#player2').text(data.home_team.players[1].name).attr('pid', data.home_team.players[1].id);
			$('#player3').text(data.home_team.players[2].name).attr('pid', data.home_team.players[2].id);
			$('#player4').text(data.away_team.players[0].name).attr('pid', data.away_team.players[0].id);
			$('#player5').text(data.away_team.players[1].name).attr('pid', data.away_team.players[1].id);
			$('#player6').text(data.away_team.players[2].name).attr('pid', data.away_team.players[2].id);
			
			$('#home_shoots_first').click(function(){shootsFirst('home_team');});
			$('#away_shoots_first').click(function(){shootsFirst('away_team');});
			console.log("team data for Who Shoots First loaded");
			thisGame.rounds_attributes = {};
		}
	});
}

function addShot(hitOrMiss, player_id, team_id){
	console.log("@addShot");
	
	if (hitOrMiss == 'hit'){
		currentCup++;
	}
	
	if (shotsInRound == 6){
		var d = new Date();
		currentRound = "r" + d.getTime();
		roundCount++;
		console.log("current round:" + currentRound);
		thisGame.rounds_attributes[currentRound] = {
				'number' : currentRound,
				'shots_attributes' : {}
		};
		shotsInRound = 0;
	}else if(shotsInRound == 3){
		shotsInRound++;
		homeAway = (homeAway == 'home') ? 'away' : 'home';
		console.log("switching to team:" + homeAway);
		teamUp();
	}else{
		
		shotsInRound++;
		console.log("trying to eval:thisGame.rounds_attributes[" + currentRound + "]shots_attributes");
		eval("thisGame.rounds_attributes[" + currentRound + "]shots_attributes") += {
				'cup': cup,
				'league_id':storage.getLocalKey('currentLeagueId'),
				'season_id':storage.getLocalKey('seasonLeagueId'),
				'number': currentCup,
				'player_id':player_id,
				'team_id':team_id
		};
	}
}

