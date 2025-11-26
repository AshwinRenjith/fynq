import React from 'react';
import './Outcomes.css';

const Outcomes = () => {
    return (
        <section className="outcomes">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Measurable outcomes — real business value</h2>
                    <p className="section-lead">
                        We focus on the metrics that matter: time saved, cost reduced, revenue uplift, error reduction.
                    </p>
                </div>

                <div className="metrics-grid">
                    <div className="metric-item">
                        <div className="metric-value">40–70%</div>
                        <div className="metric-label">reduction in manual processing time</div>
                    </div>

                    <div className="metric-item">
                        <div className="metric-value">2–5x</div>
                        <div className="metric-label">faster decision cycles</div>
                    </div>

                    <div className="metric-item">
                        <div className="metric-value">30%+</div>
                        <div className="metric-label">measurable cost savings on targeted workflows</div>
                    </div>
                </div>

                <div className="testimonial">
                    <blockquote className="testimonial-quote">
                        "fynq transformed our operations. The automation they built paid for itself within quarters."
                    </blockquote>
                    <cite className="testimonial-author">
                        — Name, Title, Company
                    </cite>
                </div>
            </div>
        </section>
    );
};

export default Outcomes;
