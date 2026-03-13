import React from 'react';

const dummyPosts = [
  {
    id: 1,
    user: 'Adarsh',
    handle: '@adarsh_dev',
    content: 'Building this amazing multi-column layout with React! #webdev #frontend',
    time: '2h',
    avatarColor: '#007bff'
  },
  {
    id: 2,
    user: 'Elon Musk',
    handle: '@elonmusk',
    content: 'Starship flight test successful. Mars is getting closer! 🚀',
    time: '4h',
    avatarColor: '#000'
  },
  {
    id: 3,
    user: 'Tech Insider',
    handle: '@techinsider',
    content: 'New AI models are revolutionizing how we write code. What do you think about agentic AI?',
    time: '6h',
    avatarColor: '#28a745'
  },
  {
    id: 4,
    user: 'React News',
    handle: '@reactjs',
    content: 'React 19 is officially here! Check out the latest features in our blog post.',
    time: '1d',
    avatarColor: '#61dafb'
  },
  {
    id: 5,
    user: 'Design Daily',
    handle: '@designdaily',
    content: 'Glassmorphism vs. Neumorphism: Which one are you choosing for your next project? #design #uiux',
    time: 'Yesterday',
    avatarColor: '#ffc107'
  },
  {
    id: 6,
    user: 'Bill Gates',
    handle: '@billgates',
    content: 'The breakthrough in green energy storage is closer than we think. Optimistic about the future! 🌱',
    time: '3h',
    avatarColor: '#f1f1f1'
  },
  {
    id: 7,
    user: 'Nature Photog',
    handle: '@nature_pix',
    content: 'Captured this stunning view of the Himalayas this morning. Nature is truly magnificent. 🏔️',
    time: '5h',
    avatarColor: '#ff5722'
  },
  {
    id: 8,
    user: 'Stock Market',
    handle: '@market_watch',
    content: 'Markets trending upwards today as tech stocks show resilience. Stay tuned for more updates.',
    time: '8h',
    avatarColor: '#4caf50'
  },
  {
    id: 9,
    user: 'Cooking Hub',
    handle: '@chef_master',
    content: 'What is your secret ingredient for the perfect pasta? Mine is a touch of lemon zest! 🍝',
    time: '12h',
    avatarColor: '#e91e63'
  },
  {
    id: 10,
    user: 'NASA',
    handle: '@nasa',
    content: 'New images from James Webb Telescope reveal distant galaxies in unprecedented detail. #space',
    time: '2d',
    avatarColor: '#000080'
  }
];

const SocialFeed = () => {
  return (
    <div style={{ padding: '0 0 2rem 0' }}>
      <div style={{ 
        padding: '1rem', 
        borderBottom: '1px solid #eee', 
        backgroundColor: '#fff', 
        position: 'sticky', 
        top: 0, 
        zIndex: 10,
        fontWeight: 'bold',
        fontSize: '1.2rem'
      }}>
        Whats Happeining Around You
      </div>

      {/* Post Creation Area */}
      <div style={{ 
        padding: '1.5rem', 
        borderBottom: '8px solid #f7f9f9', 
        backgroundColor: '#fff',
        display: 'flex',
        gap: '1rem'
      }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          borderRadius: '50%', 
          backgroundColor: '#007bff', 
          color: '#fff', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontWeight: 'bold',
          flexShrink: 0
        }}>
          Y
        </div>
        <div style={{ flex: 1 }}>
          <textarea 
            placeholder="What's happening?" 
            style={{ 
              width: '100%', 
              border: 'none', 
              outline: 'none', 
              fontSize: '1.2rem', 
              resize: 'none', 
              minHeight: '80px',
              fontFamily: 'inherit'
            }}
          />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginTop: '0.8rem',
            borderTop: '1px solid #eee',
            paddingTop: '0.8rem'
          }}>
            <div style={{ display: 'flex', gap: '1rem', color: '#1d9bf0', fontSize: '1.2rem', cursor: 'pointer' }}>
              <span>🖼️</span>
              <span>📊</span>
              <span>😀</span>
              <span>📍</span>
            </div>
            <button style={{ 
              padding: '0.6rem 1.5rem', 
              backgroundColor: '#1d9bf0', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '9999px', 
              fontWeight: 'bold', 
              cursor: 'pointer'
            }}>
              Post
            </button>
          </div>
        </div>
      </div>

      {dummyPosts.map(post => (
        <div key={post.id} style={{ 
          padding: '1.5rem', 
          borderBottom: '1px solid #eee', 
          backgroundColor: '#fff',
          display: 'flex',
          gap: '1rem'
        }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '50%', 
            backgroundColor: post.avatarColor, 
            color: '#fff', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontWeight: 'bold',
            flexShrink: 0
          }}>
            {post.user[0]}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.3rem' }}>
              <span style={{ fontWeight: 'bold', color: '#000' }}>{post.user}</span>
              <span style={{ color: '#666', fontSize: '0.9rem' }}>{post.handle}</span>
              <span style={{ color: '#666', fontSize: '0.9rem' }}>· {post.time}</span>
            </div>
            <div style={{ color: '#333', lineHeight: '1.4', fontSize: '1rem', wordBreak: 'break-word' }}>
              {post.content}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: '#666', maxWidth: '400px' }}>
              <span>💬 12</span>
              <span>🔁 45</span>
              <span>❤️ 1.2k</span>
              <span>📊 15k</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialFeed;
