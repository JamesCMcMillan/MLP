function shootsFirst(homeOrAway){
	homeAway = homeOrAway;
	console.log("@shootsFirst - " + homeOrAway);
	$('#whoStarts').hide();
	teamUp();
	$('#gameDiv').show();
	roundCount = 0;
	newRound();
	currentCup = 1;
}

function teamUp(){
	console.log("@teamUp");
	$('.hitOrMissButton').removeClass('ui-disabled').unbind('click');
	if (homeAway == "home"){
		console.log("home team up to shoot");
		alert($('#first_player').text() + " should become " + thisGame.home_team.players[0].name);
		$('#first_player').text(thisGame.home_team.players[0].name);
		$('#second_player').text(thisGame.home_team.players[1].name);
		$('#third_player').text(thisGame.home_team.players[2].name);
		
		$('#player1hit').click(function(){
									$(this).addClass('ui-disabled');
									$('#player1miss').addClass('ui-disabled');
									addShot('hit',thisGame.home_team.players[0].id, thisGame.home_team_id);
								});
		$('#player2hit').click(function(){
									$(this).addClass('ui-disabled');
									$('#player2miss').addClass('ui-disabled');
									addShot('hit',thisGame.home_team.players[1].id, thisGame.home_team_id);
								});
		$('#player3hit').click(function(){
									$(this).addClass('ui-disabled');
									$('#player3miss').addClass('ui-disabled');
									addShot('hit',thisGame.home_team.players[2].id, thisGame.home_team_id);
								});
		
		$('#player1miss').click(function(){
									$(this).addClass('ui-disabled');
									$('#player1hit').addClass('ui-disabled');
									addShot('miss',thisGame.home_team.players[0].id, thisGame.home_team_id);
								});
		$('#player2miss').click(function(){
									$(this).addClass('ui-disabled');
									$('#player2hit').addClass('ui-disabled');
									addShot('miss',thisGame.home_team.players[1].id, thisGame.home_team_id);
								});
		$('#player3miss').click(function(){
									$(this).addClass('ui-disabled');
									$('#player3hit').addClass('ui-disabled');
									addShot('miss',thisGame.home_team.players[2].id, thisGame.home_team_id);
								});
	}else{ 
		console.log("away team up to shoot");
		alert($('#first_player').text() + " should become " + thisGame.away_team.players[0].name);
		$('#first_player').text(thisGame.away_team.players[0].name);
		$('#second_player').text(thisGame.away_team.players[1].name);
		$('#third_player').text(thisGame.away_team.players[2].name);
		
		$('#player1hit').click(function(){
									$(this).addClass('ui-disabled');
									$('#player1miss').addClass('ui-disabled');
									addShot('hit',thisGame.away_team.players[0].id, thisGame.away_team_id);
								});
		$('#player2hit').click(function(){
									$(this).addClass('ui-disabled');
									$('#player2miss').addClass('ui-disabled');
									addShot('hit',thisGame.away_team.players[1].id, thisGame.away_team_id);
								});
		$('#player3hit').click(function(){
									$(this).addClass('ui-disabled');
									$('#player3miss').addClass('ui-disabled');
									addShot('hit',thisGame.away_team.players[2].id, thisGame.away_team_id);
								});
		
		$('#player1miss').click(function(){
									$(this).addClass('ui-disabled');
									$('#player1hit').addClass('ui-disabled');
									addShot('miss',thisGame.away_team.players[0].id, thisGame.away_team_id);
								});
		$('#player2miss').click(function(){
									$(this).addClass('ui-disabled');
									$('#player2hit').addClass('ui-disabled');
									addShot('miss',thisGame.away_team.players[1].id, thisGame.away_team_id);
								});
		$('#player3miss').click(function(){
									$(this).addClass('ui-disabled');
									$('#player3hit').addClass('ui-disabled');
									addShot('miss',thisGame.away_team.players[2].id, thisGame.away_team_id);
								});
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
			
			$('#home_shoots_first').click(function(){shootsFirst('home');});
			$('#away_shoots_first').click(function(){shootsFirst('away');});
			console.log("team data for Who Shoots First loaded");
			thisGame.rounds_attributes = {};
		}
	});
}

function newRound(){
	console.log("@newRound");
	var d = new Date();
	currentRound = "r" + d.getTime();
	roundCount++;
	console.log("new round:" + currentRound + " is the #" + roundCount + " round");
	thisGame.rounds_attributes[currentRound] = {
			'number' : roundCount,
			'shots_attributes' : {}
	};
	shotsInRound = 0;
	alert("new round: shotsInRound = 0");
}

function addShot(hitOrMiss, player_id, team_id){
	console.log("@addShot");
	console.log("Shots In Round: " + shotsInRound);
	shotsInRound++;
	alert("shotsInRound incremented to " + shotsInRound);
	var cup;
	if (hitOrMiss == 'hit'){
		cup = currentCup;
		currentCup++;
		console.log("player " + player_id + " hit " + cup + " cup");
	}else if (hitOrMiss == 'miss'){
		console.log("player " + player_id + " missed shooting for " + currentCup + " cup");
		cup = 0;
	}
	
	var d = new Date();
	shotId = "s" + d.getTime();
	 
	thisShot = {
					cup: cup,
					league_id:storage.getLocalKey('currentLeagueId'),
					season_id:storage.getLocalKey('currentSeasonId'),
					number: shotsInRound-1,
					player_id:player_id,
					team_id:team_id
	};
	
	console.log(JSON.stringify(thisShot));
	eval("thisGame.rounds_attributes." + currentRound + ".shots_attributes['" + shotId + "'] = thisShot;");
	console.log("This game:   " + JSON.stringify(thisGame));
	console.log("added thisShot onto current round");
	
	if (shotsInRound == 6){
		alert("shotsInRound = 6");
		homeAway = (homeAway == 'home') ? 'away' : 'home';
		newRound(homeAway);
		console.log("switching to team because end of round:" + homeAway);
		teamUp();
	}else if(shotsInRound == 3){
		alert("shotsInRound = 3");
		console.log("team that was just shooting was: " + homeAway);
		homeAway = (homeAway == 'home') ? 'away' : 'home';
		console.log("switching to team halfway through round:" + homeAway);
		teamUp();
	}
}

