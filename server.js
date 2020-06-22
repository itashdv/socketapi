var fs = require('fs');
var app = require('express')();
var https = require('https');

// var server = https.createServer({
//   key: fs.readFileSync('/etc/letsencrypt/live/autobook.world/privkey.pem', 'utf8'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/autobook.world/cert.pem', 'utf8'),
//   ca: fs.readFileSync('/etc/letsencrypt/live/autobook.world/chain.pem', 'utf8'),
//   requestCert: false,
//   rejectUnauthorized: false
// }, app);

const server = https.createServer({
	key: fs.readFileSync('/etc/letsencrypt/live/autobook.world/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/autobook.world/cert.pem'),
	ca: fs.readFileSync('/etc/letsencrypt/live/autobook.world/chain.pem'),
	requestCert: false,
	rejectUnauthorized: false
}, app);

server.listen(80);

// server.listen(80);

var io = require('socket.io').listen(server);

io.on('connection', socket => {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', data => {
		console.log(data);
	});
});

app.get('/', (req, res) => {
  res.send('<h2 style="text-align: center;">Welcome to Autobook sockets!</h2>');
});