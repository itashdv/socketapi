const fs = require('fs');
const app = require('express')();
const io = require('socket.io')(server);

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/autobook.world/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/autobook.world/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/autobook.world/chain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate, ca: ca };

const server = require('https').Server(credentials, app);

server.listen(8080);

app.get('/', (req, res) => {
	res.send('<h2 style="text-align: center;">Welcome to Autobook sockets!</h2>');
});

io.on('connection', socket => {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', data => {
		console.log(data);
	});
});