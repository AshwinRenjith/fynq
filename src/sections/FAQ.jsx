import React from 'react';
import './FAQ.css';

const FAQ = () => {
    const faqs = [
        {
            q: 'Do you use off-the-shelf models?',
            a: 'Only when they accelerate value — otherwise we deliver custom models tuned to your business.'
        },
        {
            q: 'How long before we see results?',
            a: 'Typical proof-of-value runs deliver measurable outcomes in 6–12 weeks depending on scope.'
        },
        {
            q: 'How do you handle data security?',
            a: 'Encrypted pipelines, strict access controls, audit logging, and compliance best practices on every project.'
        },
        {
            q: 'Do you integrate with my stack?',
            a: 'Yes. We integrate with common ERPs, CRMs, data lakes and message buses — or deploy side-by-side.'
        }
    ];

    return (
        <section className="faq">
            <div className="container">
                <div className="faq-grid">
                    {faqs.map((item, index) => (
                        <div key={index} className="faq-item">
                            <h3 className="faq-question">{item.q}</h3>
                            <p className="faq-answer">{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
