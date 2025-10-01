import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Track page view in Google Analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_title: document.title,
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;