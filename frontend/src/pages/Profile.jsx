import React from 'react';
import Navbar from '../components/Navbar';

const Profile = () => {
    // Current user in this app is "Me" as seen in App.jsx
    const currentUser = {
        name: 'Me',
        bio: 'Passionate developer and researcher.',
        email: 'me@example.com',
        location: 'Earth'
    };

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Navbar />
            <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#007bff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 'bold', margin: '0 auto 1rem' }}>
                        {currentUser.name[0]}
                    </div>
                    <h2 style={{ margin: '0', color: '#333' }}>{currentUser.name}</h2>
                    <p style={{ color: '#666' }}>{currentUser.bio}</p>
                </div>
                
                <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', color: '#888', fontSize: '0.9rem' }}>Email</label>
                        <span style={{ color: '#333' }}>{currentUser.email}</span>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', color: '#888', fontSize: '0.9rem' }}>Location</label>
                        <span style={{ color: '#333' }}>{currentUser.location}</span>
                    </div>
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <button style={{ padding: '0.8rem 2rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
