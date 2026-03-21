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
        </nav>
    );
};

export default Navbar;
