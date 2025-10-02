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
import { useLayoutEffect, useRef } from "react";

const queryClient = new QueryClient();

const App = () => {
  const { pathname } = useLocation();
  const prevPathnameRef = useRef<string>('');
  const hasTrackedInitial = useRef(false);

  // Track page views - useLayoutEffect runs synchronously to catch the final router state
  useLayoutEffect(() => {
    // On initial mount, check if there's a hash route
    if (!hasTrackedInitial.current) {
      hasTrackedInitial.current = true;
      
      // If we have a hash (e.g., /#/members), don't track until pathname matches the hash
      const hash = window.location.hash;
      if (hash && hash !== '#/' && hash !== `#${pathname}`) {
        // Skip tracking - router is still settling
        return;
      }
    }

    if (typeof window.gtag !== 'undefined' && prevPathnameRef.current !== pathname) {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_title: document.title,
      });
      prevPathnameRef.current = pathname;
    }
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
