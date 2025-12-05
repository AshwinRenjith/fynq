import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BlurReveal from './components/BlurReveal';
import Hero from './sections/Hero';
import ValueProp from './sections/ValueProp';
import Features from './sections/Features';
import Solutions from './sections/Solutions';
import HowItWorks from './sections/HowItWorks';
import Outcomes from './sections/Outcomes';
import Security from './sections/Security';
import Pricing from './sections/Pricing';
import About from './sections/About';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';

function App() {
  const sections = [
    { key: 'hero', Component: Hero, delay: 0 },
    { key: 'value-prop', Component: ValueProp, delay: 0.05 },
    { key: 'features', Component: Features, delay: 0.1 },
    { key: 'solutions', Component: Solutions, delay: 0.15 },
    { key: 'how-it-works', Component: HowItWorks, delay: 0.2 },
    { key: 'outcomes', Component: Outcomes, delay: 0.25 },
    { key: 'security', Component: Security, delay: 0.3 },
    { key: 'pricing', Component: Pricing, delay: 0.35 },
    { key: 'about', Component: About, delay: 0.4 },
    { key: 'faq', Component: FAQ, delay: 0.45 },
    { key: 'contact', Component: Contact, delay: 0.5 },
  ];

  return (
    <HelmetProvider>
      <div className="app">
        <SEO
          title="fynq — When Vision Meets AI | Enterprise AI Systems"
          description="fynq builds bespoke AI systems that replace legacy software with intelligent, scalable automation. Precision engineering. Measurable outcomes. Request a demo."
          ogTitle="fynq — When Vision Meets AI"
          ogDescription="Custom AI systems and automation that scale. Trusted by enterprises for secure, measurable transformation."
        />

        <Navbar />

        <main>
          {sections.map(({ key, Component, delay }) => (
            <BlurReveal key={key} delay={delay}>
              <Component />
            </BlurReveal>
          ))}
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
