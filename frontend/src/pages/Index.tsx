import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { SolutionsSection } from "@/components/SolutionsSection";
import { ProductsSection } from "@/components/ProductsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <WhyChooseSection />
        <SolutionsSection />
        <ProductsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
