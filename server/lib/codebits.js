var sys = require("sys");

function processInput(jsonPayload) {
	var message = jsonPayload.rawInput;

	if(message[0] == '/'){
		switch(command){
			case 'join':

				break;
			case 'part':

				break;
			default:
				throw("ERR: message type not recognized");
		}
	}else{
		
	}
}

function idForToken(token) {
	var decoded = decodeToken(token);
	var splat = decoded.split("#");
	var id = splat[0];

	return id;
}

function decodeToken(token) {
	var buf = new Buffer(token,"base64");

	return buf.toString('ascii');
}

sys.puts(idForToken("MjMjdHBpbnRvQHdlYnJlYWtzdHVmZi5jb20jOTUyM2M4NTQyOGUyZTFlODg5Nzg0ZGYxNzE0YWJmM2UjMTI4OTQzMjIyMyM2M2JiMTVhYjk1ZGM1MjYxZjg3NDJmNjVhMTI4YTI5Nw=="));

