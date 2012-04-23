function shootsFirst(homeOrAway){
	homeAway = homeOrAway;
	$('#h1header').show();
	console.log("@shootsFirst - " + homeOrAway);
	$('#whoStarts').hide();
	teamUp();
	$('#gameDiv').show();
	roundCount = 0;
	newRound();
	currentCup = 1;
}

function shotFiredUIAction(player){
	$('#' + player + 'div').addClass('shotbg');
	$('#' + player + 'buttonsdiv').hide();
	$('#' + player + 'undodiv').show();
	$('#' + player + 'undo').unbind('click').click(function(){undoShot(mostRecentShotId, player)});
}

function teamUp(){
	console.log("@teamUp");
	bringBackCounter = 0;
	$('.hitOrMissButton').unbind('click');
	
	$('#player1div,#player2div,#player3div').removeClass('shotbg');
	$('#player1undodiv,#player2undodiv,#player3undodiv').hide();
	$('#player1buttonsdiv,#player2buttonsdiv,#player3buttonsdiv').show();
	
	if (homeAway == "home"){
		$('#currentCupLabel').text(homeTeamObject.currentCup);
		console.log("home team up to shoot");
		//alert($('#first_player').text() + " should become " + thisGame.home_team.players[0].name);
		$('#first_player').text(homeTeamObject.players[0].name);
		$('#second_player').text(homeTeamObject.players[1].name);
		$('#third_player').text(homeTeamObject.players[2].name);
		$('#player1image').removeAttr("src").attr("src",user.getGravatarURL(homeTeamObject.players[0].email_hash));
		$('#player2image').removeAttr("src").attr("src",user.getGravatarURL(homeTeamObject.players[1].email_hash));
		$('#player3image').removeAttr("src").attr("src",user.getGravatarURL(homeTeamObject.players[2].email_hash));
		
		$('#player1hit').click(function(){
									shotFiredUIAction('player1');
									addShot('hit',homeTeamObject.players[0].id, homeTeamObject.id, 'player1');
								});
		$('#player2hit').click(function(){
									shotFiredUIAction('player2');									
									addShot('hit',homeTeamObject.players[1].id, homeTeamObject.id, 'player2');
								});
		$('#player3hit').click(function(){
									shotFiredUIAction('player3');
									addShot('hit',homeTeamObject.players[2].id, homeTeamObject.id, 'player3');
								});
		
		$('#player1miss').click(function(){
									shotFiredUIAction('player1');
									addShot('miss',homeTeamObject.players[0].id, homeTeamObject.id, 'player1');
								});
		$('#player2miss').click(function(){
									shotFiredUIAction('player2');									
									addShot('miss',homeTeamObject.players[1].id, homeTeamObject.id, 'player2');
								});
		$('#player3miss').click(function(){
									shotFiredUIAction('player3');
									addShot('miss',homeTeamObject.players[2].id, homeTeamObject.id, 'player3');
								});
	}else{ 
		$('#currentCupLabel').text(awayTeamObject.currentCup);
		console.log("away team up to shoot");
		//alert($('#first_player').text() + " should become " + thisGame.away_team.players[0].name);
		$('#first_player').text(awayTeamObject.players[0].name);
		$('#second_player').text(awayTeamObject.players[1].name);
		$('#third_player').text(awayTeamObject.players[2].name);
		$('#player1image').removeAttr("src").attr("src",user.getGravatarURL(awayTeamObject.players[0].email_hash));
		$('#player2image').removeAttr("src").attr("src",user.getGravatarURL(awayTeamObject.players[1].email_hash));
		$('#player3image').removeAttr("src").attr("src",user.getGravatarURL(awayTeamObject.players[2].email_hash));
		
		$('#player1hit').click(function(){
									shotFiredUIAction('player1');									
									addShot('hit',awayTeamObject.players[0].id, awayTeamObject.id, 'player1');
								});
		$('#player2hit').click(function(){
									shotFiredUIAction('player2');									
									addShot('hit',awayTeamObject.players[1].id, awayTeamObject.id, 'player2');
								});
		$('#player3hit').click(function(){
									shotFiredUIAction('player3');
									addShot('hit',awayTeamObject.players[2].id, awayTeamObject.id, 'player3');
								});
		
		$('#player1miss').click(function(){									
									shotFiredUIAction('player1');
									addShot('miss',awayTeamObject.players[0].id, awayTeamObject.id, 'player1');
								});
		$('#player2miss').click(function(){
									shotFiredUIAction('player2');
									addShot('miss',awayTeamObject.players[1].id, awayTeamObject.id, 'player2');
								});
		$('#player3miss').click(function(){
									shotFiredUIAction('player3');									
									addShot('miss',awayTeamObject.players[2].id, awayTeamObject.id, 'player3');
								});
	}
}

function loadGame(){
	console.log("@loadGame");
	$.ajax({
		url : storage.getLocalKey('hostUrl') + storage.getLocalKey('currentGameUrl') + '.json',
		success : function(data) {
			
			rawGameObject = data;
			homeTeamObject = data.home_team;
			awayTeamObject = data.away_team;
			homeTeamObject.currentCup = 1;
			awayTeamObject.currentCup = 1;
			
			newGame = new Game(
					storage.getLocalKey('currentLeagueSlug'),
					storage.getLocalKey('currentSeasonId'),
					data.date,
					data.time,
					awayTeamObject.id,
						awayTeamObject.players[0].id,
						awayTeamObject.players[1].id,
						awayTeamObject.players[2].id,
					homeTeamObject.id,
						homeTeamObject.players[0].id,
						homeTeamObject.players[1].id,
						homeTeamObject.players[2].id
			);
			thisGame = newGame;
			
			$('#homeTeamName').text(data.home_team.name);
			$('#awayTeamName').text(data.away_team.name);
			$('#player1').text(homeTeamObject.players[0].name);
			$('#player2').text(homeTeamObject.players[1].name);
			$('#player3').text(homeTeamObject.players[2].name);
			$('#player4').text(awayTeamObject.players[0].name);
			$('#player5').text(awayTeamObject.players[1].name);
			$('#player6').text(awayTeamObject.players[2].name);
			
			$('#home_shoots_first').click(function(){shootsFirst('home');});
			$('#away_shoots_first').click(function(){shootsFirst('away');});
			console.log("team data for Who Shoots First loaded");
			thisGame.game.rounds_attributes = {};
		}
	});
}

function newRound(){
	console.log("@newRound");
	var d = new Date();
	currentRound = d.getTime().toString();
	roundCount++;
	console.log("new round:" + currentRound + " is the #" + roundCount + " round");
	thisGame.game.rounds_attributes[currentRound] = {
			'number' : roundCount+"",
			'shots_attributes' : {}
	};
	shotsInRound = 0;
	bringBackCounter = 0;
	//alert("new round: shotsInRound = 0");
}

function undoShot(shot_id, player){
	console.log('@undoShot(' + shot_id + ', ' + player + ')');
	lastShot = thisGame.game.rounds_attributes[currentRound].shots_attributes[shot_id];
	//alert(JSON.stringify(lastShot));
	
	var curTeamObject = (homeAway == 'home') ? homeTeamObject : awayTeamObject;
	shotsInRound--;
	if (lastShot.cup != '0' && lastShot.cup != null){
		curTeamObject.currentCup--;
		bringBackCounter--;	
	}
	
	delete thisGame.game.rounds_attributes[currentRound].shots_attributes[shot_id];
	$('#' + player + 'div').removeClass('shotbg');
	$('#' + player + 'buttonsdiv').show();
	$('#' + player + 'undodiv').hide();
}

function addShot(hitOrMiss, player_id, team_id, playerNumber){
	console.log("@addShot");
	
	var curTeamObject = (homeAway == 'home') ? homeTeamObject : awayTeamObject;
	console.log("Shots In Round: " + shotsInRound);
	shotsInRound++;
	//alert("shotsInRound incremented to " + shotsInRound);
	var cup = curTeamObject.currentCup;
	
	if (hitOrMiss == 'hit'){
		curTeamObject.currentCup++;
		bringBackCounter++;
		$('#' + playerNumber + "cup").text(cup);
		console.log("player " + player_id + " hit " + cup + " cup");
	}else if (hitOrMiss == 'miss'){
		console.log("player " + player_id + " missed shooting for " + currentCup + " cup");
		cup = 0;
		$('#' + playerNumber + "cup").text("Miss");
	}else if (hitOrMiss == 'bringBack'){
		cup = null;
	}
	
	var d = new Date();
	mostRecentShotId = shotId = d.getTime().toString();
	
	thisShot = new Shot(cup, shotsInRound-1, team_id, player_id);

	console.log(JSON.stringify(thisShot));
	thisGame.game.rounds_attributes[currentRound].shots_attributes[shotId] = thisShot.shot;
	console.log("This game:   " + JSON.stringify(thisGame));
	console.log("added thisShot onto current round");
	
	if (bringBackCounter == 3){
		//alert("Bring 'em back!");
		console.log("Bring 'em back!");
		bringBackCounter = 0;
		if (shotsInRound == 6){
			newRound();
		}
		if (homeAway == 'home'){
			addShot('bringBack',awayTeamObject.players[0].id,awayTeamObject.id);
			addShot('bringBack',awayTeamObject.players[1].id,awayTeamObject.id);
			addShot('bringBack',awayTeamObject.players[2].id,awayTeamObject.id);
		}else if (homeAway == 'away'){
			addShot('bringBack',homeTeamObject.players[0].id,homeTeamObject.id);
			addShot('bringBack',homeTeamObject.players[1].id,homeTeamObject.id);
			addShot('bringBack',homeTeamObject.players[2].id,homeTeamObject.id);
		}
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
		//if (hitOrMiss != 'bringBack'){
			console.log("team that was just shooting was: " + homeAway);
			homeAway = (homeAway == 'home') ? 'away' : 'home';
			console.log("switching to team halfway through round:" + homeAway);
		//}
		teamUp();
	}
	
	// End of game check
	if (cup == 10){
		alert("End of game!");
		console.log("Game Data: " + JSON.stringify(thisGame));
		//alert("Game Data: " + JSON.stringify(thisGame));
		$.ajax({
			type : 'PUT',
			url : storage.getLocalKey('hostUrl') + storage.getLocalKey('currentSeasonUrl') + '/games/' + rawGameObject.id + '?auth_token=' + storage.getLocalKey('authToken'),
			contentType : 'application/json',
			headers: {
		        "Accept" : "application/json"
		    },
			data : JSON.stringify(thisGame),
			success : function(data) {
				alert("Data:"+JSON.stringify(data));
			}
		});
		quitGame();
	}
}
function quitGame(){
	storage.setLocalKey("jumpTo","games");
	window.location = "index.html";
}