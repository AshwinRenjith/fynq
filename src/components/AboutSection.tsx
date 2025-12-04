import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Layers, Zap } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Advanced Automation",
    description: "AI-powered systems that think and adapt",
  },
  {
    icon: Layers,
    title: "Digital Twin Intelligence",
    description: "Mirror your operations with precision",
  },
  {
    icon: Zap,
    title: "Refined Engineering",
    description: "Built for speed and reliability",
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-gold/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-teal/5 to-transparent" />

      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block font-heading text-sm uppercase tracking-widest text-gold mb-4"
            >
              About Us
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="text-foreground">Redefining How</span>
              <br />
              <span className="text-gradient-gold-teal">Businesses Operate</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-lg text-muted-foreground leading-relaxed mb-6"
            >
              Fynq Solutions is a modern AI technology company focused on redefining 
              how businesses operate. We merge advanced automation, digital twin 
              intelligence, and refined engineering to build systems that feel 
              effortless yet exceptionally powerful.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-lg text-muted-foreground leading-relaxed mb-8"
            >
              Our platforms bring clarity, speed, and precision to everyday 
              workflows—helping teams make smarter decisions, accelerate delivery, 
              and stay ahead in an evolving world.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-heading text-xl text-gold italic"
            >
              "At Fynq, we believe innovation should feel seamless."
            </motion.p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="card-premium p-6 group cursor-pointer"
              >
                <div className="relative z-10 flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-gold/20 to-teal/20 flex items-center justify-center group-hover:from-gold/30 group-hover:to-teal/30 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-gold transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="font-body text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
