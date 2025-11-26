import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-main">
                    <div className="footer-brand">
                        <div className="footer-logo">fynq</div>
                        <p className="footer-tagline">When Vision Meets AI</p>
                    </div>

                    <div className="footer-contact">
                        <a href="mailto:hello@fynq.ai">hello@fynq.ai</a>
                        <span>+91-XXXXXXXXXX</span>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 fynq. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="#privacy">Privacy</a>
                        <a href="#terms">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
