import React from 'react';

const Profile = () => {
  const user = {
    name: 'Adarsh',
    handle: '@adarsh_dev',
    bio: 'Software Engineer | Building amazing tech at Assistance | Passionate about AI and Open Source 🚀',
    location: 'India',
    joined: 'February 2024',
    followers: '1.2K',
    following: '450',
    headerImg: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1500&q=80',
    avatarImg: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
  };

  const posts = [
    {
      id: 1,
      content: 'Just implemented the new profile view! What do you guys think? #buildinginpublic #react',
      time: '1h',
      likes: '45',
      retweets: '12'
    },
    {
      id: 2,
      content: 'The future of development is collaborative and agentic. 🤖✨',
      time: '5h',
      likes: '128',
      retweets: '34'
    }
  ];

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100%' }}>
      {/* Header Image */}
      <div style={{ 
        height: '200px', 
        width: '100%', 
        backgroundImage: `url(${user.headerImg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        {/* Avatar */}
        <div style={{ 
          position: 'absolute', 
          bottom: '-60px', 
          left: '20px', 
          width: '120px', 
          height: '120px', 
          borderRadius: '50%', 
          border: '4px solid #fff', 
          overflow: 'hidden',
          backgroundColor: '#eee',
          zIndex: 10
        }}>
          <img src={user.avatarImg} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* Profile Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px 20px', minHeight: '60px' }}>
        <button style={{ 
          padding: '8px 20px', 
          borderRadius: '9999px', 
          border: '1px solid #cfd9de', 
          backgroundColor: 'transparent', 
          fontWeight: 'bold', 
          cursor: 'pointer' 
        }}>
          Edit profile
        </button>
      </div>

      {/* User Info */}
      <div style={{ padding: '20px', marginTop: '10px' }}>
        <h2 style={{ margin: 0, fontSize: '1.4rem' }}>{user.name}</h2>
        <div style={{ color: '#536471', fontSize: '1rem', marginBottom: '12px' }}>{user.handle}</div>
        
        <div style={{ fontSize: '1rem', color: '#0f1419', marginBottom: '12px', lineHeight: '1.4' }}>
          {user.bio}
        </div>

        <div style={{ display: 'flex', gap: '20px', color: '#536471', fontSize: '0.95rem', marginBottom: '12px' }}>
          <span>📍 {user.location}</span>
          <span>📅 Joined {user.joined}</span>
        </div>

        <div style={{ display: 'flex', gap: '20px', fontSize: '0.95rem' }}>
          <span><strong style={{ color: '#0f1419' }}>{user.following}</strong> <span style={{ color: '#536471' }}>Following</span></span>
          <span><strong style={{ color: '#0f1419' }}>{user.followers}</strong> <span style={{ color: '#536471' }}>Followers</span></span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #eff3f4', marginTop: '10px' }}>
        {['Posts', 'Replies', 'Highlights', 'Media', 'Likes'].map((tab, i) => (
          <div key={tab} style={{ 
            flex: 1, 
            textAlign: 'center', 
            padding: '16px 0', 
            fontWeight: i === 0 ? 'bold' : 'normal',
            color: i === 0 ? '#0f1419' : '#536471',
            cursor: 'pointer',
            borderBottom: i === 0 ? '4px solid #1d9bf0' : 'none'
          }}>
            {tab}
          </div>
        ))}
      </div>

      {/* Posts Feed */}
      <div>
        {posts.map(post => (
          <div key={post.id} style={{ padding: '16px 20px', borderBottom: '1px solid #eff3f4', display: 'flex', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#eee', flexShrink: 0 }}>
              <img src={user.avatarImg} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>{user.name}</span>
                <span style={{ color: '#536471' }}>{user.handle} · {post.time}</span>
              </div>
              <div style={{ marginTop: '4px', fontSize: '1rem', color: '#0f1419', lineHeight: '1.4' }}>
                {post.content}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', color: '#536471', maxWidth: '300px' }}>
                <span>💬 0</span>
                <span>🔁 {post.retweets}</span>
                <span>❤️ {post.likes}</span>
                <span>📊 120</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
