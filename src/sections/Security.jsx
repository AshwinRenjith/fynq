import React from 'react';
import './Security.css';

const Security = () => {
    return (
        <section className="security">
            <div className="container">
                <div className="security-content">
                    <h2 className="section-title">Security, privacy, and governance built-in</h2>

                    <ul className="security-list">
                        <li className="security-item">End-to-end encryption and role-based access</li>
                        <li className="security-item">Audit logs and explainability for model decisions</li>
                        <li className="security-item">Compliance-ready architecture (SOC2 / ISO / industry-specific options)</li>
                        <li className="security-item">Data residency and on-prem / hybrid deployment options</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Security;
