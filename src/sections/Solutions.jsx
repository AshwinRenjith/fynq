import React from 'react';
import BlurReveal from '../components/BlurReveal';
import './Solutions.css';

const Solutions = () => {
    const solutions = [
        {
            title: 'Finance operations',
            desc: 'Automated reconciliation, anomaly detection, risk scoring.'
        },
        {
            title: 'Sales & GTM',
            desc: 'Lead prioritization, revenue forecasting, AE augmentation.'
        },
        {
            title: 'Operations & supply chain',
            desc: 'Demand prediction, capacity optimization, exception automation.'
        },
        {
            title: 'Customer experience',
            desc: 'AI assistants, routing automation, sentiment-driven workflows.'
        }
    ];

    return (
        <section className="solutions" id="solutions">
            <div className="container">
                <div className="section-header">
                    <BlurReveal>
                        <h2 className="section-title">Solutions — pick where you need outcomes</h2>
                        <p className="section-lead">
                            We deliver vertical and horizontal solutions that integrate with existing systems and unlock new capabilities.
                        </p>
                    </BlurReveal>
                </div>

                <div className="solutions-list">
                    {solutions.map((item, index) => (
                        <BlurReveal key={index} delay={index * 0.1} className="solution-item-wrapper">
                            <div className="solution-item glass-panel">
                                <h3 className="solution-title">{item.title}</h3>
                                <p className="solution-desc">{item.desc}</p>
                            </div>
                        </BlurReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Solutions;
