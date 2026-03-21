import React, { useEffect, useRef } from 'react';

const ChatWindow = ({ currentChat, messages, currentUser, newMessage, setNewMessage, sendMessage, setCurrentChat, isMobile }) => {
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (!currentChat) {
        return (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' }}>
                <div style={{
                    width: '80px', height: '80px', borderRadius: '50%', background: '#e4e6eb',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem'
                }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0084ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>
                <h3 style={{ color: '#050505', margin: 0, fontSize: '1.25rem' }}>Your Messages</h3>
                <p style={{ color: '#65676b', marginTop: '0.5rem', fontSize: '0.95rem' }}>Select a conversation to start chatting.</p>
            </div>
        );
    }

    const friend = currentChat.participants.find(p => p._id !== currentUser.id);

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
            {/* Header */}
            <div style={{ padding: '15px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', background: '#ffffff', zIndex: 10 }}>
                {isMobile && (
                    <button onClick={() => setCurrentChat(null)} style={{ background: 'none', border: 'none', marginRight: '15px', padding: 0, color: '#0084ff', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    </button>
                )}
                <div style={{
                    width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #0084ff 0%, #0056b3 100%)',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginRight: '15px', fontSize: '1.1rem'
                }}>
                    {friend?.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 style={{ margin: 0, color: '#050505', fontSize: '1.05rem', fontWeight: 'bold' }}>{friend?.fullName}</h3>
                    <div style={{ fontSize: '0.8rem', color: '#65676b', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                        Connected
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {messages.length === 0 ? (
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#65676b' }}>
                        Say hi to {friend?.fullName}!
                    </div>
                ) : (
                    messages.map((m, index) => {
                        const isOwn = m.sender === currentUser.id;
                        return (
                            <div key={index} ref={index === messages.length - 1 ? scrollRef : null} style={{
                                display: 'flex', flexDirection: 'column',
                                alignItems: isOwn ? 'flex-end' : 'flex-start',
                            }}>
                                <div style={{
                                    maxWidth: '65%', padding: '8px 14px', borderRadius: '18px',
                                    background: isOwn ? '#0084ff' : '#e4e6eb',
                                    color: isOwn ? 'white' : '#050505',
                                    fontSize: '0.95rem', lineHeight: '1.4',
                                    borderBottomRightRadius: isOwn ? '4px' : '18px',
                                    borderBottomLeftRadius: isOwn ? '18px' : '4px',
                                    wordWrap: 'break-word'
                                }}>
                                    {m.text}
                                </div>
                                <span style={{ fontSize: '0.7rem', color: '#bcc0c4', marginTop: '4px', margin: isOwn ? '4px 4px 0 0' : '4px 0 0 4px' }}>
                                    {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Input Area */}
            <div style={{ padding: '15px 20px', borderTop: '1px solid #e5e7eb', background: '#ffffff' }}>
                <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#0084ff', cursor: 'pointer' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Aa" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        style={{
                            flex: 1, padding: '10px 16px', borderRadius: '24px',
                            border: 'none', background: '#f0f2f5', outline: 'none',
                            fontSize: '0.95rem', color: '#050505'
                        }}
                    />
                    <button 
                        type="submit"
                        disabled={!newMessage.trim()}
                        style={{
                            background: 'transparent', border: 'none', cursor: newMessage.trim() ? 'pointer' : 'default',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px',
                            color: newMessage.trim() ? '#0084ff' : '#bcc0c4', transition: 'color 0.2s'
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z"></path>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatWindow;
