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
            </div>
            <div className="navbar-right">
                <Link to="/messages" className="navbar-messages-link">
                    Messages
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
