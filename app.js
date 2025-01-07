const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const logs = { 1: [], 2: [], 3: [] };

app.use(express.json());

io.on('connection', (socket) => {
  console.log('A server connected:', socket.id);

  socket.on('log', (data) => {
    console.log(`Received log from ${data.serverId}:`, data.log);
    if (data.serverId && logs[data.serverId]) {
      logs[data.serverId].push(data.log);
    }
  });

  socket.on('disconnect', () => {
    console.log('A server disconnected:', socket.id);
  });
});

app.get('/logs/all', (req, res) => {
  res.json(logs);
});

app.get('/logs/:serverId', (req, res) => {
  const serverId = req.params.serverId;
  if (logs[serverId]) {
    res.json(logs[serverId]);
  } else {
    res.status(404).json({ error: `Logs for ${serverId} not found` });
  }
});

server.listen(3000, () => {
  console.log('Main server is running on http://localhost:3000');
});
