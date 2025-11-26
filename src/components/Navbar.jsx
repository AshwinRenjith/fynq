import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Button';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <a href="/" className="navbar-logo">
                    fynq
                </a>

                <div className="navbar-desktop">
                    <a href="#solutions" className="nav-link">Solutions</a>
                    <a href="#why-fynq" className="nav-link">Why fynq</a>
                    <a href="#about" className="nav-link">About</a>
                    <Button variant="primary" onClick={() => window.location.href = '#contact'}>
                        Book a Demo
                    </Button>
                </div>

                <button
                    className="navbar-mobile-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
                </button>

                {isMobileMenuOpen && (
                    <div className="navbar-mobile-menu">
                        <a href="#solutions" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Solutions</a>
                        <a href="#why-fynq" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Why fynq</a>
                        <a href="#about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</a>
                        <Button variant="primary" onClick={() => {
                            setIsMobileMenuOpen(false);
                            window.location.href = '#contact';
                        }}>
                            Book a Demo
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
