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
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords mismatch!");
            return;
        }
        
        setIsLoading(true);
        try {
            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
            const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password
                })
            });
            const data = await response.json();
            
            if (response.ok) {
                alert("Account created successfully. Please login.");
                navigate('/');
            } else {
                alert(data.message || "Signup failed");
            }
        } catch (error) {
            console.error("Signup error:", error);
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
            background: 'linear-gradient(135deg, #0f172a 0%, #172554 50%, #1e1b4b 100%)',
            position: 'relative',
            overflow: 'hidden',
            padding: '2rem'
        }}>
            {/* Background glowing orbs */}
            <div style={{
                position: 'absolute', top: '-10%', right: '10%', width: '40vw', height: '40vw', 
                background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', zIndex: 0
            }}></div>
            <div style={{
                position: 'absolute', bottom: '-5%', left: '5%', width: '45vw', height: '45vw', 
                background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', zIndex: 0
            }}></div>

            <div style={{
                width: '100%',
                maxWidth: '480px',
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
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                        marginBottom: '1rem', boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)'
                    }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5c-1.1 0-2 .9-2 2v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <line x1="20" y1="8" x2="20" y2="14"></line>
                            <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '700', margin: 0, letterSpacing: '-0.5px' }}>Join Us</h2>
                    <p style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.95rem' }}>Create your account to start your journey.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.4rem' }}>Full Name</label>
                        <input 
                            type="text" 
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Dr. Jane Doe"
                            style={{
                                width: '100%', padding: '0.875rem 1rem', borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)',
                                color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.2s ease',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => { e.target.style.borderColor = '#8b5cf6'; e.target.style.background = 'rgba(0,0,0,0.4)'; }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(0,0,0,0.2)'; }}
                        />
                    </div>
                    
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.4rem' }}>Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            style={{
                                width: '100%', padding: '0.875rem 1rem', borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)',
                                color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.2s ease',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => { e.target.style.borderColor = '#8b5cf6'; e.target.style.background = 'rgba(0,0,0,0.4)'; }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(0,0,0,0.2)'; }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.4rem' }}>Password</label>
                        <input 
                            type="password" 
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a strong password"
                            style={{
                                width: '100%', padding: '0.875rem 1rem', borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)',
                                color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.2s ease',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => { e.target.style.borderColor = '#8b5cf6'; e.target.style.background = 'rgba(0,0,0,0.4)'; }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(0,0,0,0.2)'; }}
                        />
                    </div>
                    
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#cbd5e1', marginBottom: '0.4rem' }}>Confirm Password</label>
                        <input 
                            type="password" 
                            name="confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            style={{
                                width: '100%', padding: '0.875rem 1rem', borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)',
                                color: 'white', fontSize: '1rem', outline: 'none', transition: 'all 0.2s ease',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => { e.target.style.borderColor = '#8b5cf6'; e.target.style.background = 'rgba(0,0,0,0.4)'; }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(0,0,0,0.2)'; }}
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%', padding: '0.875rem', marginTop: '0.5rem',
                            background: 'linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)',
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
                        {isLoading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#94a3b8' }}>
                    Already have an account? <strong onClick={() => navigate('/')} style={{ color: '#fff', cursor: 'pointer' }}>Sign in</strong>
                </p>
            </div>
        </div>
    );
};

export default Signup;
