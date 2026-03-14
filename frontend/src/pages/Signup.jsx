import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords mismatch!");
            return;
        }
        // For now, just navigate to login after "signup"
        navigate('/login');
    };

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#000',
            fontFamily: "'Inter', sans-serif",
            overflow: 'hidden'
        }}>
            {/* Left Column: Visual Area */}
            <div style={{
                flex: '1.2',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '4rem',
                color: '#fff',
                backgroundColor: '#000',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }} className="signup-visual-sidebar">
                <style>
                    {`
                    @media (max-width: 900px) {
                        .signup-visual-sidebar { display: none !important; }
                    }
                    `}
                </style>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                        Begin Your <br /> Research Journey.
                    </h2>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '400px', lineHeight: '1.6' }}>
                        Create an account to start collaborating with researchers worldwide and access advanced scientific tools.
                    </p>
                </div>
                <div style={{ position: 'absolute', bottom: '4rem', left: '4rem', zIndex: 1 }}>
                    <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Powered by Assistance</div>
                </div>
            </div>

            {/* Right Column: Form Area */}
            <div style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
                backgroundColor: '#000',
                overflowY: 'auto'
            }}>
                <div style={{ width: '100%', maxWidth: '400px', padding: '2rem 0' }}>
                    <h1 style={{ 
                        fontSize: '2.2rem', 
                        fontWeight: '800', 
                        color: '#ffffff', 
                        marginBottom: '0.8rem',
                        letterSpacing: '-0.5px'
                    }}>
                        Create Account
                    </h1>
                    <p style={{ color: '#aaa', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                        Join the global researcher community
                    </p>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div style={{ textAlign: 'left' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ddd', marginBottom: '0.6rem', display: 'block' }}>Full Name</label>
                            <input 
                                type="text" 
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                style={{
                                    width: '100%',
                                    padding: '14px 18px',
                                    borderRadius: '10px',
                                    border: '1.5px solid #333',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    boxSizing: 'border-box',
                                    backgroundColor: '#111',
                                    color: '#fff',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#007bff';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(0,123,255,0.2)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#333';
                                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                                }}
                            />
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ddd', marginBottom: '0.6rem', display: 'block' }}>Email Address</label>
                            <input 
                                type="email" 
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@company.com"
                                style={{
                                    width: '100%',
                                    padding: '14px 18px',
                                    borderRadius: '10px',
                                    border: '1.5px solid #333',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    boxSizing: 'border-box',
                                    backgroundColor: '#111',
                                    color: '#fff',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#007bff';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(0,123,255,0.2)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#333';
                                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                                }}
                            />
                        </div>
                        
                        <div style={{ textAlign: 'left' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ddd', marginBottom: '0.6rem', display: 'block' }}>Password</label>
                            <input 
                                type="password" 
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '14px 18px',
                                    borderRadius: '10px',
                                    border: '1.5px solid #333',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    boxSizing: 'border-box',
                                    backgroundColor: '#111',
                                    color: '#fff',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#007bff';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(0,123,255,0.2)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#333';
                                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                                }}
                            />
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ddd', marginBottom: '0.6rem', display: 'block' }}>Confirm Password</label>
                            <input 
                                type="password" 
                                name="confirmPassword"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '14px 18px',
                                    borderRadius: '10px',
                                    border: '1.5px solid #333',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    boxSizing: 'border-box',
                                    backgroundColor: '#111',
                                    color: '#fff',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#007bff';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(0,123,255,0.2)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#333';
                                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                                }}
                            />
                        </div>

                        <button 
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '16px',
                                backgroundColor: '#ffffff',
                                color: '#000000',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                marginTop: '1rem',
                                boxShadow: '0 4px 12px rgba(255,255,255,0.1)'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#f0f0f0';
                                e.target.style.transform = 'translateY(-1px)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = '#ffffff';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            Create Account
                        </button>
                    </form>

                    <div style={{ marginTop: '2rem', fontSize: '0.95rem', color: '#888', textAlign: 'center' }}>
                        Already have an account? <span onClick={() => navigate('/login')} style={{ color: '#3d9afc', cursor: 'pointer', fontWeight: '700' }}>Sign in</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
