/**
 * Application-wide constants and configuration
 */

// Form configuration including field mappings and names
export const FORM_CONFIG = {
  ARE_APPLICATIONS_OPEN: false,
  APPLICATION_FORM_URL: 'https://applications.pentacoop.com/',
  MAILING_LIST_SIGNUP: {
    name: 'Email Signup',
    submitUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfvce57NjEBBI7qx3l7eYCsjAy3j4yMqZVnjbclGOfZ9uDFIw/formResponse',
    fields: {
      EMAIL_ADDRESS: 'emailAddress',
      UNIT_PREFERENCE: 'entry.2074227584',
    },
  },
} as const;

// Analytics event names
export const ANALYTICS_EVENTS = {
  CTA_CLICK: 'cta_click',
  NAVIGATION_CLICK: 'navigation_click',
  EXTERNAL_LINK_CLICK: 'external_link_click',
  FORM_START: 'form_start',
  FORM_SUBMIT: 'form_submit',
  FORM_ERROR: 'form_error',
  FORM_ABANDONMENT: 'form_abandonment',
  INTERNAL_NAVIGATION: 'internal_navigation',
} as const;
