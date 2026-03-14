import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#fff',
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
                '@media (max-width: 900px)': {
                    display: 'none'
                }
            }} className="login-visual-sidebar">
                <style>
                    {`
                    @media (max-width: 900px) {
                        .login-visual-sidebar { display: none !important; }
                    }
                    `}
                </style>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                        Advance Your <br /> Research Journey.
                    </h2>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '400px', lineHeight: '1.6' }}>
                        Join the world's leading community of researchers and academics. Collaborative tools at your fingertips.
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
                backgroundColor: '#000'
            }}>
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    <h1 style={{ 
                        fontSize: '2.2rem', 
                        fontWeight: '800', 
                        color: '#ffffff', 
                        marginBottom: '0.8rem',
                        letterSpacing: '-0.5px'
                    }}>
                        Welcome Back
                    </h1>
                    <p style={{ color: '#aaa', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                        Log in to your researcher account
                    </p>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ textAlign: 'left' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ddd', marginBottom: '0.6rem', display: 'block' }}>Email Address</label>
                            <input 
                                type="email" 
                                name="email"
                                required
                                value={credentials.email}
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
                                value={credentials.password}
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

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <span style={{ fontSize: '0.85rem', color: '#3d9afc', cursor: 'pointer', fontWeight: '500' }}>Forgot password?</span>
                        </div>

                        <button 
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '16px',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                marginTop: '0.5rem',
                                boxShadow: '0 4px 12px rgba(0,123,255,0.3)'
                            }}
                            onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
                            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                        >
                            Sign in
                        </button>
                    </form>

                    <div style={{ marginTop: '2rem', fontSize: '0.95rem', color: '#888', textAlign: 'center' }}>
                        Don't have an account? <span onClick={() => navigate('/signup')} style={{ color: '#3d9afc', cursor: 'pointer', fontWeight: '700' }}>Sign up</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
