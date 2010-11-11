var sys = require("sys");
var net = require("net");
var ws = require('./lib/node-websocket-server/lib/ws');

var server = ws.createServer({
    debug: true
});

// argv parsing
if (process.argv.length < 4) {
    sys.puts("Usage: node now.js <domain> <port>");
} else {
    domain = process.argv[2];
    port = process.argv[3];
    
    server.addListener("listening", function(){
      sys.puts("Codebits now - Listening for connections.");
      browsers = [];
    });

    server.addListener("close", function(conn) {
            conn.close();
    });

    server.addListener("connection", function(conn){
    	server.broadcast(data);
	conn.addListener("message", function(message){
		sys.puts(message);
	});
    });

}

server.listen(port, domain);

