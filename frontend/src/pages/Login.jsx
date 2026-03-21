import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
            const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/home');
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Connection error. Is the server running?");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            fontFamily: "'Inter', sans-serif",
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #172554 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background glowing orbs */}
            <div style={{
                position: 'absolute', top: '10%', left: '20%', width: '40vw', height: '40vw', 
                background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', zIndex: 0
            }}></div>
            <div style={{
                position: 'absolute', bottom: '10%', right: '10%', width: '35vw', height: '35vw', 
                background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', zIndex: 0
            }}></div>

            <div style={{
                width: '100%',
                maxWidth: '420px',
                padding: '2.5rem',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                position: 'relative',
                zIndex: 1,
                color: 'white'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '56px', height: '56px', borderRadius: '16px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                        marginBottom: '1rem', boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)'
                    }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', margin: 0, letterSpacing: '-0.5px' }}>Welcome Back</h2>
                    <p style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.95rem' }}>Enter your credentials to access your account.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.4rem' }}>Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            required
                            value={credentials.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            style={{
                                width: '100%', padding: '0.875rem 1rem', borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)',
                                color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.2s ease',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.background = 'rgba(0,0,0,0.4)'; }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(0,0,0,0.2)'; }}
                        />
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: '500', color: '#cbd5e1' }}>Password</label>
                            <span style={{ fontSize: '0.8rem', color: '#3b82f6', cursor: 'pointer', fontWeight: '500' }}>Forgot password?</span>
                        </div>
                        <input 
                            type="password" 
                            name="password"
                            required
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            style={{
                                width: '100%', padding: '0.875rem 1rem', borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)',
                                color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.2s ease',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.background = 'rgba(0,0,0,0.4)'; }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(0,0,0,0.2)'; }}
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%', padding: '0.875rem', marginTop: '0.5rem',
                            background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                            color: 'white', border: 'none', borderRadius: '12px',
                            fontSize: '1rem', fontWeight: '600', cursor: isLoading ? 'wait' : 'pointer',
                            transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
                            opacity: isLoading ? 0.7 : 1
                        }}
                        onMouseOver={(e) => !isLoading && (e.target.style.transform = 'translateY(-1px)')}
                        onMouseOut={(e) => !isLoading && (e.target.style.transform = 'translateY(0)')}
                        onMouseDown={(e) => !isLoading && (e.target.style.transform = 'translateY(1px)')}
                        onMouseUp={(e) => !isLoading && (e.target.style.transform = 'translateY(-1px)')}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#94a3b8' }}>
                    Don't have an account? <strong onClick={() => navigate('/signup')} style={{ color: '#fff', cursor: 'pointer' }}>Sign up</strong>
                </p>
            </div>
        </div>
    );
};

export default Login;
