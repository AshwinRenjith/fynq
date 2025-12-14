import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Gauge, Settings, Shield, RefreshCw } from "lucide-react";

const reasons = [
  { icon: Target, title: "Agentic automation", description: "Executes end-to-end workflows with minimal oversight" },
  { icon: Gauge, title: "Context-aware RAG", description: "Delivers precise, firm-trained answers" },
  { icon: Settings, title: "Custom workflows", description: "Built around your practice and processes" },
  { icon: Shield, title: "Secure, reliable deployment", description: "Enterprise-ready infrastructure and controls" },
  { icon: RefreshCw, title: "Systems that improve", description: "Intelligence that learns and adapts over time" },
];

export const WhyChooseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-1/2 left-0 w-1/3 h-1/3 bg-gradient-radial from-foreground/[0.02] to-transparent" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-foreground/[0.02] to-transparent" />

      <div className="container-premium relative z-10 px-6 md:px-8 py-16 md:py-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-block font-heading text-sm uppercase tracking-widest text-muted-foreground mb-4"
          >
            Why Choose Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-foreground">Effortless Intelligence</span>
            <br />
            <span className="text-gradient-gold-rose">for Professionals</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="font-body text-lg text-muted-foreground leading-relaxed"
          >
            Our Edge
            
            Agentic automation that executes end-to-end
            
            Context-aware RAG for precise answers
            
            Custom workflows built around your practice
            
            Secure, reliable deployment
            
            Systems that improve over time
          </motion.p>
        </div>

        {/* Premium Minimalist List */}
        <div className="max-w-4xl mx-auto space-y-1">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.08, ease: "easeOut" }}
              className="group relative"
            >
              {/* Hover Background */}
              <div className="absolute inset-0 bg-foreground/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

              <div className="relative flex items-start gap-6 py-8 px-6 border-b border-border/30 last:border-b-0 transition-all duration-300 group-hover:px-8">
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-full border border-border/40 flex items-center justify-center transition-all duration-300 group-hover:border-foreground/20 group-hover:bg-foreground/[0.03]">
                    <reason.icon className="w-5 h-5 text-muted-foreground transition-colors duration-300 group-hover:text-foreground" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-foreground">
                    {reason.title}
                  </h3>
                  <p className="font-body text-base text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                {/* Subtle Arrow Indicator */}
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-0">
                  <svg
                    className="w-5 h-5 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto mt-16 pt-12 border-t border-border/20"
        >
          <p className="text-center font-body text-base text-muted-foreground">
            Choose Fynq for solutions that feel{" "}
            <span className="text-foreground font-medium">premium</span>, perform{" "}
            <span className="text-foreground font-medium">flawlessly</span>, and deliver{" "}
            <span className="text-foreground font-medium">measurable impact</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
