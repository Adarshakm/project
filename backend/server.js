const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // Required for Socket.io
const { Server } = require('socket.io'); // Socket.io class
require('dotenv').config();

const chatRoutes = require('./routes/chatRoutes');
const Message = require('./models/Message');

const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React app URL
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/messages', chatRoutes);

app.get('/', (req, res) => {
  res.send('MERN API + Socket.IO is running...');
});

// Socket.io Event Handling
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Join a specific chat room
  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  // Handle sending a message
  socket.on('send_message', async (data) => {
    // data should contain { sender, receiver, text, room }
    try {
      // Save message to database
      const newMessage = new Message({
        sender: data.sender,
        receiver: data.receiver,
        text: data.text
      });
      await newMessage.save();

      // Emit to everyone in the room (including sender to verify)
      io.to(data.room).emit('receive_message', newMessage);
    } catch (err) {
      console.error('Error saving/sending message via socket:', err);
    }
  });

  // --- Video Calling Signaling ---
  
  // Initiating a call
  socket.on('call_user', (data) => {
    // data: { userToCall, signalData, from, name }
    socket.to(data.userToCall).emit('incoming_call', {
      signal: data.signalData,
      from: data.from,
      name: data.name
    });
  });

  // Answering a call
  socket.on('answer_call', (data) => {
    // data: { to, signal }
    socket.to(data.to).emit('call_accepted', data.signal);
  });

  // ICE Candidates exchange
  socket.on('ice_candidate', (data) => {
    // data: { to, candidate }
    socket.to(data.to).emit('ice_candidate', data.candidate);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
if (mongoURI) {
  mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
} else {
  console.log('MongoDB URI not found in .env file. Skipping connection.');
}

// Start HTTP server instead of Express app
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
