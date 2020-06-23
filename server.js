const express = require('express');
const axios = require('axios');
// const mongoose = require('mongoose');
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

// const connStr = 'mongodb://primaryuser:sdf87HGkdf8@localhost:27017/primary';
// mongoose.connect(connStr, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
// 	if (err) {
// 		console.log('Problem connecting to database!');
// 	} else {
// 		console.log('Connected to database!');
// 	}
// });

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

// utils..
const validateInput = require('./utils/validateInput');

// namespaces list..
const drivingSchools = io.of('drivingSchools');
const primary = io.of('primary');

primary.on('connection', socket => {

	socket.on('registerCompany', async data => {
		try {
			const result = await validateInput.companyRegistration(data);
			const response = await axios({
			  method: 'post',
			  url: 'http://localhost:3000',
			  data: result
			});
			return socket.emit('register_company_success', response.data);
		} catch (error) {
			return socket.emit('error', error);
		}
	});

	socket.on('error', error => socket.emit('register_company_error', error));

});

drivingSchools.on('connection', socket => {

	socket.on('joinRoom', room => {
		drivingSchoolsRooms.includes(room)
			? socket.emit('success', `Company ${ room } found!`)
			: socket.emit('error', 'Driving school not found!');
	});

	socket.on('error', error => {
		console.log(error);
		socket.emit('err', error);
	});

});


// io.on('connection', socket => {
// 	socket.emit('news', { hello: 'world' });
// 	socket.on('my other event', data => {
// 		console.log(data);
// 	});
// });

// Namespaces and rooms..
// const data = [
// 	{
// 		apiKey: 'WPTFB3Y-WWS4JR9-QW2T45Q-D7BVCXB',
// 		uuid: 'e5b4f58f-e732-4961-bf05-a21669d7b675'
// 	},
// 	{
// 		apiKey: 'J1M6PRH-W9DMPBA-HAK2RES-ZTN8SQG',
// 		uuid: '90686b62-e25b-4b2d-8aa6-2c3bfeaa8cde'
// 	},
// 	{
// 		apiKey: '3EA6K88-N88MHNX-PVQY0G6-1E3X9AV',
// 		uuid: '1b9469a1-aa11-48d7-b6ef-e0400b87d4ab'
// 	}
// ];

// const drivingSchoolsRooms = [
// 	'e5b4f58f-e732-4961-bf05-a21669d7b675',
// 	'90686b62-e25b-4b2d-8aa6-2c3bfeaa8cde',
// 	'1b9469a1-aa11-48d7-b6ef-e0400b87d4ab'
// ];