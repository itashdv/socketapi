const express = require('express');
const helmet = require('helmet');
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

app.use(helmet());

app.get('/', (req, res) => {
  res.send('<h2 style="text-align: center;">Welcome to Autobook sockets!</h2>');
});

server.listen(8080);

const io = require('socket.io').listen(server);

// // Commented out for development only!..
// io.origins((origin, callback) => {
//   if (origin !== 'https://autobook.world') {
//     return callback('origin not allowed', false);
//   }
//   callback(null, true);
// });

io.on('connection', socket => {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', data => {
		console.log(data);
	});
});

// testing namespaces..
const data = [
	{
		apiKey: 'WPTFB3Y-WWS4JR9-QW2T45Q-D7BVCXB',
		uuid: 'e5b4f58f-e732-4961-bf05-a21669d7b675'
	},
	{
		apiKey: 'J1M6PRH-W9DMPBA-HAK2RES-ZTN8SQG',
		uuid: '90686b62-e25b-4b2d-8aa6-2c3bfeaa8cde'
	},
	{
		apiKey: '3EA6K88-N88MHNX-PVQY0G6-1E3X9AV',
		uuid: '1b9469a1-aa11-48d7-b6ef-e0400b87d4ab'
	}
];

const namespacesArr = [
	'e5b4f58f-e732-4961-bf05-a21669d7b675',
	'90686b62-e25b-4b2d-8aa6-2c3bfeaa8cde',
	'1b9469a1-aa11-48d7-b6ef-e0400b87d4ab'
];

const tenant1 = io.of('e5b4f58f-e732-4961-bf05-a21669d7b675');
const tenant2 = io.of('90686b62-e25b-4b2d-8aa6-2c3bfeaa8cde');
const tenant3 = io.of('1b9469a1-aa11-48d7-b6ef-e0400b87d4ab');

tenant1.on('connection', socket => {
	console.log('Tenant e5b4f58f-e732-4961-bf05-a21669d7b675 connected!');
	socket.emit('welcome', 'Hello, Tenant e5b4f58f-e732-4961-bf05-a21669d7b675!');
	socket.on('greetings', data => {
		console.log(data);
	})
});

tenant2.on('connection', socket => {
	console.log('Tenant 90686b62-e25b-4b2d-8aa6-2c3bfeaa8cde connected!');
	socket.emit('welcome', 'Hello, Tenant 90686b62-e25b-4b2d-8aa6-2c3bfeaa8cde!');
	socket.on('greetings', data => {
		console.log(data);
	})
});

tenant3.on('connection', socket => {
	console.log('Tenant 1b9469a1-aa11-48d7-b6ef-e0400b87d4ab connected!');
	socket.emit('welcome', 'Hello, Tenant 1b9469a1-aa11-48d7-b6ef-e0400b87d4ab!');
	socket.on('greetings', data => {
		console.log(data);
	})
});