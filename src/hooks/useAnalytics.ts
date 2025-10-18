/**
 * Custom hook for Google Analytics tracking
 * Provides type-safe methods for tracking various user interactions
 */

import { ANALYTICS_EVENTS } from '@/config/constants';

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
    trackEvent(ANALYTICS_EVENTS.CTA_CLICK, {
      button_name: buttonName,
      button_location: buttonLocation,
    });
  };

  const trackNavigation = (destination: string, location: string) => {
    trackEvent(ANALYTICS_EVENTS.NAVIGATION_CLICK, {
      destination,
      location,
    });
  };

  const trackExternalLink = (linkName: string, linkUrl: string) => {
    trackEvent(ANALYTICS_EVENTS.EXTERNAL_LINK_CLICK, {
      link_name: linkName,
      link_url: linkUrl,
    });
  };

  const trackFormStart = (formName: string) => {
    trackEvent(ANALYTICS_EVENTS.FORM_START, {
      form_name: formName,
    });
  };

  const trackFormSubmit = (formName: string) => {
    trackEvent(ANALYTICS_EVENTS.FORM_SUBMIT, {
      form_name: formName,
    });
  };

  const trackFormError = (formName: string, errorType: string) => {
    trackEvent(ANALYTICS_EVENTS.FORM_ERROR, {
      form_name: formName,
      error_type: errorType,
    });
  };

  const trackFormAbandonment = (formName: string) => {
    trackEvent(ANALYTICS_EVENTS.FORM_ABANDONMENT, {
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
