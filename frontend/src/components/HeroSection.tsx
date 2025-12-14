import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient noise">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-mesh opacity-60" />

      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-rose/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "3s" }} />

      <div className="container-premium relative z-10 px-6 md:px-8 py-16 md:py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-foreground" />
            <span className="font-body text-sm text-muted-foreground">
              Precision AI for CA & Legal Teams
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight md:leading-[1.1] mb-6"
          >
            <span className="text-foreground">When Vision</span>
            <br />
            <span className="text-gradient-premium">Meets AI</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="font-heading text-xl md:text-2xl text-muted-foreground font-medium mb-4"
          >
            Professional intelligence, automated.
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            We build agentic AI systems, RAG assistants, and workflow automations that handle
            documents, decisions, and operations with accuracy your practice can trust.
            Work smarter. Move faster. Stay ahead.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {[
              { value: "99.9%", label: "Uptime" },
              { value: "10x", label: "Faster Delivery" },
              { value: "87%", label: "Automation Coverage" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient-premium mb-1">
                  {stat.value}
                </div>
                <div className="font-body text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
