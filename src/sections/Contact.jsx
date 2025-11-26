import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import './Contact.css';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        alert("Thanks — we'll reach out within one business day.");
    };

    return (
        <section className="contact" id="contact">
            <div className="container">
                <div className="contact-wrapper glass-panel">
                    <div className="contact-header">
                        <h2 className="section-title">Ready to transform?</h2>
                        <p className="contact-desc">
                            Book a no-obligation strategy call. We'll audit one workflow and show practical gains you can expect.
                        </p>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <Input label="Name" placeholder="Your name" required />
                            <Input label="Company" placeholder="Company name" required />
                        </div>

                        <div className="form-row">
                            <Input label="Email" type="email" placeholder="work@company.com" required />
                            <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
                        </div>

                        <Input
                            label="Brief"
                            placeholder="Which workflow or outcome are you optimizing? (one sentence)"
                            required
                        />

                        <div className="form-actions">
                            <Button variant="primary" type="submit">
                                Request a Demo
                            </Button>
                            <p className="privacy-note">
                                We respect your data. Submissions are private and processed for engagement only.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
