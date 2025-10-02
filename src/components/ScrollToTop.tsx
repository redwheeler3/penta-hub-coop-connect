import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathnameRef = useRef<string | null>(null);
  const isInitialMount = useRef(true);

  // Initialize ref on first render without tracking
  useEffect(() => {
    if (isInitialMount.current) {
      prevPathnameRef.current = pathname;
      isInitialMount.current = false;
      
      // Track initial page view
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'page_view', {
          page_path: pathname,
          page_title: document.title,
        });
      }
    }
  }, []);

  // Track subsequent navigation changes
  useEffect(() => {
    if (!isInitialMount.current) {
      window.scrollTo(0, 0);
      
      if (typeof window.gtag !== 'undefined' && prevPathnameRef.current !== pathname) {
        window.gtag('event', 'page_view', {
          page_path: pathname,
          page_title: document.title,
        });
        prevPathnameRef.current = pathname;
      }
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;