import React, { useEffect, useRef } from 'react';
import Button from '../components/Button';
import ParallaxSection from '../components/ParallaxSection';
import BlurReveal from '../components/BlurReveal';
import './Hero.css';

const Hero = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!heroRef.current) return;
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;

            heroRef.current.style.setProperty('--mouse-x', `${x}px`);
            heroRef.current.style.setProperty('--mouse-y', `${y}px`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="hero" ref={heroRef}>
            <ParallaxSection speed={0.2} className="hero-blobs">
                <div className="blob blob-1 animate-float"></div>
                <div className="blob blob-2 animate-float" style={{ animationDelay: '-2s' }}></div>
                <div className="blob blob-3 animate-float" style={{ animationDelay: '-4s' }}></div>
            </ParallaxSection>

            <div className="container hero-content">
                <BlurReveal delay={0.1}>
                    <h1 className="hero-title">
                        When Vision <br />
                        <span className="text-gradient">Meets AI</span>
                    </h1>
                </BlurReveal>

                <BlurReveal delay={0.2}>
                    <p className="hero-subtitle">
                        Intelligent systems that replace software — built for measurable impact, enterprise scale, and long-term advantage.
                    </p>
                </BlurReveal>

                <BlurReveal delay={0.3}>
                    <p className="hero-support">
                        Custom AI, automated workflows, and a unified intelligence layer — designed to make your business faster, safer, and more decisive.
                    </p>
                </BlurReveal>

                <BlurReveal delay={0.4}>
                    <div className="hero-actions">
                        <Button variant="primary" onClick={() => window.location.href = '#contact'}>
                            Request a Demo
                        </Button>
                        <Button variant="secondary" onClick={() => window.location.href = '#solutions'}>
                            See Solutions
                        </Button>
                    </div>
                </BlurReveal>

                <BlurReveal delay={0.5}>
                    <p className="hero-trust">
                        Trusted by growth-stage and enterprise teams. Privacy-first. ROI-focused.
                    </p>
                </BlurReveal>
            </div>
        </section>
    );
};

export default Hero;
