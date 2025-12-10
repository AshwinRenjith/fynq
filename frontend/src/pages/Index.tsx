import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProductsSection } from "@/components/ProductsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import ChatRAG from "@/components/ChatRAG";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <WhyChooseSection />
        <ServicesSection />
        <section id="chat" className="section-padding">
          <div className="container-premium">
            <div className="text-center mb-10">
              <p className="font-heading text-sm uppercase tracking-[0.2em] text-muted-foreground/70">Ask Fynq</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">Chat with our knowledge base</h2>
              <p className="font-body text-muted-foreground mt-2">Powered by a local Markdown knowledge file with Gemini for answers.</p>
            </div>
            <ChatRAG />
          </div>
        </section>
        <ProductsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
