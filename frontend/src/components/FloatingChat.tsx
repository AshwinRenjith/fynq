import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { createPortal } from "react-dom";

type Props = {
  visible: boolean;
  onClick: () => void;
};

export const FloatingChat = ({ visible, onClick }: Props) => {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
          onClick={onClick}
          id="ask-fynq-button"
          aria-label="Ask AI"
          className="fixed bottom-6 left-[47%] -translate-x-1/2 z-[999999] w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.6)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-7 h-7 fill-white/20" />
          <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
        </motion.button>
      )}
    </AnimatePresence>,
    document.body
  );
};
