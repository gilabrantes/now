function process(json) {
	var now = new Date();
	switch(json.type) {
case 'msg':
	// display msg
	addMsg(now,json.payload.id, json.payload.name, json.payload.msg);
	break;
case 'join':
	// another user joined chat
	break;
case 'part':
	// another user left chat
	break;
case 'notice':
	// server notice
	break;
default:
  // unknown
	}
}

function processInput(msg) {
	if (tokens=msg.match(/\/auth\s+([^\s]+)\s+([^\s]+)/)) {
		// api auth
		response = $.ajax({   type: "GET",   url: "https://services.sapo.pt/Codebits/gettoken",   data: "user="+tokens[1]+"&password="+tokens[2],   success: function(msg){alert( "Data Saved: " + msg );}});
		
	} else {
		conn.send(msg);
	}
}

function addMsg(now, mid, mname, msg) {
	var h = now.getHours();
	var m = now.getMinutes();
	$('#chat-wrapper').append('<p><span class="time">['+h+':'+m+']</span> <a href="http://codebits.eu/intra/s/user/'+mid+'" class="nick">'+mname+': </a> '+msg+'</p>');
	crop();
}

function addInfo(now, msg) {
	var h = now.getHours();
	var m = now.getMinutes();
	$('#chat-wrapper').append('<p class="help"><span class="time">['+h+':'+m+']</span> '+msg+'</p>');
	crop();
}

function addSystem(now, msg) {
	var h = now.getHours();
	var m = now.getMinutes();
	$('#chat-wrapper').append('<p class="notice"><span class="time">['+h+':'+m+']</span> '+msg+'</p>');
	crop();
}

function crop() {
	count++;
	if (count>200) {
		$('#chat-wrapper p:first').remove();
	}
}
