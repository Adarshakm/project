import React from 'react';
import Navbar from '../components/Navbar';

const News = () => {
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
                    }}>News</div>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                        <div style={{ padding: '0.8rem', cursor: 'default', color: '#888' }}>
                            Latest News Updates
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
                            color: '#333', 
                            fontWeight: 'bold',
                            fontSize: '1.2rem'
                        }}>
                            News
                        </div>
                    </div>
                    
                    {/* Main content area */}
                    <div style={{ padding: '2rem', flex: 1, overflowY: 'auto', backgroundColor: '#fcfcfc' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>
                            Stay tuned for the latest updates.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;
