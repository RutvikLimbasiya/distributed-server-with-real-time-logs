const express = require('express');
const io = require('socket.io-client');

const app = express();
let socket = io('http://localhost:3000');

const generateRandomLog = () => {
  const log = `Server 3 Log: ${Math.random().toString(36).substring(7)} - ${new Date()}`;
  console.log(log);
  socket.emit('log', { serverId: 3, log });
};

socket.on('connect', () => {
  console.log('Server 3 connected to the main server');
  setInterval(generateRandomLog, 
    Math.floor(Math.random() * 5000) + 3000);
});

socket.on('disconnect', () => {
  console.log(`${serverId} disconnected from the main server`);
});

app.listen(3003, () => {
  console.log('server 3 is running on http://localhost:3003');
});