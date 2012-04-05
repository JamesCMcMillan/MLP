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

function getGravatarURL(email_hash){
	return "http://www.gravatar.com/avatar/" + thisGame.home_team.players[0].email_hash + "?d=monsterid";
}

function teamUp(){
	console.log("@teamUp");
	bringBackCounter = 0;
	$('.hitOrMissButton').removeClass('ui-disabled')
						 .unbind('click')
						 .attr('data-theme','a')
						 .removeClass('ui-body-e')
						 .addClass('ui-body-a').trigger('create');
	
	$('#player1div,#player2div,#player3div').removeClass('shotbg');
	$('#player1undodiv,#player2undodiv,#player3undodiv').hide();
	$('#player1buttonsdiv,#player2buttonsdiv,#player3buttonsdiv').show();
	
	if (homeAway == "home"){
		console.log("home team up to shoot");
		//alert($('#first_player').text() + " should become " + thisGame.home_team.players[0].name);
		$('#first_player').text(thisGame.home_team.players[0].name);
		$('#second_player').text(thisGame.home_team.players[1].name);
		$('#third_player').text(thisGame.home_team.players[2].name);
		$('#player1image').attr("src",getGravatarURL(thisGame.home_team.players[0].email_hash));
		$('#player2image').attr("src",getGravatarURL(thisGame.home_team.players[1].email_hash));
		$('#player3image').attr("src",getGravatarURL(thisGame.home_team.players[2].email_hash));
		
		$('#player1hit').click(function(){
									$(this).addClass('ui-disabled')
									.attr('data-theme','e').removeClass('ui-body-a')
									.addClass('ui-body-e').trigger('create');
									
									$('#player1div').addClass('shotbg');
									$('#player1buttonsdiv').hide();
									$('#player1undodiv').show();
									
									$('#player1miss').addClass('ui-disabled');
									addShot('hit',thisGame.home_team.players[0].id, thisGame.home_team.id);
								});
		$('#player2hit').click(function(){
									$(this).addClass('ui-disabled')
									.attr('data-theme','e').removeClass('ui-body-a')
									.addClass('ui-body-e').trigger('create');
									
									$('#player2div').addClass('shotbg');
									$('#player2buttonsdiv').hide();
									$('#player2undodiv').show();
									
									$('#player2miss').addClass('ui-disabled');
									addShot('hit',thisGame.home_team.players[1].id, thisGame.home_team.id);
								});
		$('#player3hit').click(function(){
									$(this).addClass('ui-disabled')
									.attr('data-theme','e').removeClass('ui-body-a')
									.addClass('ui-body-e').trigger('create');
									
									$('#player3div').addClass('shotbg');
									$('#player3buttonsdiv').hide();
									$('#player3undodiv').show();
									
									$('#player3miss').addClass('ui-disabled');
									addShot('hit',thisGame.home_team.players[2].id, thisGame.home_team.id);
								});
		
		$('#player1miss').click(function(){
									$(this).addClass('ui-disabled')
									.attr('data-theme','e').removeClass('ui-body-a')
									.addClass('ui-body-e').trigger('create');
									
									$('#player1div').addClass('shotbg');
									$('#player1buttonsdiv').hide();
									$('#player1undodiv').show();
									
									$('#player1hit').addClass('ui-disabled');
									addShot('miss',thisGame.home_team.players[0].id, thisGame.home_team.id);
								});
		$('#player2miss').click(function(){
									$(this).addClass('ui-disabled')
									.attr('data-theme','e').removeClass('ui-body-a')
									.addClass('ui-body-e').trigger('create');
									
									$('#player2div').addClass('shotbg');
									$('#player2buttonsdiv').hide();
									$('#player2undodiv').show();
									
									$('#player2hit').addClass('ui-disabled');
									addShot('miss',thisGame.home_team.players[1].id, thisGame.home_team.id);
								});
		$('#player3miss').click(function(){
									$(this).addClass('ui-disabled')
									.attr('data-theme','e').removeClass('ui-body-a')
									.addClass('ui-body-e').trigger('create');
									
									$('#player3div').addClass('shotbg');
									$('#player3buttonsdiv').hide();
									$('#player3undodiv').show();
									
									$('#player3hit').addClass('ui-disabled');
									addShot('miss',thisGame.home_team.players[2].id, thisGame.home_team.id);
								});
	}else{ 
		console.log("away team up to shoot");
		//alert($('#first_player').text() + " should become " + thisGame.away_team.players[0].name);
		$('#first_player').text(thisGame.away_team.players[0].name);
		$('#second_player').text(thisGame.away_team.players[1].name);
		$('#third_player').text(thisGame.away_team.players[2].name);
		$('#player1image').attr("src",getGravatarURL(thisGame.away_team.players[0].email_hash));
		$('#player2image').attr("src",getGravatarURL(thisGame.away_team.players[1].email_hash));
		$('#player3image').attr("src",getGravatarURL(thisGame.away_team.players[2].email_hash));
		
		$('#player1hit').click(function(){
									$(this).addClass('ui-disabled')
									.attr('data-theme','e').removeClass('ui-body-a')
									.addClass('ui-body-e').trigger('create');
									
									$('#player1div').addClass('shotbg');
									$('#player1buttonsdiv').hide();
									$('#player1undodiv').show();
									
									$('#player1miss').addClass('ui-disabled');
									addShot('hit',thisGame.away_team.players[0].id, thisGame.away_team.id);
								});
		$('#player2hit').click(function(){
									$(this).addClass('ui-disabled')
									.attr('data-theme','e').removeClass('ui-body-a')
									.addClass('ui-body-e').trigger('create');
									
									$('#player2div').addClass('shotbg');
									$('#player2buttonsdiv').hide();
									$('#player2undodiv').show();
									
									$('#player2miss').addClass('ui-disabled');
									addShot('hit',thisGame.away_team.players[1].id, thisGame.away_team.id);
								});
		$('#player3hit').click(function(){
									$(this).addClass('ui-disabled')
									.attr('data-theme','e').removeClass('ui-body-a')
									.addClass('ui-body-e').trigger('create');
									
									$('#player3div').addClass('shotbg');
									$('#player3buttonsdiv').hide();
									$('#player3undodiv').show();
									
									$('#player3miss').addClass('ui-disabled');
									addShot('hit',thisGame.away_team.players[2].id, thisGame.away_team.id);
								});
		
		$('#player1miss').click(function(){
									$(this).addClass('ui-disabled')
									.attr('data-theme','e').removeClass('ui-body-a')
									.addClass('ui-body-e').trigger('create');
									
									$('#player1div').addClass('shotbg');
									$('#player1buttonsdiv').hide();
									$('#player1undodiv').show();
									
									$('#player1hit').addClass('ui-disabled');
									addShot('miss',thisGame.away_team.players[0].id, thisGame.away_team.id);
								});
		$('#player2miss').click(function(){
									$(this).addClass('ui-disabled')
									.attr('data-theme','e').removeClass('ui-body-a')
									.addClass('ui-body-e').trigger('create');
									
									$('#player2div').addClass('shotbg');
									$('#player2buttonsdiv').hide();
									$('#player2undodiv').show();
									
									$('#player2hit').addClass('ui-disabled');
									addShot('miss',thisGame.away_team.players[1].id, thisGame.away_team.id);
								});
		$('#player3miss').click(function(){
									$(this).addClass('ui-disabled')
									.attr('data-theme','e').removeClass('ui-body-a')
									.addClass('ui-body-e').trigger('create');
									
									$('#player3div').addClass('shotbg');
									$('#player3buttonsdiv').hide();
									$('#player3undodiv').show();
									
									$('#player3hit').addClass('ui-disabled');
									addShot('miss',thisGame.away_team.players[2].id, thisGame.away_team.id);
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
			$('#player1').text(data.home_team.players[0].name);
			$('#player2').text(data.home_team.players[1].name);
			$('#player3').text(data.home_team.players[2].name);
			$('#player4').text(data.away_team.players[0].name);
			$('#player5').text(data.away_team.players[1].name);
			$('#player6').text(data.away_team.players[2].name);
			
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
	bringBackCounter = 0;
	//alert("new round: shotsInRound = 0");
}

function addShot(hitOrMiss, player_id, team_id){
	console.log("@addShot");
	console.log("Shots In Round: " + shotsInRound);
	shotsInRound++;
	//alert("shotsInRound incremented to " + shotsInRound);
	var cup;
	if (hitOrMiss == 'hit'){
		cup = currentCup;
		currentCup++;
		bringBackCounter++;
		//alert("bringBackCounter = " + bringBackCounter);
		console.log("player " + player_id + " hit " + cup + " cup");
	}else if (hitOrMiss == 'miss'){
		console.log("player " + player_id + " missed shooting for " + currentCup + " cup");
		cup = 0;
	}else if (hitOrMiss == 'bringBack'){
		cup = null;
	}
	
	var d = new Date();
	shotId = "s" + d.getTime();
	
	thisShot = {
					cup: cup,
					league_id:storage.getLocalKey('currentLeagueId'),
					season_id:storage.getLocalKey('currentSeasonId'),
					number: shotsInRound-1,
					team_id:team_id,
					player_id:player_id
	};
	
	console.log(JSON.stringify(thisShot));
	eval("thisGame.rounds_attributes." + currentRound + ".shots_attributes['" + shotId + "'] = thisShot;");
	console.log("This game:   " + JSON.stringify(thisGame));
	console.log("added thisShot onto current round");
	
	if (bringBackCounter == 3){
		alert("Bring 'em back!");
		console.log("Bring 'em back!");
		bringBackCounter = 0;
		if (shotsInRound == 6){
			newRound();
		}
		if (homeAway == 'home'){
			addShot('bringBack',thisGame.away_team.players[0].id,thisGame.away_team.id);
			addShot('bringBack',thisGame.away_team.players[1].id,thisGame.away_team.id);
			addShot('bringBack',thisGame.away_team.players[2].id,thisGame.away_team.id);
		}else if (homeAway == 'away'){
			addShot('bringBack',thisGame.home_team.players[0].id,thisGame.home_team.id);
			addShot('bringBack',thisGame.home_team.players[1].id,thisGame.home_team.id);
			addShot('bringBack',thisGame.home_team.players[2].id,thisGame.home_team.id);
		}
		//homeAway = (homeAway == 'home') ? 'away' : 'home';
		//alert("switching to team (temporarily) because bring-back:" + homeAway);
	}
	if (shotsInRound == 6){
		//alert("shotsInRound = 6");
		if (hitOrMiss != 'bringBack'){
			homeAway = (homeAway == 'home') ? 'away' : 'home';
			console.log("switching to team because end of round:" + homeAway);
		}
		newRound();
		teamUp();
	}else if(shotsInRound == 3){
		//alert("shotsInRound = 3");
		if (hitOrMiss != 'bringBack'){
			console.log("team that was just shooting was: " + homeAway);
			homeAway = (homeAway == 'home') ? 'away' : 'home';
			console.log("switching to team halfway through round:" + homeAway);
		}
		teamUp();
	}
	
	// End of game check
	if (cup == 10){
		alert("End of game!");
		console.log("Game Data: " + JSON.stringify(thisGame));
		quitGame();
	}
}
function quitGame(){
	storage.setLocalKey("jumpTo","games");
	window.location = "index.html";
}