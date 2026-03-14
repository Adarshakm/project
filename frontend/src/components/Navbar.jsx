import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ title = 'Assistance' }) => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-brand-link">
                    <div className="navbar-brand">
                        {title}
                    </div>
                </Link>
                <Link to="/profile" className="profile-link">Profile</Link>
                <Link to="/business" className="profile-link">Business</Link>
                <Link to="/news" className="profile-link">News</Link>
                <Link to="/sports" className="profile-link">Sports</Link>
            </div>
        </nav>
    );
};

export default Navbar;
