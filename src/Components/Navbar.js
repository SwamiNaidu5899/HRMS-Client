import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-brand">TTT</h1>
                <button className="navbar-toggle" onClick={toggleNavbar}>
                    <span className="toggle-icon"></span>
                </button>
                <ul className={`navbar-links ${isOpen ? 'show' : ''}`}>
                    <li><Link to="/login" onClick={toggleNavbar}>Login</Link></li>
                    <li><Link to="/register" onClick={toggleNavbar}>Register</Link></li>
                    <li><Link to="/apply-leave" onClick={toggleNavbar}>Apply Leave</Link></li>
                    <Link to="/user-details">My Details</Link>
                    <li><Link to="/attendance" onClick={toggleNavbar}>Attendance</Link></li>
                    <li><Link to="/admin" onClick={toggleNavbar}>Admin</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
