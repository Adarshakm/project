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

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
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
  res.send(`
    <html>
      <body style="font-family: Arial, sans-serif; padding: 2rem; text-align: center;">
        <h2>Server is running on port: ${PORT}</h2>
        <form action="/api/shutdown" method="GET" style="margin-top: 2rem;">
          <input type="hidden" name="key" value="admin123" />
          <button type="submit" style="padding: 10px 20px; background-color: #ff4444; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
            Shutdown Server
          </button>
        </form>
      </body>
    </html>
  `);
});

// --- SHUTDOWN PROCESS LOGIC ---
// URL endpoint to trigger shutdown (Use ?key=admin123 to authorize)
app.get('/api/shutdown', (req, res) => {
  // Prevent random users from shutting down the server. 
  // You must append ?key=admin123 to the URL: e.g. /api/shutdown?key=admin123
  if (req.query.key !== 'admin123') {
    return res.status(403).send('Unauthorized');
  }

  res.send('Server shutdown initiated...');
  console.log('Shutdown requested via URL endpoint.');

  // Trigger the SIGTERM event
  process.kill(process.pid, 'SIGTERM');
});

// Listen for the shutdown signal (invoked by the URL or by hosting provider)
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server gracefully...');
  server.close(() => {
    console.log('HTTP server closed.');

    // Close MongoDB connection if it's active
    if (mongoose.connection.readyState === 1) {
      mongoose.connection.close(false).then(() => {
        console.log('MongoDB connection closed.');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received (Ctrl+C).');
  process.kill(process.pid, 'SIGTERM');
});
// ------------------------------


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
