import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { createPortal } from "react-dom";

type Props = {
  visible: boolean;
  onClick: () => void;
};

export const FloatingChat = ({ visible, onClick }: Props) => {
  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          onClick={onClick}
          id="ask-fynq-button"
          aria-label="Ask Fynq"
          className="fixed bottom-6 right-4 sm:right-6 z-[999999] flex items-center gap-2 px-4 py-3 rounded-full bg-foreground text-background shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="font-heading text-sm">Ask Fynq</span>
        </motion.button>
      )}
    </>,
    document.body
  );
};
