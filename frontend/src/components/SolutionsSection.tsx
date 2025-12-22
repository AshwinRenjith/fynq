import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Database,
  MessageSquare,
  FileText,
  Shield,
  TrendingUp
} from "lucide-react";

const services = [
  { icon: Database, title: "Centralized Knowledge Base", description: "Ingests documents in any format and creates a single, searchable source of truth for your firm." },
  { icon: MessageSquare, title: "Contextual Question Answering", description: "Understands intent, references multiple documents, and delivers accurate, explainable answers grounded in your data." },
  { icon: FileText, title: "Document Intelligence", description: "Automatically extracts key information, summaries, and structured insights from complex documents." },
  { icon: Shield, title: "Access Control & Security", description: "Role-based permissions, audit trails, and secure deployment models built for regulated environments." },
  { icon: TrendingUp, title: "Continuous Learning", description: "The platform improves as new documents, updates, and firm knowledge are added—capturing institutional expertise over time." },
];

export const SolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="section-padding relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <div className="absolute top-1/3 right-0 w-1/4 h-1/4 bg-gradient-radial from-foreground/[0.015] to-transparent" />
      <div className="absolute bottom-1/3 left-0 w-1/4 h-1/4 bg-gradient-radial from-foreground/[0.015] to-transparent" />

      <div className="container-premium relative z-10 px-6 md:px-8 py-16 md:py-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-block font-heading text-sm uppercase tracking-widest text-muted-foreground mb-4"
          >
            Our Solutions
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-gradient-gold-teal">From Documents to Decisions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="font-body text-lg text-muted-foreground leading-relaxed"
          >
            A unified AI knowledge and automation platform designed to capture, organize, and activate your firm's intelligence.
          </motion.p>
        </div>

        {/* Premium Service Grid with Bento-style Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-6xl mx-auto space-y-px"
        >
          {/* Top Row - 3 Cards */}
          <div className="grid gap-px bg-border/20 rounded-t-2xl overflow-hidden md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.05, ease: "easeOut" }}
                className="group relative bg-background p-8 transition-all duration-500 hover:bg-foreground/[0.02]"
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon with Subtle Border */}
                  <div className="mb-6 inline-flex">
                    <div className="w-12 h-12 rounded-xl border border-border/40 flex items-center justify-center transition-all duration-500 group-hover:border-foreground/20 group-hover:bg-foreground/[0.03]">
                      <service.icon className="w-5 h-5 text-foreground/60 transition-all duration-500 group-hover:text-foreground group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-sm text-muted-foreground leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  {/* Minimal Arrow Indicator */}
                  <div className="mt-6 flex items-center gap-2 text-muted-foreground/40 group-hover:text-foreground/60 transition-all duration-300">
                    <div className="h-px flex-1 bg-current transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    <svg
                      className="w-4 h-4 transform translate-x-[-8px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
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

          {/* Bottom Row - 2 Cards Centered */}
          <div className="flex justify-center">
            <div className="grid gap-px bg-border/20 rounded-b-2xl overflow-hidden md:grid-cols-2 w-full lg:w-2/3">
              {services.slice(3, 5).map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 + index * 0.05, ease: "easeOut" }}
                  className="group relative bg-background p-8 transition-all duration-500 hover:bg-foreground/[0.02]"
                >
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon with Subtle Border */}
                    <div className="mb-6 inline-flex">
                      <div className="w-12 h-12 rounded-xl border border-border/40 flex items-center justify-center transition-all duration-500 group-hover:border-foreground/20 group-hover:bg-foreground/[0.03]">
                        <service.icon className="w-5 h-5 text-foreground/60 transition-all duration-500 group-hover:text-foreground group-hover:scale-110" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2 transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-sm text-muted-foreground leading-relaxed flex-grow">
                      {service.description}
                    </p>

                    {/* Minimal Arrow Indicator */}
                    <div className="mt-6 flex items-center gap-2 text-muted-foreground/40 group-hover:text-foreground/60 transition-all duration-300">
                      <div className="h-px flex-1 bg-current transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      <svg
                        className="w-4 h-4 transform translate-x-[-8px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};
