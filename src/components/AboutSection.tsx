import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Copy, Wrench, Shield, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    description: "Refined AI automation that brings clarity and speed to your operations",
  },
  {
    icon: Copy,
    description: "High-fidelity digital twins designed for accuracy, insight, and scale",
  },
  {
    icon: Wrench,
    description: "Tailored solutions crafted around your workflows, not the other way around",
  },
  {
    icon: Shield,
    description: "Enterprise-grade reliability with seamless integration and trusted performance",
  },
  {
    icon: TrendingUp,
    description: "A future-ready approach that keeps your systems continuously intelligent",
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
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="inline-block font-heading text-sm uppercase tracking-widest text-gold mb-4"
            >
              About Us
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="text-foreground">Redefining How</span>
              <br />
              <span className="text-gradient-gold-teal">Businesses Operate</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="font-body text-lg text-muted-foreground leading-relaxed mb-6"
            >
              Fynq Solutions is a modern AI technology company focused on redefining 
              how businesses operate. We merge advanced automation, digital twin 
              intelligence, and refined engineering to build systems that feel 
              effortless yet exceptionally powerful.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="font-body text-lg text-muted-foreground leading-relaxed mb-8"
            >
              Our platforms bring clarity, speed, and precision to everyday 
              workflows—helping teams make smarter decisions, accelerate delivery, 
              and stay ahead in an evolving world.
            </motion.p>
          </div>

          {/* Feature Timeline */}
          <div className="relative mt-16">
            {/* Vertical Line */}
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="absolute left-7 top-0 w-px bg-gradient-to-b from-gold/50 via-teal/50 to-gold/20"
            />

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
                  animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.7, delay: 0.4 + index * 0.15, ease: "easeOut" }}
                  className="relative flex items-start gap-6 group"
                >
                  {/* Icon Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-background border-2 border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:shadow-glow-gold transition-all duration-300">
                      <feature.icon className="w-5 h-5 text-gold group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-3">
                    <p className="font-body text-base text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Centered Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }}
          className="mt-20 text-center"
        >
          <p className="font-heading text-xl text-gold italic">
            "At Fynq, we believe innovation should feel seamless."
          </p>
        </motion.div>
      </div>
    </section>
  );
};
