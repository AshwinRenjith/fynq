import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { FloatingChat } from "@/components/FloatingChat";
import ColabChat from "@/components/ColabChat";

const queryClient = new QueryClient();

type ChatOpenEventDetail = {
  message?: string;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppShell />
    </TooltipProvider>
  </QueryClientProvider>
);

const AppShell = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [queuedChatMessage, setQueuedChatMessage] = useState<string | undefined>(undefined);

  const openChat = (prefill?: string) => {
    if (prefill && prefill.trim()) setQueuedChatMessage(prefill.trim());
    setChatOpen(true);
  };

  useEffect(() => {
    const handler = (ev: Event) => {
      const detail = (ev as CustomEvent<ChatOpenEventDetail>).detail;
      openChat(detail?.message);
    };

    window.addEventListener("fynq-chat-open", handler as EventListener);
    return () => window.removeEventListener("fynq-chat-open", handler as EventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <FloatingChat visible={!chatOpen} onClick={() => openChat()} />
      <ColabChat
        open={chatOpen}
        onOpenChange={setChatOpen}
        queuedMessage={queuedChatMessage}
        onQueuedMessageConsumed={() => setQueuedChatMessage(undefined)}
      />
    </BrowserRouter>
  );
};

export default App;
