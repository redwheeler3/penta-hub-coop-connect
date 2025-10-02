import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import About from "./pages/About";
import Apply from "./pages/Apply";
import Members from "./pages/Members";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const queryClient = new QueryClient();

const App = () => {
  const { pathname } = useLocation();
  const prevPathnameRef = useRef<string>('');

  // Track page views with debounce to avoid tracking intermediate router states
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (typeof window.gtag !== 'undefined' && prevPathnameRef.current !== pathname) {
        window.gtag('event', 'page_view', {
          page_path: pathname,
          page_title: document.title,
        });
        prevPathnameRef.current = pathname;
      }
    }, 100); // Small delay to let router settle

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/members" element={<Members />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
