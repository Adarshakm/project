import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: '#ddd' });

    const getPasswordStrength = (password) => {
        let score = 0;
        if (!password) return { score: 0, label: '', color: '#ddd' };

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[@$!%*?&]/.test(password)) score++;

        switch (score) {
            case 0:
            case 1:
            case 2:
                return { score, label: 'Weak', color: '#ff4d4d' };
            case 3:
            case 4:
                return { score, label: 'Medium', color: '#ffd700' };
            case 5:
                return { score, label: 'Strong', color: '#00ff00' };
            default:
                return { score: 0, label: '', color: '#ddd' };
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'password') {
            setPasswordStrength(getPasswordStrength(value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords mismatch!");
            return;
        }

        try {
            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

            // Normalize email
            const normalizedEmail = formData.email.toLowerCase().trim();
            const normalizedPhone = formData.phone ? formData.phone.trim() : "";

            const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: formData.fullName.trim(),
                    email: normalizedEmail,
                    phone: normalizedPhone,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Account created successfully!");
                navigate('/login');
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("An error occurred during signup. Please try again.");
        }
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
                <div style={{ width: '100%', maxWidth: '400px', padding: '1rem 0' }}>
                    <h1 style={{
                        fontSize: '2.2rem',
                        fontWeight: '800',
                        color: '#ffffff',
                        marginBottom: '0.8rem',
                        letterSpacing: '-0.5px'
                    }}>
                        Create Account
                    </h1>
                    <p style={{ color: '#aaa', marginBottom: '1rem', fontSize: '1.1rem' }}>
                        Join the global researcher community
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <div style={{ textAlign: 'left' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ddd', marginBottom: '0.4rem', display: 'block' }}>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '10px',
                                    border: '1.5px solid #e0e0e0',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    boxSizing: 'border-box',
                                    backgroundColor: '#ffffff',
                                    color: '#000000',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#007bff';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(0,123,255,0.2)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e0e0e0';
                                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                }}
                            />
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ddd', marginBottom: '0.4rem', display: 'block' }}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@company.com"
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '10px',
                                    border: '1.5px solid #e0e0e0',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    boxSizing: 'border-box',
                                    backgroundColor: '#ffffff',
                                    color: '#000000',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#007bff';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(0,123,255,0.2)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e0e0e0';
                                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                }}
                            />
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ddd', marginBottom: '0.4rem', display: 'block' }}>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 234 567 890"
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '10px',
                                    border: '1.5px solid #e0e0e0',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    boxSizing: 'border-box',
                                    backgroundColor: '#ffffff',
                                    color: '#000000',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#007bff';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(0,123,255,0.2)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e0e0e0';
                                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                }}
                            />
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ddd', marginBottom: '0.4rem', display: 'block' }}>Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
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
                            {formData.password && (
                                <div style={{ marginTop: '0.4rem' }}>
                                    <div style={{
                                        height: '4px',
                                        width: '100%',
                                        backgroundColor: '#222',
                                        borderRadius: '2px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${(passwordStrength.score / 5) * 100}%`,
                                            backgroundColor: passwordStrength.color,
                                            transition: 'width 0.3s ease'
                                        }} />
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: passwordStrength.color, marginTop: '2px', display: 'block' }}>
                                        Strength: {passwordStrength.label}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ddd', marginBottom: '0.4rem', display: 'block' }}>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
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
                                padding: '12px',
                                backgroundColor: '#ffffff',
                                color: '#000000',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                marginTop: '0.5rem',
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

                    <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#888', textAlign: 'center' }}>
                        Already have an account? <span onClick={() => navigate('/login')} style={{ color: '#3d9afc', cursor: 'pointer', fontWeight: '700' }}>Sign in</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
