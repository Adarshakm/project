import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ title = 'Assistance' }) => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="navbar-brand">
                    {title}
                </div>
                <Link to="/profile" className="profile-link">Profile</Link>
                <Link to="/business" className="profile-link">Business</Link>
                <Link to="/news" className="profile-link">News</Link>
            </div>
        </nav>
    );
};

export default Navbar;
