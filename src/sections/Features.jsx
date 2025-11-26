import React from 'react';
import Card from '../components/Card';
import BlurReveal from '../components/BlurReveal';
import './Features.css';

const Features = () => {
    return (
        <section className="features">
            <div className="container">
                <div className="section-header">
                    <BlurReveal>
                        <h2 className="section-title">Capabilities built for business impact</h2>
                    </BlurReveal>
                </div>

                <div className="features-grid">
                    <BlurReveal delay={0.1}>
                        <Card className="feature-card">
                            <h3 className="feature-title">Automate mission-critical workflows</h3>
                            <p className="feature-desc">
                                End-to-end automation that replaces manual work with intelligent flows — fewer errors, faster fulfilment, lower cost.
                            </p>
                        </Card>
                    </BlurReveal>

                    <BlurReveal delay={0.2}>
                        <Card className="feature-card">
                            <h3 className="feature-title">Models tailored to your domain</h3>
                            <p className="feature-desc">
                                Proprietary models trained on your data and business logic — no off-the-shelf compromises.
                            </p>
                        </Card>
                    </BlurReveal>

                    <BlurReveal delay={0.3}>
                        <Card className="feature-card">
                            <h3 className="feature-title">Production-grade scale & reliability</h3>
                            <p className="feature-desc">
                                Cloud-native architecture, autoscaling pipelines, observability, and fault tolerance for high-stakes operations.
                            </p>
                        </Card>
                    </BlurReveal>

                    <BlurReveal delay={0.4}>
                        <Card className="feature-card">
                            <h3 className="feature-title">One view for every decision</h3>
                            <p className="feature-desc">
                                Real-time insights, forecasts, and alerts in a minimal interface that drives action — not noise.
                            </p>
                        </Card>
                    </BlurReveal>
                </div>
            </div>
        </section>
    );
};

export default Features;
