import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePageTitle = (title: string) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Set the document title
    document.title = title;

    // Track the page view with gtag
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_title: title,
      });
    }
  }, [title, pathname]);
};
