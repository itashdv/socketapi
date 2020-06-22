// const fs = require('fs');
// // Certificate
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/autobook.world/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/autobook.world/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/autobook.world/chain.pem', 'utf8');
// const credentials = { key: privateKey, cert: certificate, ca: ca };
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(80);

app.get('/', (req, res) => {
	res.send('<h2 style="text-align: center;">Welcome to Autobook sockets!</h2>');
});

io.on('connection', socket => {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', data => {
		console.log(data);
	});
});