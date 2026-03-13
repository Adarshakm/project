import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import ChatView from './pages/ChatView';
import Business from './pages/Business';
import News from './pages/News';
import Sports from './pages/Sports';
import io from 'socket.io-client';
import './App.css';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const socket = io.connect(BACKEND_URL);

const dummyPeople = [
  { id: 1, name: 'Adarsh', lastMsg: 'Hey, how are you?', time: '10:30 AM' },
  { id: 2, name: 'John Doe', lastMsg: 'Project update is ready.', time: 'Yesterday' },
  { id: 3, name: 'Alice Smith', lastMsg: 'See you at the meeting!', time: 'Monday' },
  { id: 4, name: 'Bob Wilson', lastMsg: 'Thanks for the help!', time: '2:15 PM' },
  { id: 5, name: 'Sarah Connor', lastMsg: 'The Terminator is here...', time: 'Just now' },
  { id: 6, name: 'Michael Jordan', lastMsg: 'Check the highlights.', time: '1:00 PM' },
  { id: 7, name: 'Elon Musk', lastMsg: 'Marsss!!', time: 'Yesterday' },
  { id: 8, name: 'Mark Zuckerberg', lastMsg: 'Metaverse is the future.', time: '3:45 AM' },
  { id: 9, name: 'Bill Gates', lastMsg: 'Windows update incoming.', time: 'Monday' },
  { id: 10, name: 'Steve Jobs', lastMsg: 'One more thing...', time: 'Oct 5' },
  { id: 11, name: 'Nikola Tesla', lastMsg: 'Free energy is possible.', time: '18:56' },
  { id: 12, name: 'Marie Curie', lastMsg: 'Experiments are ongoing.', time: 'Tuesday' },
];

import SocialFeed from './components/SocialFeed';
import Profile from './components/Profile';

const NewsList = () => {
  const dummyNews = [
    { id: 1, category: 'Technology · Trending', headline: 'AI Agents are taking over software development', stats: '50.5K Posts' },
    { id: 2, category: 'Space · Live', headline: 'Mars Rover discovers ancient water signatures', stats: 'Trending with #NASA' },
    { id: 3, category: 'Business · Trending', headline: 'Global markets hit record highs', stats: '12.4K Posts' },
    { id: 4, category: 'Sports · 2 hours ago', headline: 'Underdog team wins the championship in a stunning upset', stats: '25.8K Posts' },
    { id: 5, category: 'Entertainment · Trending', headline: 'New blockbuster movie breaks all-time box office records', stats: 'Trending with #MovieNight' },
    { id: 6, category: 'Health · Trending', headline: 'New scientific study reveals benefits of daily meditation', stats: '8.2K Posts' },
    { id: 7, category: 'Automotive · News', headline: 'Electric flight: First commercial battery-powered plane takes off', stats: 'Trending with #EV' },
    { id: 8, category: 'Science · Trending', headline: 'Quantum computer reaches new milestone in processing power', stats: '15.1K Posts' },
    { id: 9, category: 'Travel · News', headline: 'Top 10 hidden travel destinations for 2026 revealed', stats: '4.7K Posts' },
    { id: 10, category: 'Politics · Live', headline: 'Historic summit concludes with major trade agreements', stats: '45.2K Posts' },
    { id: 11, category: 'Gaming · Trending', headline: 'Next-gen console rumors spark excitement among fans', stats: 'Trending with #Gaming' },
  ];

  return (
    <div style={{ padding: '0.5rem 0' }}>
      {dummyNews.map(news => (
        <div key={news.id} style={{ 
          padding: '1rem', 
          cursor: 'pointer', 
          borderBottom: '1px solid #eee',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.2rem' }}>{news.category}</div>
          <div style={{ fontWeight: 'bold', color: '#000', fontSize: '0.95rem', lineHeight: '1.2' }}>{news.headline}</div>
          <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.3rem' }}>{news.stats}</div>
        </div>
      ))}
      <div style={{ padding: '1rem', color: '#007bff', cursor: 'pointer', fontSize: '0.9rem' }}>Show more</div>
    </div>
  );
};

const MainApp = () => {
  const handleChatClick = (name) => {
    window.open(`/chat/${name}`, '_blank');
  };

  return (
    <div style={{ paddingTop: '80px', height: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      <Navbar />
      <div className="main-layout">
        <div className="column-sidebar">
          <div style={{ 
            height: '60px', 
            backgroundColor: '#ffffff', 
            borderBottom: '2px solid #efefef', 
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: '0 1rem',
            fontSize: '1.4rem',
            fontWeight: 'bold',
            color: '#333'
          }}>Chats</div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {dummyPeople.map(person => (
              <div key={person.id} onClick={() => handleChatClick(person.name)} style={{ 
                padding: '1rem', 
                borderBottom: '1px solid #eee', 
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                cursor: 'pointer'
              }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#007bff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {person.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 'bold', color: '#333' }}>{person.name}</span>
                    <span style={{ fontSize: '0.8rem', color: '#999' }}>{person.time}</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {person.lastMsg}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="column-main" style={{ overflowY: 'auto', backgroundColor: '#fff' }}>
          {window.location.pathname === '/profile' ? <Profile /> : <SocialFeed />}
        </div>
        <div className="column-extra" style={{ backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column', borderLeft: '1px solid #eee' }}>
          <div style={{ 
            height: '60px', 
            backgroundColor: '#ffffff', 
            borderBottom: '2px solid #efefef', 
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: '0 1rem',
            fontSize: '1.4rem',
            fontWeight: 'bold',
            color: '#333'
          }}>Today's News</div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <NewsList />
          </div>
        </div>
      </div>
    </div>
  );
};

import Peer from 'simple-peer';

const VideoCallModal = ({ localStream, remoteStream, name, onHangup, isIncoming, onAccept }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.9)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff'
    }}>
      <div style={{ position: 'relative', width: '80%', height: '80%', backgroundColor: '#222', borderRadius: '20px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {remoteStream ? (
          <video playsInline autoPlay ref={el => { if (el) el.srcObject = remoteStream; }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#007bff', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
              {name[0]}
            </div>
            <h2>{isIncoming ? `${name} is calling...` : `Calling ${name}...`}</h2>
          </div>
        )}
        
        {localStream && (
          <video playsInline muted autoPlay ref={el => { if (el) el.srcObject = localStream; }} style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            width: '200px',
            borderRadius: '10px',
            border: '2px solid #fff',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
          }} />
        )}

        <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '2rem' }}>
          {isIncoming && !remoteStream && (
            <button onClick={onAccept} style={{ padding: '15px', borderRadius: '50%', border: 'none', backgroundColor: '#25D366', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
                <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 9h2c0-4.4-3.6-8-8-8v2c3.3 0 6 2.7 6 6zM15 9h2c0-2.2-1.8-4-4-4v2c1.1 0 2 .9 2 2z"/>
              </svg>
            </button>
          )}
          <button onClick={onHangup} style={{ padding: '15px', borderRadius: '50%', border: 'none', backgroundColor: '#FF3B30', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
              <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.49 13.29c-.32-.32-.32-.83 0-1.15C3.15 9.48 7.39 8 12 8s8.85 1.48 11.51 4.14c.32.32.32.83 0 1.15l-2.28 2.28c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatViewWrapper = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesEndRef = useRef(null);
  
  // Call States
  const [callStatus, setCallStatus] = useState('idle'); // idle, calling, receiving, active
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callerSignal, setCallerSignal] = useState(null);
  const connectionRef = useRef();

  // Implicit user for this session
  const currentUser = "Me";
  const room = [currentUser, name].sort().join('_');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/messages/${currentUser}/${name}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };
    fetchMessages();

    socket.emit("join_room", room);

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // --- Social Signaling Listeners ---
    socket.on("incoming_call", (data) => {
      setCallStatus('receiving');
      setCallerSignal(data.signal);
    });

    return () => {
      socket.off("receive_message");
      socket.off("incoming_call");
    };
  }, [name, room]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- WebRTC Logic ---

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      setCallStatus('calling');

      const peer = new Peer({ initiator: true, trickle: false, stream });

      peer.on("signal", (data) => {
        socket.emit("call_user", {
          userToCall: name, // This would be a socket ID in a real system, using name as room proxy
          signalData: data,
          from: currentUser,
          name: currentUser
        });
      });

      peer.on("stream", (stream) => {
        setRemoteStream(stream);
      });

      socket.on("call_accepted", (signal) => {
        setCallStatus('active');
        peer.signal(signal);
      });

      connectionRef.current = peer;
    } catch (err) {
      console.error("Error accessing media devices", err);
      alert("Camera/Mic access denied or not available.");
    }
  };

  const answerCall = async () => {
    try {
      setCallStatus('active');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);

      const peer = new Peer({ initiator: false, trickle: false, stream });

      peer.on("signal", (data) => {
        socket.emit("answer_call", { signal: data, to: name });
      });

      peer.on("stream", (stream) => {
        setRemoteStream(stream);
      });

      peer.signal(callerSignal);
      connectionRef.current = peer;
    } catch (err) {
      console.error("Error answering call", err);
    }
  };

  const hangUp = () => {
    setCallStatus('idle');
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    setLocalStream(null);
    setRemoteStream(null);
    window.location.reload(); // Quick reset
  };

  const sendMessage = async () => {
    if (currentMessage.trim() !== "") {
      const messageData = {
        sender: currentUser,
        receiver: name,
        text: currentMessage,
        room: room
      };
      await socket.emit("send_message", messageData);
      setCurrentMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div style={{ paddingTop: '80px', height: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      <Navbar />
      
      {callStatus !== 'idle' && (
        <VideoCallModal 
          name={name} 
          localStream={localStream} 
          remoteStream={remoteStream} 
          onHangup={hangUp}
          isIncoming={callStatus === 'receiving'}
          onAccept={answerCall}
        />
      )}

      <div className="main-layout">
        <div className="column-sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ 
            height: '60px', 
            backgroundColor: '#ffffff', 
            borderBottom: '2px solid #efefef', 
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1rem',
            fontSize: '1.4rem',
            fontWeight: 'bold',
            color: '#333'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span 
                onClick={() => navigate('/')} 
                style={{ cursor: 'pointer', fontSize: '1.6rem', display: 'flex', alignItems: 'center', color: '#54656f' }}
                title="Back to Chats"
              >
                ←
              </span>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: '#007bff', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 'bold',
                fontSize: '1rem',
                flexShrink: 0
              }}>
                {name ? name[0] : 'U'}
              </div>
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {name}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.2rem', color: '#54656f', alignItems: 'center' }}>
              {/* Video Call Icon */}
              <svg onClick={startCall} viewBox="0 0 24 24" width="24" height="24" style={{ cursor: 'pointer' }} title="Video Call">
                <path fill="currentColor" d="M17.394 15.329l4.427 3.541A.704.704 0 0 0 23 18.31V5.69a.703.703 0 0 0-1.179-.56l-4.427 3.541v6.658zM4.666 4h8.668C14.256 4 15 4.745 15 5.667v12.667c0 .922-.744 1.666-1.666 1.666H4.666C3.744 20 3 19.256 3 18.334V5.667C3 4.745 3.744 4 4.666 4z"></path>
              </svg>
              {/* Voice Call Icon */}
              <svg viewBox="0 0 24 24" width="24" height="24" style={{ cursor: 'pointer' }} title="Voice Call">
                <path fill="currentColor" d="M19.95 15.06c-1.25-.13-2.48-.44-3.64-.91-.35-.15-.76-.07-1.03.2l-2.2 2.2c-2.83-1.44-5.14-3.75-6.58-6.58l2.21-2.21c.27-.26.35-.63.22-.98C8.46 5.62 8.16 4.39 8.01 3.14 7.95 2.5 7.42 2 6.78 2h-3c-.68 0-1.23.58-1.18 1.25.43 5.48 2.62 10.6 6.13 14.75 3.86 4.54 9.17 7.51 15.01 8.54.68.12 1.26-.41 1.26-1.1v-3.04c0-.62-.48-1.14-1.1-1.2h-.03z"></path>
              </svg>
              {/* Settings (More Options) Icon */}
              <svg viewBox="0 0 24 24" width="24" height="24" style={{ cursor: 'pointer' }} title="Settings">
                <path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
              </svg>
            </div>
          </div>
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            display: 'flex', 
            flexDirection: 'column',
            padding: '1rem',
            backgroundImage: `url('file:///C:/Users/adars/.gemini/antigravity/brain/dfbe67ac-5b01-4fa4-8c89-6f69bcab56d3/chat_wallpaper_1773332482289.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
            {/* Chat Body messages area */}
            <div style={{ textAlign: 'center', margin: '1rem 0', padding: '0.4rem 0.8rem', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', backdropFilter: 'blur(5px)', alignSelf: 'center' }}>
              <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>Messages are end-to-end encrypted. No one outside of this chat, not even Assistance, can read or listen to them.</p>
            </div>

            {messages.map((msg, index) => {
              const isSender = msg.sender === currentUser;
              return (
                <div key={index} style={{
                  maxWidth: '75%',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  margin: '4px 0',
                  alignSelf: isSender ? 'flex-end' : 'flex-start',
                  backgroundColor: isSender ? '#d9fdd3' : '#ffffff',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                  position: 'relative'
                }}>
                  <div style={{ fontSize: '14px', color: '#111b21', wordWrap: 'break-word', paddingBottom: '12px' }}>
                    {msg.text}
                  </div>
                  <div style={{ fontSize: '11px', color: '#667781', position: 'absolute', bottom: '4px', right: '8px' }}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
          {/* WhatsApp-style Message Input Section */}
          <div style={{ 
            padding: '5px 10px', 
            backgroundColor: '#f0f2f5',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderTop: '1px solid #d1d7db'
          }}>
            {/* Emoji and Attachment Icons */}
            <div style={{ display: 'flex', gap: '12px', color: '#54656f' }}>
              <svg viewBox="0 0 24 24" width="24" height="24" style={{ cursor: 'pointer' }}>
                <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm4.5-9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-6 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-.5 4.5s1.25 1.5 4 1.5 4-1.5 4-1.5"></path>
              </svg>
              <svg viewBox="0 0 24 24" width="24" height="24" style={{ cursor: 'pointer' }}>
                <path fill="currentColor" d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.47 1.647 3.971 1.647a5.58 5.58 0 0 0 3.972-1.647l9.582-9.582c.699-.699 1.084-1.63 1.084-2.592 0-.962-.385-1.892-1.084-2.592a3.67 3.67 0 0 0-5.183 0L6.22 14.339a2.76 2.76 0 0 0-.807 1.956c0 .736.287 1.428.807 1.948s1.213.807 1.948.807c.735 0 1.428-.287 1.948-.807l8.288-8.288.707.707-8.288 8.288a3.75 3.75 0 0 1-2.655 1.1c-1.002 0-1.944-.39-2.655-1.1s-1.101-1.653-1.101-2.655c0-1.002.39-1.944 1.101-2.655l9.584-9.584a4.65 4.65 0 0 1 3.29-1.361c1.246 0 2.413.485 3.292 1.363a4.66 4.66 0 0 1-3.29 7.953l-9.584 9.584a6.57 6.57 0 0 1-4.678 1.939c-1.765 0-3.425-.687-4.674-1.936s-1.936-2.91-1.936-4.674c0-1.765.688-3.425 1.937-4.674l9.582-9.583.707.707-9.582 9.583a5.59 5.59 0 0 0-1.647 3.967z"></path>
              </svg>
            </div>

            {/* Input Field Area with Camera */}
            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type="text" 
                placeholder="Type a message" 
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{ 
                  flex: 1, 
                  padding: '9px 40px 9px 12px', 
                  borderRadius: '8px', 
                  border: 'none',
                  outline: 'none',
                  fontSize: '15px',
                  backgroundColor: '#ffffff',
                  color: '#111b21',
                  margin: '5px 0'
                }} 
              />
              <svg viewBox="0 0 24 24" width="24" height="24" style={{ cursor: 'pointer', position: 'absolute', right: '8px', color: '#54656f' }}>
                <path fill="currentColor" d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 14H4V7h16v12zm-8-9c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path>
              </svg>
            </div>

            {/* Voice Message Button */}
            <button style={{ 
              width: '40px',
              height: '40px',
              backgroundColor: '#00a884', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '50%', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 1px rgba(0,0,0,0.1)'
            }}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path>
                <path fill="currentColor" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path>
              </svg>
            </button>

            {/* Send Button */}
            <button onClick={sendMessage} style={{ 
              width: '40px',
              height: '40px',
              backgroundColor: '#00a884', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '50%', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 1px rgba(0,0,0,0.1)'
            }}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="column-main" style={{ overflowY: 'auto', backgroundColor: '#fff' }}>
          <SocialFeed />
        </div>
        <div className="column-extra" style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', borderLeft: '1px solid #eee' }}>
          <div style={{ 
            height: '60px', 
            backgroundColor: '#ffffff', 
            borderBottom: '2px solid #efefef', 
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: '0 1rem',
            fontSize: '1.4rem',
            fontWeight: 'bold',
            color: '#333'
          }}>Today's News</div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <NewsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (window.location.pathname !== '/') {
      setAppReady(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setAppReady(true);
  };

  const isRoot = window.location.pathname === '/';

  return (
    <Router>
      {!appReady && isRoot && <SplashScreen onComplete={handleSplashComplete} />}
      
      {(appReady || !isRoot) && (
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/profile" element={<MainApp />} />
          <Route path="/business" element={<Business />} />
          <Route path="/news" element={<News />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/chat/:name" element={<ChatViewWrapper />} />
        </Routes>
      )}
    </Router>
  );
}

