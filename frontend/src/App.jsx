import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
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
      
      {/* Main Hero Space */}
      <div style={{ flex: 1, padding: '3rem 4rem', boxSizing: 'border-box' }}>
        <Link to="/around-you" className="hero-link">
          <span className="hero-text">Whats Happening</span>
          <br />
          <span className="hero-text">Around You</span>
        </Link>
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
