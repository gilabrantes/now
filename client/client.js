function process(json) {
	switch(json.type) {
case 'msg':
	// display msg
	addMsg(json.payload.id, json.payload.name, json.payload.msg);
	break;
case 'join':
	// another user joined chat
	addInfo(json.payload.name+' joined the chat.');
	break;
case 'part':
	// another user left chat
	addInfo(json.payload.name+' left the chat.');
	break;
case 'notice':
	// server notice
	addSystem(json.payload.msg);
	break;
default:
  // unknown
	}
}

function processInput(msg) {
	if (tokens=msg.match(/\/auth\s+([^\s]+)\s+([^\s]+)/)) {
		// api auth
		$.ajax({url:"http://services.sapo.pt/Codebits/gettoken?user="+tokens[1]+"&password="+tokens[2], dataType:'jsonp', data:'', success: function (data){token=data.token;if (token) {addSystem('Authentication successfull!');}}});
	} else {
		if (token) {
			conn.send("{'token':'"+token+"', 'msg':'"+msg+"'}");
		} else {
			addInfo('Please authenticate with the Codebits API using "/auth email password" <em>- [keep in mind this authentication is 100% client-side]</em>');
		}
	}
	clearField();
}

function addMsg(mid, mname, msg) {
	var now = new Date();
	var h = now.getHours();
	var m = now.getMinutes();
	$('#chat-wrapper').append('<p><span class="time">['+h+':'+m+']</span> <a href="http://codebits.eu/intra/s/user/'+mid+'" class="nick">'+mname+': </a> '+msg+'</p>');
	crop();
}

function addInfo(msg) {
	var now = new Date();
	var h = now.getHours();
	var m = now.getMinutes();
	$('#chat-wrapper').append('<p class="help"><span class="time">['+h+':'+m+']</span> '+msg+'</p>');
	crop();
}

function addSystem(msg) {
	var now = new Date();
	var h = now.getHours();
	var m = now.getMinutes();
	$('#chat-wrapper').append('<p class="notice"><span class="time">['+h+':'+m+']</span> '+msg+'</p>');
	crop();
}

function crop() {
	// keep elements at 500
	count++;
	if (count>500) {
		$('#chat-wrapper p:first').remove();
	}
	// move div to bottom
	$("#chat-wrapper").attr({ scrollTop: $("#chat-wrapper").attr("scrollHeight") });
}

function clearField() {
	$('#inputForm').val('');
}
