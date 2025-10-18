/**
 * Custom hook for Google Analytics tracking
 * Provides type-safe methods for tracking various user interactions
 */

export const useAnalytics = () => {
  const trackEvent = (
    eventName: string,
    eventParams: Record<string, string | number | boolean> = {}
  ) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, {
        page_location: window.location.href,
        ...eventParams,
      });
    }
  };

  const trackCTA = (buttonName: string, buttonLocation: string) => {
    trackEvent('cta_click', {
      button_name: buttonName,
      button_location: buttonLocation,
    });
  };

  const trackNavigation = (destination: string, location: string) => {
    trackEvent('navigation_click', {
      destination,
      location,
    });
  };

  const trackExternalLink = (linkName: string, linkUrl: string) => {
    trackEvent('external_link_click', {
      link_name: linkName,
      link_url: linkUrl,
    });
  };

  const trackFormStart = (formName: string) => {
    trackEvent('form_start', {
      form_name: formName,
    });
  };

  const trackFormSubmit = (formName: string) => {
    trackEvent('form_submit', {
      form_name: formName,
    });
  };

  const trackFormError = (formName: string, errorType: string) => {
    trackEvent('form_error', {
      form_name: formName,
      error_type: errorType,
    });
  };

  const trackFormAbandonment = (formName: string) => {
    trackEvent('form_abandonment', {
      form_name: formName,
    });
  };

  return {
    trackEvent,
    trackCTA,
    trackNavigation,
    trackExternalLink,
    trackFormStart,
    trackFormSubmit,
    trackFormError,
    trackFormAbandonment,
  };
};
