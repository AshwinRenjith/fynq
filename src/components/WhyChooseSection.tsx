import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Gauge, Settings, Shield, RefreshCw } from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Refined AI Automation",
    description: "Brings clarity, speed, and accuracy to your operations",
  },
  {
    icon: Gauge,
    title: "High-Fidelity Digital Twins",
    description: "Engineered for deep insight, precision, and scale",
  },
  {
    icon: Settings,
    title: "Tailor-Made Solutions",
    description: "Designed around your workflows—not the other way around",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Reliability",
    description: "Seamless integration and trusted performance",
  },
  {
    icon: RefreshCw,
    title: "Continuously Intelligent",
    description: "Systems built to evolve with your business",
  },
];

export const WhyChooseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden bg-card/30">
      {/* Background */}
      <div className="absolute inset-0 bg-mesh opacity-40" />
      
      <div className="container-premium relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-block font-heading text-sm uppercase tracking-widest text-teal mb-4"
          >
            Why Choose Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-foreground">Because Intelligence</span>
            <br />
            <span className="text-gradient-gold-rose">Should Feel Effortless</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="font-body text-lg text-muted-foreground leading-relaxed"
          >
            We blend advanced AI with thoughtful design and precise engineering 
            to build automation that elevates your business—without adding complexity.
          </motion.p>
        </div>

        {/* Reason Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
          {reasons.slice(0, 3).map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.1, ease: "easeOut" }}
              className="card-premium p-8 group cursor-pointer"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/10 to-rose/10 flex items-center justify-center mb-6 group-hover:from-gold/20 group-hover:to-rose/20 transition-all duration-500">
                  <reason.icon className="w-7 h-7 text-gold group-hover:text-gold-light transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-gold transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Two Cards - Centered */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {reasons.slice(3, 5).map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: 0.5 + index * 0.1, ease: "easeOut" }}
              className="card-premium p-8 group cursor-pointer"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/10 to-rose/10 flex items-center justify-center mb-6 group-hover:from-gold/20 group-hover:to-rose/20 transition-all duration-500">
                  <reason.icon className="w-7 h-7 text-gold group-hover:text-gold-light transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-gold transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
          className="text-center font-body text-lg text-muted-foreground mt-32 max-w-2xl mx-auto"
        >
          Choose Fynq for solutions that feel{" "}
          <span className="text-gold font-medium">premium</span>, perform{" "}
          <span className="text-teal font-medium">flawlessly</span>, and deliver{" "}
          <span className="text-rose font-medium">measurable impact</span>—today and tomorrow.
        </motion.p>
      </div>
    </section>
  );
};
