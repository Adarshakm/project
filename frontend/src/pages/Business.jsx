import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const topITCompanies = [
    { name: 'Apple', symbol: '', color: '#000000', tagline: 'Think Different' },
    { name: 'Microsoft', symbol: '⊞', color: '#00A4EF', tagline: 'Empowering us all' },
    { name: 'Google', symbol: 'G', color: '#4285F4', tagline: 'Organizing information' },
    { name: 'Amazon', symbol: 'a', color: '#FF9900', tagline: 'Work Hard. Have Fun. Make History.' },
    { name: 'NVIDIA', symbol: 'N', color: '#76B900', tagline: 'AI Computing Excellence' },
    { name: 'Meta', symbol: '∞', color: '#0668E1', tagline: 'Connection and Community' },
    { name: 'Tesla', symbol: 'T', color: '#E31937', tagline: 'Accelerating Sustainability' },
    { name: 'Adobe', symbol: 'A', color: '#FF0000', tagline: 'Creativity for all' },
    { name: 'Salesforce', symbol: '☁', color: '#00A1E0', tagline: 'The Customer Company' },
    { name: 'Intel', symbol: 'i', color: '#0071C5', tagline: 'Innovation and Performance' }
];

const Business = () => {
    const [view, setView] = useState('none'); // 'none' or 'world'

    const handleWorldClick = () => {
        setView('world');
    };

    return (
        <div style={{ paddingTop: '80px', height: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            <Navbar />
            <div className="main-layout" style={{ gridTemplateColumns: '1fr 3fr' }}>
                <div className="column-sidebar">
                    <div style={{ 
                        height: '60px', 
                        backgroundColor: '#ffffff', 
                        borderBottom: '2px solid #efefef', 
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 1rem',
                        fontSize: '1.4rem',
                        fontWeight: 'bold',
                        color: '#333'
                    }}>Business</div>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                        <div style={{ padding: '0.8rem', cursor: 'pointer', borderBottom: '1px solid #eee' }}>
                            IT Companies
                        </div>
                    </div>
                </div>
                <div className="column-main" style={{ backgroundColor: '#fff', borderRight: 'none', padding: 0, display: 'flex', flexDirection: 'column' }}>
                    {/* Minimalist Sub-Navbar */}
                    <div style={{ 
                        height: '60px', 
                        backgroundColor: '#ffffff', 
                        borderBottom: '1px solid #efefef', 
                        display: 'flex', 
                        alignItems: 'center', 
                        padding: '0 2rem'
                    }}>
                        <div 
                            onClick={handleWorldClick}
                            style={{ 
                                cursor: 'pointer', 
                                color: view === 'world' ? '#1d9bf0' : '#536471', 
                                fontWeight: view === 'world' ? 'bold' : 'normal',
                                fontSize: '1rem',
                                transition: 'color 0.2s',
                                marginRight: '2rem'
                            }}
                        >
                            World
                        </div>
                        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                            <input 
                                type="text" 
                                placeholder="Select Country" 
                                style={{
                                    width: '100%',
                                    padding: '0.6rem 1rem 0.6rem 2.5rem',
                                    borderRadius: '20px',
                                    border: '1px solid #efefef',
                                    backgroundColor: '#f7f9f9',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s, background-color 0.2s'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#1d9bf0';
                                    e.target.style.backgroundColor = '#fff';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#efefef';
                                    e.target.style.backgroundColor = '#f7f9f9';
                                }}
                            />
                            <span style={{ 
                                position: 'absolute', 
                                left: '1rem', 
                                top: '50%', 
                                transform: 'translateY(-50%)', 
                                color: '#536471',
                                pointerEvents: 'none'
                            }}>
                                🔍
                            </span>
                        </div>
                    </div>
                    
                    {/* Main content area */}
                    <div style={{ padding: '2rem', flex: 1, overflowY: 'auto', backgroundColor: '#fcfcfc' }}>
                        {view === 'world' ? (
                            <div>
                                <h1 style={{ marginBottom: '2rem', fontSize: '1.8rem', color: '#111' }}>World's Top IT Companies</h1>
                                <div style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                                    gap: '1.5rem' 
                                }}>
                                    {topITCompanies.map((company) => (
                                        <div 
                                            key={company.name} 
                                            style={{ 
                                                padding: '1.5rem', 
                                                backgroundColor: '#fff', 
                                                borderRadius: '12px', 
                                                border: '1px solid #efefef',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '1rem',
                                                transition: 'transform 0.2s, box-shadow 0.2s',
                                                cursor: 'pointer'
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-4px)';
                                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.06)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ 
                                                    width: '50px', 
                                                    height: '50px', 
                                                    borderRadius: '12px', 
                                                    backgroundColor: company.color, 
                                                    color: '#fff', 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center',
                                                    fontSize: '1.8rem',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {company.symbol}
                                                </div>
                                                <div>
                                                    <h3 style={{ margin: 0, color: '#333', fontSize: '1.2rem' }}>{company.name}</h3>
                                                    <p style={{ margin: 0, color: '#888', fontSize: '0.85rem' }}>Technology Leader</p>
                                                </div>
                                            </div>
                                            <div style={{ borderTop: '1px solid #f5f5f5', paddingTop: '1rem' }}>
                                                <p style={{ margin: 0, color: '#555', fontSize: '0.9rem', fontStyle: 'italic' }}>
                                                    "{company.tagline}"
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <button style={{ 
                                                    backgroundColor: 'transparent', 
                                                    border: '1px solid #1d9bf0', 
                                                    color: '#1d9bf0', 
                                                    padding: '0.4rem 1rem', 
                                                    borderRadius: '20px', 
                                                    fontSize: '0.8rem', 
                                                    fontWeight: 'bold',
                                                    cursor: 'pointer'
                                                }}>View Stats</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>
                                Select 'World' to view top IT companies
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Business;
