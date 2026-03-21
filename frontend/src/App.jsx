import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import { io } from 'socket.io-client';
import './index.css';

const MainApp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Real-time Chat State
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  const socket = React.useRef();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Watch for window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Auth Protection
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/');
    }
  }, [navigate]);

  // Socket Connection Setup
  useEffect(() => {
    if (user) {
      socket.current = io(BACKEND_URL);
      socket.current.emit("addUser", user.id);
      
      socket.current.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      
      socket.current.on("getMessage", (data) => {
        setMessages(prev => [...prev, {
          sender: data.sender,
          text: data.text,
          createdAt: data.createdAt
        }]);
      });
    }
    return () => socket.current?.disconnect();
  }, [user, BACKEND_URL]);

  // Fetch Conversations List
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/conversations/${user?.id}`);
        const data = await res.json();
        setConversations(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) getConversations();
  }, [user, BACKEND_URL]);

  // Fetch Current Chat Messages
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/messages/${currentChat?._id}`);
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };
    if (currentChat) getMessages();
  }, [currentChat, BACKEND_URL]);

  // Handle Send Message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentChat || !user) return;

    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: currentChat._id
    };

    const friendId = currentChat.participants.find(p => p._id !== user.id)._id;

    // Send via socket
    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId: friendId,
      text: newMessage,
      conversationId: currentChat._id
    });

    try {
      // Save to database
      const res = await fetch(`${BACKEND_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message)
      });
      const savedMessage = await res.json();
      setMessages(prev => [...prev, savedMessage]);
      setNewMessage("");

      // Update local conversation list to show correct latest message
      setConversations(prev => prev.map(c => 
        c._id === currentChat._id ? { ...c, lastMessage: savedMessage } : c
      ));

    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <div style={{ backgroundColor: '#ffffff', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      {/* Layout container bounded below Navbar */}
      <div style={{ flex: 1, display: 'flex', marginTop: '80px', overflow: 'hidden' }}>
        
        {/* Left Column - Conversation List */}
        {(!isMobile || !currentChat) && (
          <div style={{ width: isMobile ? '100%' : '350px', flexShrink: 0 }}>
            <ConversationList 
              conversations={conversations} 
              currentChat={currentChat} 
              setCurrentChat={setCurrentChat} 
              onlineUsers={onlineUsers}
              currentUser={user} 
            />
          </div>
        )}

        {/* Right Column - Active Chat */}
        {(!isMobile || currentChat) && (
          <div style={{ flex: 1, display: isMobile && !currentChat ? 'none' : 'block' }}>
            <ChatWindow 
              currentChat={currentChat} 
              messages={messages} 
              currentUser={user}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessage={sendMessage}
              setCurrentChat={setCurrentChat}
              isMobile={isMobile}
            />
          </div>
        )}

      </div>
    </div>
  );
};

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<MainApp />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
