import React, { useState } from 'react';

const ConversationList = ({ conversations, currentChat, setCurrentChat, onlineUsers, currentUser }) => {
    const [search, setSearch] = useState('');

    const filteredConversations = conversations?.filter(c => {
        const friend = c.participants.find(p => p._id !== currentUser.id);
        return friend?.fullName.toLowerCase().includes(search.toLowerCase());
    }) || [];

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#ffffff', borderRight: '1px solid #e5e7eb' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>Chats</h2>
                <input 
                    type="text" 
                    placeholder="Search Messenger..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: '100%', padding: '10px 18px', marginTop: '15px',
                        borderRadius: '20px', border: 'none', background: '#f0f2f5',
                        outline: 'none', boxSizing: 'border-box', fontSize: '0.95rem'
                    }}
                />
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
                {filteredConversations.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#9ca3af', marginTop: '20px' }}>No conversations found.</p>
                ) : (
                    filteredConversations.map((c) => {
                        const friend = c.participants.find(p => p._id !== currentUser.id);
                        if (!friend) return null;
                        
                        const isOnline = onlineUsers.includes(friend._id);
                        const isActive = currentChat?._id === c._id;

                        return (
                            <div 
                                key={c._id}
                                onClick={() => setCurrentChat(c)}
                                style={{
                                    display: 'flex', alignItems: 'center', padding: '12px 20px',
                                    cursor: 'pointer', background: isActive ? '#ebf5ff' : 'transparent',
                                    transition: 'background 0.2s', borderLeft: isActive ? '4px solid #0084ff' : '4px solid transparent'
                                }}
                                onMouseOver={(e) => !isActive && (e.currentTarget.style.background = '#f9fafb')}
                                onMouseOut={(e) => !isActive && (e.currentTarget.style.background = 'transparent')}
                            >
                                <div style={{ position: 'relative', marginRight: '15px' }}>
                                    <div style={{
                                        width: '50px', height: '50px', borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #0084ff 0%, #0056b3 100%)',
                                        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 'bold', fontSize: '1.2rem'
                                    }}>
                                        {friend.fullName.charAt(0).toUpperCase()}
                                    </div>
                                    {isOnline && (
                                        <div style={{
                                            position: 'absolute', bottom: 2, right: 2,
                                            width: '12px', height: '12px', borderRadius: '50%',
                                            background: '#31a24c', border: '2px solid white'
                                        }}></div>
                                    )}
                                </div>
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#050505', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: isActive ? '600' : '400' }}>
                                            {friend.fullName}
                                        </h4>
                                        {c.lastMessage && (
                                            <span style={{ fontSize: '0.75rem', color: '#65676b' }}>
                                                {new Date(c.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        )}
                                    </div>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: isActive ? '#0084ff' : '#65676b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {c.lastMessage ? c.lastMessage.text : 'Start a new conversation'}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ConversationList;
