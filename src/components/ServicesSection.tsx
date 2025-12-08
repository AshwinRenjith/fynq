import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  FileText, 
  MessageSquare, 
  Ticket, 
  Users, 
  Phone, 
  Lightbulb,
  Monitor,
  Globe,
  Smartphone,
  Cloud
} from "lucide-react";
import { cn } from "@/lib/utils";

const aiServices = [
  {
    icon: FileText,
    title: "Document Processing",
    description: "We turn your document chaos into instant, clean intelligence—without you lifting a finger.",
  },
  {
    icon: MessageSquare,
    title: "RAG-Based Chatbot",
    description: "Your firm's brain, digitized—an AI that answers with the precision of your top expert.",
  },
  {
    icon: Ticket,
    title: "AI Ticketing System",
    description: "Tickets resolve themselves—our AI detects, routes, and responds before you even log in.",
  },
  {
    icon: Users,
    title: "Customer Hiring Agents",
    description: "Your smartest recruiter—scanning thousands, shortlisting only the ones worth your time.",
  },
  {
    icon: Phone,
    title: "WhatsApp Automation",
    description: "WhatsApp becomes your elite operations team—following up, collecting, and closing loops automatically.",
  },
  {
    icon: Lightbulb,
    title: "AI Consultancy & Strategy",
    description: "Clarity, direction, and strategy—AI that moves your business forward with purpose, not guesswork.",
  },
];

const otherServices = [
  {
    icon: Monitor,
    title: "Software Solutions",
    subtitle: "CRM, ERP, POS",
    description: "Systems that think with you—built to streamline today and scale effortlessly tomorrow.",
  },
  {
    icon: Globe,
    title: "Websites",
    description: "A website that looks elite and performs even sharper—your brand, elevated to its highest version.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Apps that feel natural, respond instantly, and deliver a premium experience every time.",
  },
  {
    icon: Cloud,
    title: "Cloud Migration",
    description: "Your business—reborn in the cloud with zero stress, zero downtime, and full future-readiness.",
  },
];

type TabType = "ai" | "other";

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<TabType>("ai");

  const currentServices = activeTab === "ai" ? aiServices : otherServices;

  return (
    <section id="services" ref={ref} className="section-padding relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <div className="absolute top-1/3 right-0 w-1/4 h-1/4 bg-gradient-radial from-foreground/[0.015] to-transparent" />
      <div className="absolute bottom-1/3 left-0 w-1/4 h-1/4 bg-gradient-radial from-foreground/[0.015] to-transparent" />

      <div className="container-premium relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-block font-heading text-sm uppercase tracking-widest text-muted-foreground mb-4"
          >
            Our Services
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-foreground">Solutions That</span>
            <br />
            <span className="text-gradient-gold-teal">Transform</span>
          </motion.h2>
        </div>

        {/* Minimal Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center mb-16"
        >
          <div className="inline-flex gap-1 border-b border-border/40">
            <button
              onClick={() => setActiveTab("ai")}
              className={cn(
                "px-6 py-3 font-heading text-sm font-medium transition-all duration-300 relative",
                activeTab === "ai"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              AI Services
              {activeTab === "ai" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("other")}
              className={cn(
                "px-6 py-3 font-heading text-sm font-medium transition-all duration-300 relative",
                activeTab === "other"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Tech Services
              {activeTab === "other" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
            </button>
          </div>
        </motion.div>

        {/* Premium Service Grid with Bento-style Layout */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          <div className={cn(
            "grid gap-px bg-border/20 rounded-2xl overflow-hidden",
            activeTab === "ai" 
              ? "md:grid-cols-2 lg:grid-cols-3" 
              : "md:grid-cols-2"
          )}>
            {currentServices.map((service, index) => (
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

                  {/* Subtitle if exists */}
                  {"subtitle" in service && service.subtitle && (
                    <span className="font-body text-xs uppercase tracking-wider text-muted-foreground/70 mb-3 block">
                      {service.subtitle as string}
                    </span>
                  )}

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
        </motion.div>
      </div>
    </section>
  );
};
