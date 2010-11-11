var sys = require("sys"),
		http = require("http");
		


/*
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
*/
exports.userDetailsForToken = function (token) {
	var httpClient = http.createClient(80, 'services.sapo.pt');
	var request = httpClient.request('GET', "/Codebits/user/"+idForToken(token)+"?token="+token, {'host': 'services.sapo.pt'});
	
	request.end();
	
	return request;
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

