import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Bookmark, Brain } from "lucide-react";

const upcomingProducts = [
  {
    icon: GraduationCap,
    name: "fynqAI",
    tagline: "Learn Smarter, Not Harder",
    description: "An AI Tutor Platform & Personalized Studying Companion for students preparing for competitive exams.",
    status: "Coming Soon",
  },
  {
    icon: Bookmark,
    name: "UniBookmark.ai",
    tagline: "Your Knowledge, Organized",
    description: "An Intelligent Bookmarking System that understands, categorizes, and surfaces your saved content when you need it.",
    status: "Coming Soon",
  },
];

const researchProject = {
  icon: Brain,
  name: "The Vanitas Framework",
  tagline: "Multi-LLM Reasoning Excellence",
  description: "A revolutionary Multi-LLM Reasoning Framework designed to eliminate hallucinations and deliver superior answers.",
  features: [
    "Mother LLM acts as Initiator & Judge",
    "Son 1: Empathetic Debate Initiator",
    "Son 2: Logical Critic for balance",
    "Strict 8-turn debate policy for precision",
  ],
};

export const ProductsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" ref={ref} className="section-padding relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <div className="absolute top-1/4 right-0 w-1/4 h-1/4 bg-gradient-radial from-foreground/[0.015] to-transparent" />

      <div className="container-premium relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-block font-heading text-sm uppercase tracking-widest text-muted-foreground mb-4"
          >
            Our Products
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            <span className="text-foreground">Building the</span>
            <br />
            <span className="text-gradient-premium">Future</span>
          </motion.h2>
        </div>

        {/* Upcoming Products - Compact Bento Grid */}
        <div className="mb-20 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h3 className="font-heading text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
              Upcoming Products
            </h3>
          </motion.div>

          <div className="space-y-px bg-border/20 rounded-2xl overflow-hidden">
            {upcomingProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-background"
              >
                <div className="absolute inset-0 bg-foreground/[0.015] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative flex items-center gap-6 p-6 lg:p-8">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl border border-border/40 flex items-center justify-center transition-all duration-500 group-hover:border-foreground/20 group-hover:bg-foreground/[0.02] flex-shrink-0">
                    <product.icon className="w-5 h-5 text-foreground/40 transition-all duration-500 group-hover:text-foreground/70" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-1">
                      <h4 className="font-heading text-xl lg:text-2xl font-bold text-foreground tracking-tight">
                        {product.name}
                      </h4>
                      <span className="hidden sm:inline font-body text-sm text-foreground/40 italic">
                        {product.tagline}
                      </span>
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Status Badge + Arrow */}
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="hidden lg:inline-block px-3 py-1 rounded-full text-[10px] font-heading font-medium tracking-wider uppercase bg-foreground/[0.05] text-muted-foreground/70 border border-border/30">
                      {product.status}
                    </span>
                    <svg 
                      className="w-4 h-4 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-8px] group-hover:translate-x-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* R&D Section - Compact Single Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="mb-8">
            <h3 className="font-heading text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
              Research & Development
            </h3>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-foreground/[0.015] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
            
            <div className="relative border border-border/30 rounded-2xl p-8 lg:p-10 transition-all duration-500 group-hover:border-foreground/15">
              {/* Header Row */}
              <div className="flex items-start gap-6 mb-8 pb-8 border-b border-border/20">
                <div className="w-12 h-12 rounded-xl border border-border/40 flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:border-foreground/20 group-hover:bg-foreground/[0.02]">
                  <researchProject.icon className="w-5 h-5 text-foreground/50 transition-colors duration-500 group-hover:text-foreground/70" />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-2 tracking-tight">
                    {researchProject.name}
                  </h4>
                  <p className="font-body text-sm text-foreground/50 italic">
                    {researchProject.tagline}
                  </p>
                </div>
              </div>

              {/* Two Column Content */}
              <div className="grid lg:grid-cols-[1.3fr,1fr] gap-8 lg:gap-12">
                <div>
                  <p className="font-body text-base text-muted-foreground leading-relaxed">
                    {researchProject.description}
                  </p>
                </div>

                {/* Feature List - Compact */}
                <div className="space-y-3">
                  {researchProject.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.65 + index * 0.07 }}
                      className="flex items-start gap-3 group/item"
                    >
                      <div className="w-1 h-1 rounded-full bg-foreground/20 mt-2 flex-shrink-0 transition-all duration-300 group-hover/item:bg-foreground/40" />
                      <span className="font-body text-sm text-muted-foreground leading-relaxed transition-colors duration-300 group-hover/item:text-foreground">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 mt-8 pt-8 border-t border-border/20 text-sm font-heading text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                <span className="tracking-wide">Explore Framework</span>
                <svg 
                  className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
