const express = require('express');
const helmet = require('helmet');
// const fallback = require('express-history-api-fallback');
const fs = require('fs');
const app = express();
const https = require('https');

const server = https.createServer({
	key: fs.readFileSync('/etc/letsencrypt/live/autobook.world/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/autobook.world/cert.pem'),
	ca: fs.readFileSync('/etc/letsencrypt/live/autobook.world/fullchain.pem'),
	requestCert: false,
	rejectUnauthorized: false
}, app);

// const root = `${__dirname}/build`;
// app.use(express.static(root));
// app.use(fallback('index.html', { root: root }));

app.use(helmet());

app.get('/', (req, res) => {
  res.send('<h2 style="text-align: center;">Welcome to Autobook sockets!</h2>');
});

server.listen(8080);

const io = require('socket.io').listen(server);

io.origins((origin, callback) => {
  if (origin !== 'https://autobook.world') {
    return callback('origin not allowed', false);
  }
  callback(null, true);
});

io.on('connection', socket => {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', data => {
		console.log(data);
	});
});