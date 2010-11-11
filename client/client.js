function process(json) {
	var now = new Date();
	var h = now.getHours();
	var m = now.getMinutes();
	switch(json.type) {
case 'msg':
	// display msg
	$('chat-wrapper').append('<p><span class="time">['+h+':'+m+']</span> <a href="http://codebits.eu/intra/s/user/'+json.payload.id+'" class="nick">'+json.payload.name+':</span>'+json.payload.msg+'</p>');
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
} else {
conn.send(msg);
}
}
