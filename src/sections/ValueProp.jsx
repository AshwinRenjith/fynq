import React from 'react';
import './ValueProp.css';

const ValueProp = () => {
    return (
        <section className="value-prop" id="why-fynq">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Why companies choose fynq</h2>
                    <p className="section-lead">
                        Generic AI doesn't deliver. Tailored intelligence does. We design production-grade AI systems that fit your data, operations, and growth targets — then run them reliably at scale.
                    </p>
                </div>

                <div className="value-grid">
                    <div className="value-item">
                        <h3 className="value-title">Outcome-first engineering</h3>
                        <p className="value-desc">
                            We optimize for revenue, cost, and time-to-decision — not vanity metrics.
                        </p>
                    </div>

                    <div className="value-item">
                        <h3 className="value-title">Enterprise-ready reliability</h3>
                        <p className="value-desc">
                            Secure, auditable systems built for real-world SLAs.
                        </p>
                    </div>

                    <div className="value-item">
                        <h3 className="value-title">Human-centered design</h3>
                        <p className="value-desc">
                            AI that augments teams and simplifies decisions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ValueProp;
