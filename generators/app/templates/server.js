var port = 8765;
var http = require('http');
var send = require('send');
var url = require('url');
var app = http.createServer(function(req, res) {
    send(req, url.parse(req.url).pathname).root(__dirname).pipe(res);
});
app.listen(port, '127.0.0.1');
var base = 'http://127.0.0.1:' + port;
console.log('Listening on ' + base + '/');
console.log(base + '/app/index.html');
