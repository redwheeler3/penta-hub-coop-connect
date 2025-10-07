import { useEffect, useRef } from "react";

export const useTimeOnPage = () => {
  const startTime = useRef<number>(Date.now());
  const tracked30s = useRef(false);
  const tracked60s = useRef(false);

  useEffect(() => {
    const checkTimeOnPage = () => {
      const timeElapsed = Math.floor((Date.now() - startTime.current) / 1000);

      // Track at 30 seconds
      if (timeElapsed >= 30 && !tracked30s.current) {
        tracked30s.current = true;
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'time_on_page', {
            duration_seconds: 30,
            page_location: window.location.href,
          });
        }
      }

      // Track at 60 seconds
      if (timeElapsed >= 60 && !tracked60s.current) {
        tracked60s.current = true;
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'time_on_page', {
            duration_seconds: 60,
            page_location: window.location.href,
          });
        }
      }
    };

    const interval = setInterval(checkTimeOnPage, 1000);
    return () => clearInterval(interval);
  }, []);
};
