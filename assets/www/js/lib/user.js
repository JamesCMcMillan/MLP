user = 
{
	logIn : function(){
		$('#errorDiv').hide();
		var username = $('#username').val();
		var password = $('#password').val();
		if (null == username || null == password){
			$('#errorDiv').show().text('Please enter a username and password');
		}
		$.ajax({
			url: storage.getLocalKey('hostUrl') +  '/tokens.json',
			data:{'email':username, 'password':password},
			dataType:'json',
			type:'POST',
			statusCode: {
	   	 		401: function() {
	      			$('#errorDiv').show().text('Incorrect username or password');
	    		}
	    	},
			success:function(data){
				storage.setLocalKey("authToken", data.token);
				window.location = "index.html";
			}
		});
	},
	logOut : function(){
		storage.removeLocalKey("authToken");
		storage.removeLocalKey("jumpTo");
		window.location = "login.html";
	},
	isLoggedIn: function(){
		return (storage.getLocalKey("authToken") != null) ? true : false;
	},
	getGravatarURL: function (email_hash){
		return "http://www.gravatar.com/avatar/" + email_hash + "?d=monsterid&r=x";
	}
};