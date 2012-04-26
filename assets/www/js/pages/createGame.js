function goBack(){
	storage.setLocalKey("jumpTo","games");
	window.location = 'index.html';
}

function createGame(){
	newGame = new Game(
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
		url : storage.getLocalKey('hostUrl') + storage.getLocalKey('currentSeasonUrl') + '/games?auth_token=' + storage.getLocalKey('authToken'),
		contentType : 'application/json',
		headers: {
	        "Accept" : "application/json"
	    },
		data : JSON.stringify(newGame),
		success : function(data) {
			window.plugins.ToastPlugin.show_short('Game Created');
			goBack();
		}
	});	
}