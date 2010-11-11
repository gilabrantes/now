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
	if (msg.match(/\/auth/)) {
		// api auth
		console.debug('auth!');
	} else {
		conn.send(msg);
	}
}

function addMsg(now, mid, mname, msg) {
	var h = now.getHours();
	var m = now.getMinutes();
	$('#chat-wrapper').append('<p><span class="time">['+h+':'+m+']</span> <a href="http://codebits.eu/intra/s/user/'+mid+'" class="nick">'+mname+': </a> '+msg+'</p>');
}

function addInfo(now, msg) {
	var h = now.getHours();
	var m = now.getMinutes();
	$('#chat-wrapper').append('<p class="help"><span class="time">['+h+':'+m+']</span> '+msg+'</p>');
}

function addSystem(now, msg) {
	var h = now.getHours();
	var m = now.getMinutes();
	$('#chat-wrapper').append('<p class="notice"><span class="time">['+h+':'+m+']</span> '+msg+'</p>');
}
