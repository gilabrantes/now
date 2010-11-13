var sys = require("sys");
var net = require("net");
var http = require("http");
var ws = require('./lib/node-websocket-server/lib/ws.js');
var codebits = require('./lib/codebits.js');

var clients = {};

var server = ws.createServer({
	debug: true
});

	server.addListener("listening", function(){
		sys.puts("Codebits now - Listening for connections.");
		browsers = [];
	});

	server.addListener("close", function(conn) {
		delete clients[conn.storage.get("token")];

		conn.close();

		var out = '{"type":"room","payload":{"room":{"name":"","people":[';
		
		for(var token in clients){
			out += '{"name":"'+clients[token].name+'","id":"'+clients[token].id+'"},';
		}
		
		out=out.replace(/,$/,"");
		
		out += ']}}}';
		
		server.broadcast(out);
	});

	server.addListener("connection", function(conn){
		sys.puts("new connection: "+ conn);
		
		conn.addListener("message", function(message){
			var msg = JSON.parse(message);
			
			sys.puts("message from token: "+ msg.token);
			
			if(conn.storage.get("token")){
				var client = clients[conn.storage.get("token")];
				sys.puts("user already known: "+ client.nick);
				
				server.broadcast('{"type":"msg","payload":{"msg":"'+msg.msg+'","id":"'+client.id+'","name":"'+client.nick+'"}}');
			}else if(msg.msg == "handshake"){
				sys.puts("handshake from user");
				
				conn.storage.set("token", msg.token);
				
				var user_data;
				
				var request = codebits.userDetailsForToken(msg.token);
				
				request.on('response', function (response) {
					response.setEncoding('utf8');
					response.on('data', function (chunk) {
						user_data = JSON.parse(chunk);
						clients[msg.token] = user_data;
						
						conn.storage.set("user_data", user_data);
						
						var out = '{"type":"room","payload":{"room":{"name":"","people":[';
						
						for(var token in clients){
							out += '{"name":"'+clients[token].name+'","id":"'+clients[token].id+'"},';
						}
						
						out=out.replace(/,$/,"");
						
						out += ']}}}';
						
						server.broadcast(out);
						
					});
				});
			}
		});
	});

	server.listen(9009);
//}