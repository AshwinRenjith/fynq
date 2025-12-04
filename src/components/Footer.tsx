import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  services: [
    { name: "AI Services", href: "#services" },
    { name: "Tech Solutions", href: "#services" },
    { name: "Consulting", href: "#services" },
  ],
  products: [
    { name: "fynqAI", href: "#products" },
    { name: "UniBookmark.ai", href: "#products" },
    { name: "Vanitas Framework", href: "#products" },
  ],
  company: [
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ],
};

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-border/50">
      {/* Background */}
      <div className="absolute inset-0 bg-card/30" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-radial from-gold/5 to-transparent" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-teal/5 to-transparent" />

      <div className="container-premium relative z-10 py-16 px-6 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block mb-6">
              <span className="font-display text-3xl font-bold text-gradient-gold-teal">
                Fynq
              </span>
              <span className="font-heading text-lg text-muted-foreground ml-2">
                Solutions
              </span>
            </a>
            <p className="font-body text-muted-foreground leading-relaxed max-w-sm mb-6">
              When vision meets AI. Redefining how businesses operate with 
              advanced automation and digital twin intelligence.
            </p>
            <p className="font-body text-sm text-muted-foreground/60">
              Innovation should feel seamless.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-widest text-gold mb-6">
              Services
            </h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-body text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-widest text-teal mb-6">
              Products
            </h4>
            <ul className="space-y-4">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-body text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-widest text-rose mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-body text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fynq Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
