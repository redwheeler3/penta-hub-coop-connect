import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Track page view in Google Analytics only if pathname actually changed
    if (typeof window.gtag !== 'undefined' && prevPathnameRef.current !== pathname) {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_title: document.title,
      });
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;