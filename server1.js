const express = require('express');
const io = require('socket.io-client');

const app = express();
let socket = io('http://localhost:3000');

const generateRandomLog = () => {
  const log = `Server 1 Log: ${Math.random().toString(36).substring(7)} - ${new Date()}`;
  console.log(log);
  socket.emit('log', { serverId: 1, log });
};

socket.on('connect', () => {
  console.log('Server 1 connected to the main server');
  setInterval(generateRandomLog, 
    Math.floor(Math.random() * 5000) + 1000);
});

socket.on('disconnect', () => {
  console.log(`${serverId} disconnected from the main server`);
});

app.listen(3001, () => {
  console.log('server 1 is running on http://localhost:3001');
});
