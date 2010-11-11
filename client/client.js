function process(json) {
	switch(json.type) {
case 'msg':
	// display msg
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
