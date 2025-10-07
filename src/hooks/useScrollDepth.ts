import { useEffect, useRef } from "react";

export const useScrollDepth = () => {
  const depthTracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const scrollPercent = Math.round((scrolled / documentHeight) * 100);

      // Track at 25%, 50%, 75%, and 100%
      const milestones = [25, 50, 75, 100];
      
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !depthTracked.current.has(milestone)) {
          depthTracked.current.add(milestone);
          
          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'scroll_depth', {
              depth_percentage: milestone,
              page_location: window.location.href,
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};
