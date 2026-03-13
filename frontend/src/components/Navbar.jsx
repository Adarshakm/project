import React from 'react';
import './Navbar.css';

const Navbar = ({ title = 'Assistance' }) => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                {title}
            </div>

        </nav>
    );
};

export default Navbar;
