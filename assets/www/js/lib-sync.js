function loadGame(gameid){
	storage.setLocalKey('currentGame',gameid);
	window.location = 'eyetoeye.html';
}

function loadLeagues(){
	if (!user.isLoggedIn()) {return;}
	$.ajax({
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
				$('#contentList').append("<li><a href='javascript:loadSeasons(" + value.url + ");'>" + value.name + "</a></li>");
			});
			$('#contentList').listview('refresh');
			$('#backLeagues').hide().trigger("create");
		}
	});
}
		
function loadSeasons(league_url){
	if (!user.isLoggedIn()) {return;}
	$.ajax({
		url:'http://mlpong.herokuapp.com'+ league_url + '.json',
		data:{'authtoken':storage.getLocalKey('authToken')},
		dataType:'json',
		type:'GET',
		error:function(data){
			alert("LoadSeasons: Error reaching server:" + JSON.stringify(data) );
		},
		success:function(data){
			$('#contentList').empty();
			$.each(data,function(key,value){
				$('#contentList').append("<li><a href='javascript:loadGames(" + value.id + ");'>" + value.name + "</a></li>");
			});
			$('#contentList').listview('refresh');
		}
	});
	$('#backLeagues').show().trigger("create");
}

function onDeviceReady() {
    if (!user.isLoggedIn()){
    	window.location = "login.html";
    }
}

function newGame(){
	var db = storage.getDB();
	db.transaction(
	   function(tx){
		   
		   /*tx.executeSql('CREATE TABLE IF NOT EXISTS games.gamestable ('+
				   			'leagueid INTEGER NOT NULL,'+
				   			'seasonid INTEGER NOT NULL,'+
				   			'gameid INTEGER NOT NULL,'+
				   			'playerid INTEGER NOT NULL,'+
				   			'cuphit INTEGER);');
	   }, errorCB, successCB);*/
	   });
}
function errorCB(){
	alert("ERROR!!!!");
}
function successCB(){
	alert("SUCCESS!!!!");
}