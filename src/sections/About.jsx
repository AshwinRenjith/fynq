import React from 'react';
import './About.css';

const About = () => {
    return (
        <section className="about" id="about">
            <div className="container">
                <div className="about-content">
                    <h2 className="section-title">Our mission</h2>
                    <p className="about-copy">
                        We build AI that amplifies human judgment and creates durable advantage. fynq helps companies move faster and think clearer through precise, practical intelligence.
                    </p>

                    <div className="values-list">
                        <span className="value-item">Precision</span>
                        <span className="value-separator">·</span>
                        <span className="value-item">Trust</span>
                        <span className="value-separator">·</span>
                        <span className="value-item">Elegance</span>
                        <span className="value-separator">·</span>
                        <span className="value-item">Partnership</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
