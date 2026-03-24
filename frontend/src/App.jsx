import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import Login from './pages/Login';
import Signup from './pages/Signup';


const MainApp = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div style={{ paddingTop: '80px', height: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', backgroundColor: '#f8f9fa' }}>
      <Navbar />
      
      {/* Blank Root Page */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#888' }}>
        <p>Empty Canvas</p>
      </div>
    </div>
  );
};

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSplashFinished = () => {
    setShowSplash(false);
    const params = new URLSearchParams(location.search);
    const token = localStorage.getItem('token');

    if (location.pathname === '/' && !params.get('view') && !token) {
      navigate('/login');
    }
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinished} />}
      {!showSplash && (
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
