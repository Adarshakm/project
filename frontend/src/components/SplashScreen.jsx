import React, { useState, useEffect } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show the splash screen for exactly 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Notify the parent component that the splash screen is done
      if (onComplete) {
        onComplete();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#ffffff',
        zIndex: 9999 // Ensure it covers everything else
    }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 'bold', margin: '0 0 10px 0' }}>Assistance</h1>
      <p style={{ fontSize: '1.5rem', color: '#333', margin: 0 }}>From</p>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '5px 0 0 0', color: '#333' }}>Researcher</h2>
    </div>
  );
};

export default SplashScreen;
