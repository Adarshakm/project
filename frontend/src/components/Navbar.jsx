import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ title = 'Assistance' }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-brand-link">
                    <div className="navbar-brand">
                        {title}
                    </div>
                </Link>
            </div>
            {user && (
                <div className="navbar-right">
                    <div className="navbar-user">
                        <span className="navbar-username">{user.fullName}</span>
                        <div className="navbar-avatar">
                            {user.fullName.charAt(0)}
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
