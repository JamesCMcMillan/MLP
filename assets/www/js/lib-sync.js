function loadGame(game_url){}

function loadTeam(team_url){}

function loadTeams(season_url,league_url){
	if (!user.isLoggedIn()) {return;}
	$.ajax({
		beforeSend: function() { $.mobile.showPageLoadingMsg(); }, //Show spinner
        complete: function() { $.mobile.hidePageLoadingMsg() }, //Hide spinner
		url : 'http://mlpong.herokuapp.com' + season_url + '/teams.json',
		data : {'authtoken':storage.getLocalKey('authToken')},
		dataType : 'json',
		type : 'GET',
		error : function(data) {
			alert("LoadSeasons: Error reaching server:" + JSON.stringify(data) );
		},
		success : function(data) {
			$('#contentList').empty();
			$.each(data,function(key,value){
				var elem = $('<li id="team' + value.id + '"><a>' + value.name + '</a></li>')
						   .click(function(){loadTeam(value.url);}).appendTo($('#contentList'));
				if (value.story != null && value.story != ""){
					$('#playerstory'+value.id).html('<br />' + value.story);
				}
			});
			$('#contentList').listview('refresh');
		}
	});
}

function loadPlayers(season_url,league_url){
	if (!user.isLoggedIn()) {return;}
	$.ajax({
		beforeSend: function() { $.mobile.showPageLoadingMsg(); }, //Show spinner
        complete: function() { $.mobile.hidePageLoadingMsg() }, //Hide spinner
		url : 'http://mlpong.herokuapp.com' + season_url + '/players.json',
		data : {'authtoken':storage.getLocalKey('authToken')},
		dataType : 'json',
		type : 'GET',
		error : function(data) {
			alert("LoadSeasons: Error reaching server:" + JSON.stringify(data) );
		},
		success : function(data) {
			$('#contentList').empty();
			$.each(data,function(key,value){
				var elem = $('<li id="player' + value.id + '"><a>' + value.name + 
							'<span id="playerstory' + value.id + '" class="details"></span></a></li>')
						   .click(function(){loadGame(value.url);}).appendTo($('#contentList'));
				if (value.story != null && value.story != ""){
					$('#playerstory'+value.id).html('<br />' + value.story);
				}
			});
			$('#contentList').listview('refresh');
		}
	});
	$("#backButton .ui-btn-text").text("Seasons");
	$('#backButton').click(function(){loadSeasons(league_url)}).button();
	$('#playersTab').click(function(){loadPlayers(season_url,league_url)});
	$('#gamesTab').click(function(){loadGames(season_url,league_url)});
	$('#teamsTab').click(function(){loadTeams(season_url,league_url)});
	$('#footer').show();
}

function loadGames(season_url,league_url){
	if (!user.isLoggedIn()) {return;}
	$.ajax({
		beforeSend: function() { $.mobile.showPageLoadingMsg(); }, //Show spinner
        complete: function() { $.mobile.hidePageLoadingMsg() }, //Hide spinner
		url : 'http://mlpong.herokuapp.com' + season_url + '/games.json',
		data : {'authtoken':storage.getLocalKey('authToken')},
		dataType : 'json',
		type : 'GET',
		error : function(data) {
			alert("LoadSeasons: Error reaching server:" + JSON.stringify(data) );
		},
		success : function(data) {
			$('#contentList').empty();
			$.each(data,function(key,value){
				var elem = $('<li id="game' + value.id + '"><a><span class="details">' +
						value.date + "  " + value.time + "</span><br /> " +
						"<span id='" + value.id + "away_team'>" +
						value.away_team.name + "</span><br />@ " + 
						"<span id='" + value.id + "home_team'>" +
						value.home_team.name + '</span></a></li>')
						   .click(function(){loadGame(value.url);}).appendTo($('#contentList'));
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
	$("#backButton .ui-btn-text").text("Seasons");
	$('#backButton').click(function(){loadSeasons(league_url)}).button();
}

function loadLeagues(){
	if (!user.isLoggedIn()) {return;}
	$.ajax({
		beforeSend: function() { $.mobile.showPageLoadingMsg(); }, //Show spinner
        complete: function() { $.mobile.hidePageLoadingMsg() }, //Hide spinner
		url:'http://mlpong.herokuapp.com/leagues.json',
		data:{'auth_token':storage.getLocalKey('authToken')},
		dataType:'json',
		type:'GET',
		error:function(data){
			alert("LoadLeagues: Error reaching server:" + JSON.stringify(data) );
		},
		success:function(data){
			$('#contentList').empty();
			$.each(data,function(key,value){
				var elem = $('<li><a>' + value.name + '</a></li>').click(function(){loadSeasons(value.url);}).appendTo($('#contentList'));
			});
			$('#contentList').listview('refresh');
			$('#backButton').hide().button();
			$('#footer').hide();
		}
	});
}
		
function loadSeasons(league_url) {
	if (!user.isLoggedIn()) {return;}
	$.ajax({
		beforeSend: function() { $.mobile.showPageLoadingMsg(); }, //Show spinner
        complete: function() { $.mobile.hidePageLoadingMsg() }, //Hide spinner
		url : 'http://mlpong.herokuapp.com' + league_url + '.json',
		data : {'authtoken':storage.getLocalKey('authToken')},
		dataType : 'json',
		type : 'GET',
		error : function(data) {
			alert("LoadSeasons: Error reaching server:" + JSON.stringify(data) );
		},
		success : function(data) {
			$('#contentList').empty();
			$.each(data.seasons,function(key,value){
				var elem = $('<li><a>' + value.name + '</a></li>').click(function(){loadPlayers(value.url, league_url);}).appendTo($('#contentList'));
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
}