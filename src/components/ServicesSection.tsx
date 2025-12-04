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
      {/* Background */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-radial from-teal/5 to-transparent" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-radial from-gold/5 to-transparent" />

      <div className="container-premium relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block font-heading text-sm uppercase tracking-widest text-gold mb-4"
          >
            Our Services
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-foreground">Solutions That</span>
            <br />
            <span className="text-gradient-gold-teal">Transform</span>
          </motion.h2>
        </div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex p-1.5 rounded-xl glass">
            <button
              onClick={() => setActiveTab("ai")}
              className={cn(
                "px-6 py-3 rounded-lg font-heading text-sm font-medium transition-all duration-300",
                activeTab === "ai"
                  ? "bg-gradient-to-r from-gold to-teal text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              AI Services
            </button>
            <button
              onClick={() => setActiveTab("other")}
              className={cn(
                "px-6 py-3 rounded-lg font-heading text-sm font-medium transition-all duration-300",
                activeTab === "other"
                  ? "bg-gradient-to-r from-gold to-rose text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Tech Services
            </button>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="card-premium p-8 group cursor-pointer h-full"
            >
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/10 via-teal/10 to-rose/10 flex items-center justify-center mb-6 group-hover:from-gold/25 group-hover:via-teal/25 group-hover:to-rose/25 transition-all duration-500">
                  <service.icon className="w-6 h-6 text-gold group-hover:text-gold-light transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                {"subtitle" in service && service.subtitle && (
                  <span className="font-body text-sm text-teal mb-2 block">
                    {service.subtitle as string}
                  </span>
                )}
                <p className="font-body text-muted-foreground leading-relaxed flex-grow">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
