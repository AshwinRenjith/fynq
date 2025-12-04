import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Bookmark, Brain, Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const upcomingProducts = [
  {
    icon: GraduationCap,
    name: "fynqAI",
    tagline: "Learn Smarter, Not Harder",
    description: "An AI Tutor Platform & Personalized Studying Companion for students preparing for competitive exams.",
    gradient: "from-gold to-teal",
    status: "Coming Soon",
  },
  {
    icon: Bookmark,
    name: "UniBookmark.ai",
    tagline: "Your Knowledge, Organized",
    description: "An Intelligent Bookmarking System that understands, categorizes, and surfaces your saved content when you need it.",
    gradient: "from-teal to-rose",
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
  gradient: "from-rose via-gold to-teal",
};

export const ProductsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" ref={ref} className="section-padding relative overflow-hidden bg-card/20">
      {/* Background */}
      <div className="absolute inset-0 bg-mesh opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container-premium relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block font-heading text-sm uppercase tracking-widest text-rose mb-4"
          >
            Our Products
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-foreground">Building the</span>
            <br />
            <span className="text-gradient-premium">Future</span>
          </motion.h2>
        </div>

        {/* Upcoming Products */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading text-sm uppercase tracking-widest text-muted-foreground mb-8 flex items-center gap-3"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            Upcoming Products
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-8">
            {upcomingProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                className="relative group"
              >
                {/* Gradient Border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                
                <div className="card-premium p-8 relative h-full">
                  <div className="relative z-10">
                    {/* Status Badge */}
                    <div className="absolute top-0 right-0">
                      <span className="px-3 py-1 rounded-full text-xs font-heading font-medium bg-gold/10 text-gold border border-gold/20">
                        {product.status}
                      </span>
                    </div>

                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.gradient} p-px mb-6`}>
                      <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                        <product.icon className="w-7 h-7 text-gold" />
                      </div>
                    </div>

                    <h4 className="font-heading text-2xl font-bold text-foreground mb-2">
                      {product.name}
                    </h4>
                    <p className="font-body text-gold mb-4">{product.tagline}</p>
                    <p className="font-body text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* R&D Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative"
        >
          <h3 className="font-heading text-sm uppercase tracking-widest text-muted-foreground mb-8 flex items-center gap-3">
            <Brain className="w-4 h-4 text-teal" />
            Research & Development
          </h3>

          <div className="relative group">
            {/* Animated Gradient Border */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-rose via-gold to-teal opacity-50 group-hover:opacity-100 blur-sm transition-opacity duration-700" />
            
            <div className="relative rounded-3xl bg-card p-8 md:p-12 border border-border/50">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${researchProject.gradient} p-px`}>
                      <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                        <researchProject.icon className="w-8 h-8 text-gradient-premium" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-heading text-2xl md:text-3xl font-bold text-gradient-premium">
                        {researchProject.name}
                      </h4>
                      <p className="font-body text-muted-foreground">
                        {researchProject.tagline}
                      </p>
                    </div>
                  </div>
                  <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
                    {researchProject.description}
                  </p>
                  <Button variant="premium-outline" className="group/btn">
                    Learn More
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {researchProject.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/30"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gold to-teal" />
                      <span className="font-body text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
