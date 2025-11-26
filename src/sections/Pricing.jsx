import React from 'react';
import Button from '../components/Button';
import './Pricing.css';

const Pricing = () => {
    return (
        <section className="pricing">
            <div className="container">
                <div className="pricing-card glass-panel">
                    <div className="pricing-content">
                        <h2 className="section-title">Flexible engagement models</h2>
                        <p className="pricing-desc">
                            We work as your AI partner: proof-of-value engagements, pilot-to-production, and long-term managed services. Pricing aligns with outcomes — not usage confusion.
                        </p>
                    </div>
                    <div className="pricing-action">
                        <Button variant="primary" onClick={() => window.location.href = '#contact'}>
                            Talk to Sales
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
