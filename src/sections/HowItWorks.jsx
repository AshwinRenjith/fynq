import React from 'react';
import Button from '../components/Button';
import BlurReveal from '../components/BlurReveal';
import './HowItWorks.css';

const HowItWorks = () => {
    return (
        <section className="how-it-works">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">A practical path to production AI</h2>
                </div>

                <div className="steps-grid">
                    <div className="step-item">
                        <div className="step-number">01</div>
                        <h3 className="step-title">Discover</h3>
                        <p className="step-desc">We audit data, map processes, and define measurable outcomes.</p>
                    </div>

                    <div className="step-item">
                        <div className="step-number">02</div>
                        <h3 className="step-title">Build</h3>
                        <p className="step-desc">Custom models, workflows, and secure pipelines aligned to KPIs.</p>
                    </div>

                    <div className="step-item">
                        <div className="step-number">03</div>
                        <h3 className="step-title">Run & Evolve</h3>
                        <p className="step-desc">Deploy, monitor, and iterate — your AI matures alongside your business.</p>
                    </div>
                </div>

                <div className="steps-cta">
                    <Button variant="primary" onClick={() => window.location.href = '#contact'}>
                        Schedule a Strategy Call
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
