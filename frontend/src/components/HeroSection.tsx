import { motion } from "framer-motion";
import { Sparkles, Plus, Mic, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FloatingChat } from "./FloatingChat";

export const HeroSection = () => {
  const [message, setMessage] = useState("");
  const [showMiniChat, setShowMiniChat] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const threshold = 500;
      setShowMiniChat(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const focusChat = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      const inputEl = formRef.current.querySelector("input");
      if (inputEl instanceof HTMLInputElement) {
        setTimeout(() => inputEl.focus(), 400);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Scroll to the chat section
    const chatSection = document.getElementById("chat");
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Pass the message to ChatRAG via URL hash or event
      setTimeout(() => {
        const chatInput = chatSection.querySelector("input");
        if (chatInput instanceof HTMLInputElement) {
          chatInput.value = message;
          chatInput.focus();
          // Trigger input event so React picks it up
          chatInput.dispatchEvent(new Event("input", { bubbles: true }));
          
          // Trigger the send button click
          const sendButton = chatSection.querySelector("button[type='button']:not([disabled])");
          if (sendButton instanceof HTMLButtonElement) {
            setTimeout(() => sendButton.click(), 100);
          }
        }
      }, 600);
      
      setMessage("");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient noise">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-mesh opacity-60" />
      
      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-rose/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "3s" }} />

      <div className="container-premium relative z-10 px-6 md:px-8 pt-24 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="font-body text-sm text-muted-foreground">
              Redefining Business Intelligence
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6"
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
            className="font-heading text-xl md:text-2xl text-gold font-medium mb-4"
          >
            Work smarter today. Lead the industry tomorrow.
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Our fast, precise AI automations keep your digital twin infrastructure 
            continuously intelligent—amplifying performance at every layer.
          </motion.p>

          {/* Chat CTA */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onSubmit={handleSubmit}
            ref={formRef}
            className="max-w-4xl mx-auto"
          >
            <div className="relative rounded-full border border-border/40 bg-background/90 backdrop-blur-md shadow-[0_15px_45px_-25px_rgba(0,0,0,0.4)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/[0.02] via-transparent to-foreground/[0.02] pointer-events-none" />

              <div className="relative flex items-center gap-4 px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border/50 bg-foreground/[0.02] text-foreground/60">
                  <Plus className="w-5 h-5" />
                </div>

                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything about our services"
                  className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 font-body text-base sm:text-lg text-foreground placeholder:text-muted-foreground/70"
                />

                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full border border-border/40 hover:border-foreground/30 hover:bg-foreground/[0.04] text-foreground/60 hover:text-foreground transition-colors duration-200"
                  >
                    <Mic className="w-5 h-5 mx-auto" />
                  </button>
                  <button
                    type="submit"
                    className="w-10 h-10 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.form>

          {/* Mini Chat Bubble on Scroll */}
          <FloatingChat visible={showMiniChat} onClick={focusChat} />

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
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient-gold-teal mb-1">
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
