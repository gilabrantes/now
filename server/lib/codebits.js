var sys = require("sys");

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

sys.puts(""+idForToken("MjMjdHBpbnRvQHdlYnJlYWtzdHVmZi5jb20jOTUyM2M4NTQyOGUyZTFlODg5Nzg0ZGYxNzE0YWJmM2UjMTI4OTQzMjIyMyM2M2JiMTVhYjk1ZGM1MjYxZjg3NDJmNjVhMTI4YTI5Nw==") );

