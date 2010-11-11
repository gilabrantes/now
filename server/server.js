var sys = require("sys");
var net = require("net");
var http = require("http");
var ws = require('./lib/node-websocket-server/lib/ws.js');
var codebits = require('./lib/codebits.js');

var clients = {};

var server = ws.createServer({
	debug: true
});

// argv parsing
//if (process.argv.length < 4) {
//	sys.puts("Usage: node now.js <domain> <port>");
//} else {
	//domain = process.argv[2];
	//port = process.argv[3];

	server.addListener("listening", function(){
		sys.puts("Codebits now - Listening for connections.");
		browsers = [];
	});

	server.addListener("close", function(conn) {
		conn.close();
	});

	server.addListener("connection", function(conn){
		sys.puts("new connection: "+ conn);
		
		conn.addListener("message", function(message){
			var msg = JSON.parse(message);
			
			sys.puts("message from token: "+ msg.token);
			
			server.broadcast("message received: " + msg.msg);
			
			if(clients[msg.token]){
				sys.puts("gotcha!");
			}else{
				var request = codebits.userDetailsForToken(msg.token);
				request.on('response', function (response) {
					response.setEncoding('utf8');
					response.on('data', function (chunk) {
						clients[msg.token] = JSON.parse(chunk);
					});
				});
			}
			
			for(var i in clients){
				sys.puts(clients[i].nick);
			}
			
			/*
			server.broadcast("server message: "+message);
			
			switch(message.type){
				case 'auth':
					if(validIdForToken(message.token))
					break;
				default:
					server.broadcast("NI: "+message);
					//throw("method not implemented");
			}*/
		});
	});

	server.listen(9009);
//}