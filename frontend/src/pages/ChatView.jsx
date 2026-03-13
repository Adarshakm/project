import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ChatView = () => {
  const { name } = useParams();

  return (
    <div style={{ paddingTop: '80px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar title={name} />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '2rem', color: '#333' }}>Chatting with {name}</h2>
          <p style={{ color: '#666', marginTop: '1rem' }}>This is where the conversation takes place.</p>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
