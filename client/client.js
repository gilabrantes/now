function process(json) {
	switch(json.type) {
case 'msg':
	// display msg
	$('chat-wrapper').append('<p><span class="time">[12:00]</span> <a href="http://codebits.eu/intra/s/user/'+json.payload.id+'" class="nick">'+json.payload.name+':</span>'+json.payload.msg+'</p>');
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
