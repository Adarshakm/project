const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config();

const authRoutes = require('./routes/auth');
const conversationRoutes = require('./routes/conversation');
const messageRoutes = require('./routes/message');

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main App Routes
app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);

// Socket.io Tracking
let onlineUsers = {};

io.on('connection', (socket) => {
  console.log('User connected via WebSockets:', socket.id);

  socket.on('addUser', (userId) => {
    onlineUsers[userId] = socket.id;
    io.emit('getOnlineUsers', Object.keys(onlineUsers));
  });

  socket.on('sendMessage', ({ senderId, receiverId, text, conversationId }) => {
    const receiverSocketId = onlineUsers[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('getMessage', {
        sender: senderId,
        text,
        conversationId,
        createdAt: new Date().toISOString()
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    for (let userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
        break;
      }
    }
    io.emit('getOnlineUsers', Object.keys(onlineUsers));
  });
});

app.get('/', (req, res) => {
  res.send('MERN API is running...');
});

// Connect to MongoDB and Start Server
const startServer = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      console.error('CRITICAL: MONGO_URI not found in .env file.');
      process.exit(1);
    }

    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
    });
    console.log('MongoDB connected successfully');

    server.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

startServer();
