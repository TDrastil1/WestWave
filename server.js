const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

let messages = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Send existing messages to the connected user
  socket.emit('load_messages', messages);

  // Receive and broadcast new messages
  socket.on('send_message', (message) => {
    messages.push(message);
    io.emit('receive_message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Simple API endpoint for health check
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
