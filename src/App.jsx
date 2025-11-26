import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
          <Hero />
          <ValueProp />
          <Features />
          <Solutions />
          <HowItWorks />
          <Outcomes />
          <Security />
          <Pricing />
          <About />
          <FAQ />
          <Contact />
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
