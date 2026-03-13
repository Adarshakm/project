import React from 'react';
import Navbar from '../components/Navbar';

const sportsNews = [
    { 
        id: 1, 
        category: 'Soccer', 
        headline: 'Championship Finals: Underdogs Clinch Victory in Last-Minute Thriller', 
        summary: 'In a match that will be remembered for decades, the league underdogs secured the championship title with a stunning bicycle kick in the final minute of extra time.',
        source: 'Sports Direct',
        time: '1 hour ago',
        color: '#00a884',
        image: '/assets/sports/soccer.png'
    },
    { 
        id: 2, 
        category: 'Basketball', 
        headline: 'MVP Race Heats Up as Star Guard Drops Career-High 60 Points', 
        summary: 'The battle for the MVP title reached new heights tonight as the league-leading guard delivered a masterclass performance, breaking multiple franchise records.',
        source: 'Hoops Insider',
        time: '3 hours ago',
        color: '#ff9900',
        image: '/assets/sports/basketball.png'
    },
    { 
        id: 3, 
        category: 'Tennis', 
        headline: 'Grand Slam Breakthrough: Teen Prodigy Reaches Semifinals', 
        summary: 'A new star is born on the clay courts as a 17-year-old qualifier upsets the top seed to secure a historic spot in the Grand Slam semifinals.',
        source: 'Tennis World',
        time: '5 hours ago',
        color: '#c2d500',
        image: '/assets/sports/tennis.png'
    },
    { 
        id: 4, 
        category: 'Formula 1', 
        headline: 'Night Race Spectacle: Tactical Masterstroke Secures Podium Finish', 
        summary: 'Under the floodlights of the city circuit, a bold pit strategy allowed the chasing pack to leapfrog the leaders in a high-speed game of tactical chess.',
        source: 'F1 Pulse',
        time: '7 hours ago',
        color: '#e10600',
        image: '/assets/sports/f1.png'
    },
    { 
        id: 5, 
        category: 'Cricket', 
        headline: 'Record-Breaking Century Leads Team to Historic Series Win', 
        summary: 'A breathtaking display of power hitting saw the visiting captain smash a 40-ball century, guiding their team to a dominant series victory.',
        source: 'Cricket Daily',
        time: '10 hours ago',
        color: '#1d9bf0',
        image: '/assets/sports/cricket.png'
    }
];

const Sports = () => {
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
                    }}>Sports</div>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                        <div style={{ padding: '0.8rem', cursor: 'pointer', borderBottom: '1px solid #eee', fontWeight: 'bold', color: '#1d9bf0' }}>
                            World Sports
                        </div>
                        <div style={{ padding: '0.8rem', cursor: 'pointer', borderBottom: '1px solid #eee', color: '#555' }}>
                            Live Scores
                        </div>
                        <div style={{ padding: '0.8rem', cursor: 'pointer', borderBottom: '1px solid #eee', color: '#555' }}>
                            Transfers
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
                        <div style={{ 
                            color: '#1d9bf0', 
                            fontWeight: 'bold',
                            fontSize: '1.2rem'
                        }}>
                            Latest Updates
                        </div>
                    </div>
                    
                    {/* Main content area */}
                    <div style={{ padding: '2rem', flex: 1, overflowY: 'auto', backgroundColor: '#fcfcfc' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
                            {sportsNews.map((item) => (
                                <div 
                                    key={item.id} 
                                    style={{ 
                                        backgroundColor: '#fff', 
                                        borderRadius: '16px', 
                                        border: '1px solid #efefef',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                                        display: 'flex',
                                        overflow: 'hidden',
                                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
                                        cursor: 'pointer',
                                        minHeight: '220px'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)';
                                        const img = e.currentTarget.querySelector('img');
                                        if (img) img.style.transform = 'scale(1.05)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)';
                                        const img = e.currentTarget.querySelector('img');
                                        if (img) img.style.transform = 'scale(1)';
                                    }}
                                >
                                    <div style={{ flex: '0 0 40%', overflow: 'hidden', position: 'relative' }}>
                                        <img 
                                            src={item.image} 
                                            alt={item.headline} 
                                            style={{ 
                                                width: '100%', 
                                                height: '100%', 
                                                objectFit: 'cover',
                                                transition: 'transform 0.5s ease'
                                            }}
                                        />
                                        <div style={{ 
                                            position: 'absolute', 
                                            top: '1rem', 
                                            left: '1rem',
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            color: item.color,
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            backdropFilter: 'blur(4px)',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                        }}>
                                            {item.category}
                                        </div>
                                    </div>
                                    <div style={{ flex: '1', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem' }}>{item.time} • {item.source}</div>
                                            <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#111', lineHeight: '1.3', fontWeight: 'bold', marginBottom: '0.8rem' }}>{item.headline}</h2>
                                            <p style={{ margin: 0, color: '#555', fontSize: '0.95rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.summary}</p>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                            <span style={{ color: item.color, fontSize: '0.9rem', fontWeight: 'bold' }}>Watch Highlights →</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sports;
