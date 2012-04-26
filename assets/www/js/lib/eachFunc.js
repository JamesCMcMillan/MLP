eachFunc = 
	{
		leagues : function(list){
			console.log("@eachFunc.leagues");
			$('#contentList').empty();
			$.each(list,function(key,value){
				var elem = $('<li><a>' + value.name + '</a></li>').click(function(){
								console.log('clicked league choice');
								storage.setLocalKey('currentLeagueUrl', value.url);
								storage.setLocalKey('currentLeagueId', value.id);
								storage.setLocalKey('currentLeagueSlug', value.slug);
								loadSeasons();
							}).appendTo($('#contentList'));
			});
			$('#contentList').listview('refresh');
			return;
		},
		
		seasons : function(list){
			console.log("@eachFunc.seasons");
			$('#contentList').empty();
			$.each(list,function(key,value){
				var elem = $('<li><a>' + value.name + '</a></li>').click(function(){
								console.log('clicked season choice');
								storage.setLocalKey('currentSeasonId',value.id);
								storage.setLocalKey('currentSeasonUrl',value.url);
								loadPlayers();
							}).appendTo($('#contentList'));
			});
			$('#contentList').listview('refresh');
			return;
		},
		
		teams : function(list){
			console.log("@eachFunc.teams");
			$('#contentList').empty();
			list.sort(function(a,b){
							if (a.wins != b.wins){
								return b.wins - a.wins;
							}
							if (a.losses != b.losses){
								return b.losses - a.losses;
							}
							return b.point_percentage - a.point_percentage;
						});
			$.each(list,function(key,value){
				var elem = $('<li id="team' + value.id + '"><a>' + value.name +
							 '<span class="right">' + value.wins + '-' + value.losses + '</span><br />' + 
							 '<span>' + 
							 '<img class="tinyImg" src="' + user.getGravatarURL(value.players[0].email_hash) + '"/>' + 
							 '<img class="tinyImg" src="' + user.getGravatarURL(value.players[1].email_hash) + '"/>' +
							 '<img class="tinyImg" src="' + user.getGravatarURL(value.players[2].email_hash) + '"/>' +
							 '</span><span class="right">' + value.point_percentage + '</span></a></li>').click(function(){
							   	loadTeam(value.id, value);
							}).appendTo($('#contentList'));
			});
			$('#contentList').listview('refresh');
			return;
		},
		
		players : function(list){
			console.log("@eachFunc.players");
			$('#contentList').empty();
			$.each(list,function(key,value){
				var elem = $('<li id="player' + value.id + 
								'"><a><img src="' + user.getGravatarURL(value.email_hash) + '" /><span class="overflow">' + value.name + 
								'</span><span id="playerstory' + value.id + '" class="overflow details"></span>' +
								'<span class="right details">' + value.point_percentage + '</span></a></li>').click(function(){
								loadPlayer(value.id, value);
								}).appendTo($('#contentList'));
				if (value.story != null && value.story != ""){
					$('#playerstory'+value.id).html('<br />' + value.story);
				}
			});
			$('#contentList').listview('refresh');
			return;
		},
		
		games : function(list){
			console.log("@eachFunc.games");
			$('#contentList').empty();
			$.each(list,function(key,value){
				var elem = $('<li id="game' + value.id + '"><a><span class="details">' +
						value.date + "  " + value.time + "</span><br /> " +
						"<span id='" + value.id + "away_team'>" +
						value.away_team.name + "</span><br />@ " + 
						"<span id='" + value.id + "home_team'>" +
						value.home_team.name + '</span></a></li>').click(function(){
							   	storage.setLocalKey('currentGameUrl', value.url); 
							   	window.location='game.html';
							}).appendTo($('#contentList'));
				
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
			return;
		}};
	