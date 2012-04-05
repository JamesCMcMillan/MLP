$.ajaxSetup({
	beforeSend: function() { $.mobile.showPageLoadingMsg(); }, //Show spinner
    complete: function() { 
    	$.mobile.hidePageLoadingMsg(); 
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
		url : 'http://mlpong.herokuapp.com' + season_url + '/teams.json',
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
		url : 'http://mlpong.herokuapp.com' + season_url + '/players.json',
		success : function(data) {
			var options = '';
			$.each(data,function(key,value){
				options += '<option value="' + value.id + '">' + value.name + '</option>';
			});
			$('.playerpicker').html(options).selectmenu("refresh");
			$.ajax({
				url : 'http://mlpong.herokuapp.com' + season_url + '/teams/' + $('#home_team').val() + '.json',
				success : function(data){
					$('#player1_picker').val(data.players[0].id).selectmenu("refresh");
					$('#player2_picker').val(data.players[1].id).selectmenu("refresh");
					$('#player3_picker').val(data.players[2].id).selectmenu("refresh");
				}
			});
			$.ajax({
				url : 'http://mlpong.herokuapp.com' + season_url + '/teams/' + $('#away_team').val() + '.json',
				success : function(data){
					$('#player4_picker').val(data.players[0].id).selectmenu("refresh");
					$('#player5_picker').val(data.players[1].id).selectmenu("refresh");
					$('#player6_picker').val(data.players[2].id).selectmenu("refresh");
				}
			});
		}
	});
}

function loadTeam(team_url){}

function loadTeams(){
	console.log("@loadTeams");
	season_url = storage.getLocalKey('currentSeasonUrl');
	league_url = storage.getLocalKey('currentLeagueUrl');
	if (!user.isLoggedIn()) {return;}
	$.ajax({
		url : 'http://mlpong.herokuapp.com' + season_url + '/teams.json',
		success : function(data) {
			$('#contentList').empty();
			$.each(data,function(key,value){
				var elem = $('<li id="team' + value.id + '"><a>' + value.name + '</a></li>')
						   .click(function(){loadTeam(value.url);}).appendTo($('#contentList'));
			});
			$('#contentList').listview('refresh');
		}
	});
	showFooter();
	$("#backButton .ui-btn-text").text("Seasons");
	$('#backButton').show().click(function(){loadSeasons(league_url)}).button();
	$('#newGame').hide();
}

function loadPlayers(){
	console.log("@loadPlayers");
	season_url = storage.getLocalKey('currentSeasonUrl');
	league_url = storage.getLocalKey('currentLeagueUrl');
	if (!user.isLoggedIn()) {return;}
	$.ajax({
		url : 'http://mlpong.herokuapp.com' + season_url + '/players.json',
		success : function(data) {
			$('#contentList').empty();
			$.each(data,function(key,value){
				var elem = $('<li id="player' + value.id + '"><a>' + value.name + 
							'<span id="playerstory' + value.id + '" class="details"></span></a></li>')
						   .click(function(){loadGame();}).appendTo($('#contentList'));
				if (value.story != null && value.story != ""){
					$('#playerstory'+value.id).html('<br />' + value.story);
				}
			});
			$('#contentList').listview('refresh');
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
	league_url = storage.getLocalKey('currentLeagueUrl');
	if (!user.isLoggedIn()) {return;}
	$.ajax({
		url : 'http://mlpong.herokuapp.com' + season_url + '/games.json',
		success : function(data) {
			$('#contentList').empty();
			$.each(data,function(key,value){
				var elem = $('<li id="game' + value.id + '"><a><span class="details">' +
						value.date + "  " + value.time + "</span><br /> " +
						"<span id='" + value.id + "away_team'>" +
						value.away_team.name + "</span><br />@ " + 
						"<span id='" + value.id + "home_team'>" +
						value.home_team.name + '</span></a></li>')
						   .click(function(){
							   	storage.setLocalKey('currentGameUrl', value.url); 
							   	window.location='game.html';})
						   .appendTo($('#contentList'));
				if (value.rounds_count != 0){
					$('<span class="ui-li-count ">' + value.rounds_count + '</span>').appendTo(elem);
				}
				if (value.winner_id != null){
					if (value.winner_id == value.away_team.id){
						$('#'+value.id+'away_team').css('font-weight','bold');
					}else if (value.winner_id == value.home_team.id){
						$('#'+value.id+'home_team').css('font-weight','bold');
					}
				}
			});
			$('#contentList').listview('refresh');
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
	$('#footer').hide();
	if (!user.isLoggedIn()) {return;}
	$('#footer').hide();
	$('#backButton').hide().button();
	$.ajax({
		url:'http://mlpong.herokuapp.com/leagues.json',
		success:function(data){
			$('#contentList').empty();
			$.each(data,function(key,value){
				var elem = $('<li><a>' + value.name + '</a></li>')
							.click(function(){
								storage.setLocalKey('currentLeagueUrl', value.url);
								storage.setLocalKey('currentLeagueId', value.id);
								storage.setLocalKey('currentLeagueSlug', value.slug);
								loadSeasons();})
							.appendTo($('#contentList'));
			});
			$('#contentList').listview('refresh');
		}
	});
}
		
function loadSeasons() {
	console.log('@loadSeasons');
	league_url = storage.getLocalKey('currentLeagueUrl');
	if (!user.isLoggedIn()) {return;}
	$.ajax({
		url : 'http://mlpong.herokuapp.com' + league_url + '.json',
		success : function(data) {
			$('#contentList').empty();
			$.each(data.seasons,function(key,value){
				var elem = $('<li><a>' + value.name + '</a></li>')
							.click(function(){
								storage.setLocalKey('currentSeasonId',value.id);
								storage.setLocalKey('currentSeasonUrl',value.url);
								loadPlayers();})
							.appendTo($('#contentList'));
			});
			$('#contentList').listview('refresh');
		}
	});
	$("#backButton .ui-btn-text").text("Leagues");
	$('#backButton').click(function(){loadLeagues();}).show().button();
	$('#footer').hide();
}

function onDeviceReady() {
    if (!user.isLoggedIn()){
    	window.location = "login.html";
    }
    $('#footer').hide();
    $('#backButton').hide();
}