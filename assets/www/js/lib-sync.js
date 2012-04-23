$.ajaxSetup({
	beforeSend: function() { $('#loader').show(); }, //Show spinner
    complete: function() { 
    	$('#loader').hide(); 
    	if (typeof(myScroll) != "undefined" && myScroll !== null){
    		setTimeout(function () {
    			myScroll.refresh();
    		}, 0); }
    	},
	data : {'auth_token':storage.getLocalKey('authToken')},
	dataType : 'json',
	type : 'GET',
	error : function(data) {
		alert("Error reaching server:" + JSON.stringify(data));
	}
});

function showFooter(){
	console.log("Showing footer");
	$('#backButton').click(function(){loadSeasons();}).button();
	$('#footer').show();
}

function loadAllTeams(){
	season_url = storage.getLocalKey('currentSeasonUrl');
	$.ajax({
		url : storage.getLocalKey('hostUrl') + season_url + '/teams.json',
		success : function(data) {
			var options = '';
			$.each(data,function(key,value){
				options += '<option value="' + value.id + '">' + value.name + '</option>';
			});
			$("#home_team,#away_team").html(options).selectmenu("refresh").change(function(){loadAllUsers();});
		}
	});	
}

function loadAllUsers(){
	season_url = storage.getLocalKey('currentSeasonUrl');
	var match = season_url.match(/\d+/);
	storage.setLocalKey('currentSeasonId',parseInt(match[0], 10));
	
	$.ajax({
		url : storage.getLocalKey('hostUrl') + season_url + '/players.json',
		success : function(data) {
			var options = '';
			$.each(data,function(key,value){
				options += '<option value="' + value.id + '">' + value.name + '</option>';
			});
			$('.playerpicker').html(options).selectmenu("refresh");
			$.ajax({
				url : storage.getLocalKey('hostUrl') + season_url + '/teams/' + $('#home_team').val() + '.json',
				success : function(data){
					$('#player1_picker').val(data.players[0].id).selectmenu("refresh");
					$('#player2_picker').val(data.players[1].id).selectmenu("refresh");
					$('#player3_picker').val(data.players[2].id).selectmenu("refresh");
				}
			});
			$.ajax({
				url : storage.getLocalKey('hostUrl') + season_url + '/teams/' + $('#away_team').val() + '.json',
				success : function(data){
					$('#player4_picker').val(data.players[0].id).selectmenu("refresh");
					$('#player5_picker').val(data.players[1].id).selectmenu("refresh");
					$('#player6_picker').val(data.players[2].id).selectmenu("refresh");
				}
			});
		}
	});
}

function loadTeam(team_id, team){
	storage.setLocalKey('currentTeamId', team_id);
	storage.setLocalKey('currentTeamInfo', JSON.stringify(team));
	storage.setLocalKey('jumpTo', "teams");
	window.location = 'team.html';
}

function loadTeams(){
	console.log("@loadTeams");
	season_url = storage.getLocalKey('currentSeasonUrl');
	season_id = storage.getLocalKey('currentSeasonId');
	league_url = storage.getLocalKey('currentLeagueUrl');
	
	menuCacher.loadMenu('teams','teams'+season_id);	
	
	if (!user.isLoggedIn()) {return;}
	$.ajax({
		url : storage.getLocalKey('hostUrl') + season_url + '/teams.json',
		success : function(data) {
			if (JSON.stringify(data) != JSON.stringify(menuMemory.load('teams'+season_id))){
				eachFunc.teams(data);
				menuMemory.save('teams'+season_id, data);
			}
		}
	});
	showFooter();
	$("#backButton .ui-btn-text").text("Seasons");
	$('#backButton').show().click(function(){loadSeasons(league_url)}).button();
	$('#newGame').hide();
}

function loadPlayer(player_id, player){
	storage.setLocalKey('currentPlayerInfo', JSON.stringify(player));
	storage.setLocalKey('currentPlayerId', player_id);
	storage.setLocalKey('jumpTo', "players");
	window.location = 'player.html';
}

function loadPlayers(){
	console.log("@loadPlayers");
	if (!user.isLoggedIn()) {return;}
	
	season_url = storage.getLocalKey('currentSeasonUrl');
	season_id = storage.getLocalKey('currentSeasonId');
	league_url = storage.getLocalKey('currentLeagueUrl');
	
	menuCacher.loadMenu('players','players'+season_id);	
	
	$.ajax({
		url : storage.getLocalKey('hostUrl') + season_url + '/players.json',
		success : function(data) {
			if (JSON.stringify(data) != JSON.stringify(menuMemory.load('players'+season_id))){
				eachFunc.players(data);
				menuMemory.save('players'+season_id, data);
			}
		}
	});
	$("#backButton .ui-btn-text").text("Seasons");
	$('#backButton').show().click(function(){loadSeasons(league_url)}).button();
	showFooter();
	$('#newGame').hide();
}

function loadGames(){
	console.log('@loadGames');
	season_url = storage.getLocalKey('currentSeasonUrl');
	season_id = storage.getLocalKey('currentSeasonId');
	league_url = storage.getLocalKey('currentLeagueUrl');
	if (!user.isLoggedIn()) {return;}
	
	menuCacher.loadMenu('games','games'+season_id);
	
	$.ajax({
		url : storage.getLocalKey('hostUrl') + season_url + '/games.json',
		success : function(data) {
			if (JSON.stringify(data) != JSON.stringify(menuMemory.load('games'+season_id))){
				eachFunc.games(data);
				menuMemory.save('games'+season_id, data);
			}
		}
	});
	showFooter();
	$("#backButton .ui-btn-text").text("Seasons");
	$('#backButton').show().click(function(){loadSeasons(league_url)}).button();
	$('#logout').hide().button();
	$('#newGame').show().button();
}
function goToGamePage(){
	window.location='createGame.html';
}

function loadLeagues(){
	console.log('@loadLeagues');
	if (!user.isLoggedIn()) {return;}
	
	$('#footer').hide();
	$('#backButton').hide().button();
	$('#newGame').hide();
	
	menuCacher.loadMenu('leagues','leagues');
	
	$.ajax({
		url:storage.getLocalKey('hostUrl') + '/leagues.json',
		success:function(data){
			if (JSON.stringify(data) != JSON.stringify(menuMemory.load('leagues'))){
				eachFunc.leagues(data);
				menuMemory.save('leagues', data);
			}
		}
	});
}
		
function loadSeasons() {
	console.log('@loadSeasons');
	if (!user.isLoggedIn()) {return;}
	league_url = storage.getLocalKey('currentLeagueUrl');
	league_id = storage.getLocalKey('currentLeagueId');
	
	menuCacher.loadMenu('seasons','seasons'+league_id);
	
	$.ajax({
		url : storage.getLocalKey('hostUrl') + league_url + '.json',
		success : function(data) {
			if (JSON.stringify(data.seasons) != JSON.stringify(menuMemory.load('seasons'+league_id))){
				eachFunc.seasons(data.seasons);
				menuMemory.save('seasons'+league_id, data.seasons);
			}
		}
	});
	
	$("#backButton .ui-btn-text").text("Leagues");
	$('#backButton').click(function(){loadLeagues();}).show().button();
	$('#newGame').hide();
	$('#footer').hide();
}

function onDeviceReady() {
    if (!user.isLoggedIn()){
    	window.location = "login.html";
    }
}