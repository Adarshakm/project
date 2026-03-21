import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PersonalInformation from './pages/PersonalInformation';
import CreateUserName from './pages/CreateUserName';
import AddGender from './pages/AddGender';
import NewContact from './pages/NewContact';
import './App.css';

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [personalView, setPersonalView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') === 'messages' ? 'messages' : null;
  });
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();



  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (personalView === 'contacts') {
      fetchContacts();
    }
  }, [personalView]);

  const fetchContacts = async () => {
    setLoadingContacts(true);
    try {
      const response = await fetch('http://localhost:5000/api/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    } finally {
      setLoadingContacts(false);
    }
  };

  const handleScroll = (e) => {
    if (window.innerWidth > 768) return;
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.offsetWidth;
    if (scrollLeft > width / 2) {
      setActiveTab('social');
    } else {
      setActiveTab('personal');
    }
  };

  const scrollToTab = (tab) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: tab === 'personal' ? 0 : width,
        behavior: 'smooth'
      });
      setActiveTab(tab);
    }
  };

  return (
    <div style={{ paddingTop: '80px', height: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      <Navbar />

      {/* Selection Links */}
      {personalView === null && (
        <div className="tab-nav">
          <button
            className={activeTab === 'personal' ? 'active' : ''}
            onClick={() => scrollToTab('personal')}
          >
            Personal
          </button>
          <button
            className={activeTab === 'social' ? 'active' : ''}
            onClick={() => scrollToTab('social')}
          >
            Whats happening around You
          </button>
        </div>
      )}

      <div
        className="main-layout"
        ref={scrollRef}
        onScroll={handleScroll}
        style={{ flex: 1, backgroundColor: '#000000' }}
      >
        <div className="column-main" style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid #333' }}>
          {/* Personal Sub-Navbar */}
          <div style={{ display: 'flex', borderBottom: '1px solid #333', padding: '0 1rem', gap: '1rem', alignItems: 'center' }}>
            {personalView !== null && (
              <button
                onClick={() => setPersonalView(null)}
                style={{
                  padding: '1rem',
                  background: 'none',
                  border: 'none',
                  color: '#888',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                ← Back
              </button>
            )}
            <button
              onClick={() => setPersonalView('contacts')}
              style={{
                padding: '1rem',
                background: 'none',
                border: 'none',
                color: personalView === 'contacts' ? '#ffffff' : '#888',
                borderBottom: personalView === 'contacts' ? '2px solid #ffffff' : 'none',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Contacts
            </button>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1rem', overflow: 'hidden' }}>
            {personalView === 'contacts' ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                  <button
                    onClick={() => navigate('/new-contact')}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#ffffff',
                      color: '#000000',
                      border: 'none',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      width: '100%'
                    }}
                  >
                    + Add New Contact
                  </button>
                </div>

                <h1 style={{ color: '#ffffff', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Your Contacts</h1>

                {loadingContacts ? (
                  <p style={{ color: '#888', textAlign: 'center' }}>Loading contacts...</p>
                ) : contacts.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {contacts.map(contact => (
                      <div key={contact._id} style={{
                        padding: '1.2rem',
                        backgroundColor: '#111',
                        borderRadius: '8px',
                        border: '1px solid #222',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.2rem' }}>{contact.name}</div>
                          <div style={{ color: '#888', fontSize: '0.9rem' }}>{contact.phone}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <p style={{ color: '#888', marginBottom: '1rem' }}>No contacts found.</p>
                    <p style={{ color: '#555', fontSize: '0.9rem' }}>Start adding contacts to see them here.</p>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Empty initially as requested */}
              </div>
            )}
          </div>
        </div>
        <div className="column-extra" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', borderLeft: '1px solid #333' }}>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ color: '#ffffff', marginBottom: '1.5rem' }}>Whats happening around You</h1>
              <p style={{ color: '#cccccc', marginBottom: '2rem' }}>Discover updates from around you.</p>
              <button style={{ padding: '12px 24px', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #ffffff', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' }}>
                Explore Feed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function AppContent() {
  const [appReady, setAppReady] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== '/') {
      setAppReady(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setAppReady(true);
    const params = new URLSearchParams(location.search);
    const token = localStorage.getItem('token');

    if (location.pathname === '/' && !params.get('view') && !token) {
      navigate('/login');
    }
  };

  const isRoot = location.pathname === '/';

  return (
    <>
      {!appReady && isRoot && <SplashScreen onComplete={handleSplashComplete} />}

      {(appReady || !isRoot) && (
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/PersonalInformation" element={<PersonalInformation />} />
          <Route path="/CreateUserName" element={<CreateUserName />} />
          <Route path="/AddGender" element={<AddGender />} />
          <Route path="/new-contact" element={<NewContact />} />
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
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<MainApp />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes >
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
