const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ limit: '10MB', extended: false }));
app.use(bodyParser.json({ limit: '10MB', extended: true }));
app.use(cors());

const server = https.createServer({
	key: fs.readFileSync('/etc/letsencrypt/live/autobook.world/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/autobook.world/cert.pem'),
	ca: fs.readFileSync('/etc/letsencrypt/live/autobook.world/fullchain.pem'),
	requestCert: false,
	rejectUnauthorized: false
}, app);

app.get('/api/', (req, res) => {
  res.send('<h2 style="text-align: center;">Welcome to API 3001!</h2>');
});

app.post('/api/login', (req, res) => {
  const { id, name } = req.body;
  console.log(id);
  console.log(name);
  res.json({ id, name });
});

server.listen(3001);

// websockets..
const io = require('socket.io').listen(server);

io.on('connection', socket => {
	socket.emit('connect', 'Welcome to websockets 3001!');
	socket.on('greetings', message => {
		console.log(message);
	});
});

