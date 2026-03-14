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
        // For now, just navigate to home on any submit
        navigate('/');
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#f0f2f5',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                backgroundColor: '#ffffff',
                padding: '2.5rem',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <h1 style={{ 
                    fontSize: '2rem', 
                    fontWeight: '800', 
                    color: '#1a1a1a', 
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.5px'
                }}>
                    Welcome Back
                </h1>
                <p style={{ color: '#666', marginBottom: '2rem' }}>Please enter your details</p>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#444', marginBottom: '0.5rem', display: 'block' }}>Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            required
                            value={credentials.email}
                            onChange={handleChange}
                            placeholder="name@company.com"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '8px',
                                border: '1.5px solid #e0e0e0',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                        />
                    </div>
                    
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#444', marginBottom: '0.5rem', display: 'block' }}>Password</label>
                        <input 
                            type="password" 
                            name="password"
                            required
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '8px',
                                border: '1.5px solid #e0e0e0',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                        />
                    </div>

                    <button 
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '14px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            marginTop: '0.5rem'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                    >
                        Sign in
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#666' }}>
                    Don't have an account? <span onClick={() => navigate('/signup')} style={{ color: '#007bff', cursor: 'pointer', fontWeight: '600' }}>Sign up</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
