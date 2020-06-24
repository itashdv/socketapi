const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ limit: '10MB', extended: false }));
app.use(bodyParser.json({ limit: '10MB', extended: true }));

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
  const { body } = req;
  console.log(body);
  res.json(body);
});

server.listen(3001);