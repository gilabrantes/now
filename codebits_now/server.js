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
			sys.puts("new message: "+ message);
			
			switch(message.type){
				case 'auth':
					if(validIdForToken(message.token))
					break;
				default:
					throw("method not implemented");
			}
			
			
			server.broadcast(message);
		});
	});

	server.listen(9009);
//}