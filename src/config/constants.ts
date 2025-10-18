/**
 * Application-wide constants and configuration
 */

// Application configuration
export const APP_CONFIG = {
  APPLICATIONS_OPEN: false,
  GOOGLE_FORM_URL: 'https://applications.pentacoop.com/',
  GOOGLE_FORM_RESPONSE_URL: 'https://docs.google.com/forms/d/e/1FAIpQLSfvce57NjEBBI7qx3l7eYCsjAy3j4yMqZVnjbclGOfZ9uDFIw/formResponse',
} as const;

// External links
export const EXTERNAL_LINKS = {
  DESIGNER_WEBSITE: 'https://www.jeffo.net',
  POINT_GREY_GUIDE: 'https://govancity.com/neighbourhoods/point-grey/',
  CHF_BC: 'https://www.chf.bc.ca',
  CHF_CANADA: 'https://chfcanada.coop',
} as const;

// Co-op information
export const COOP_INFO = {
  NAME: 'Penta Housing Co-Op',
  ESTABLISHED_YEAR: 1978,
  NUMBER_OF_FAMILIES: 22,
} as const;

// Form field names for Google Forms integration
export const FORM_FIELDS = {
  EMAIL: 'emailAddress',
  BEDROOM_PREFERENCE: 'entry.2074227584',
} as const;

// Bedroom preference mappings
export const BEDROOM_PREFERENCES = {
  ONE_BEDROOM: {
    id: '1-bedroom',
    label: '1 bedroom - 1 or 2 adults',
    formValue: '1 bedroom (1 or 2 adults)',
  },
  TWO_BEDROOM: {
    id: '2-bedroom',
    label: '2 bedroom - 1 or 2 adults PLUS 1 or more children under 18',
    formValue: '2 bedroom (1 or 2 adults PLUS 1 or more children under 18)',
  },
  THREE_BEDROOM: {
    id: '3-bedroom',
    label: '3 bedroom - 1 or 2 adults PLUS 2 or more children under 18',
    formValue: '3 bedroom (1 or 2 adults PLUS 2 or more children under 18)',
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

// Form names for analytics
export const FORM_NAMES = {
  EMAIL_SIGNUP: 'Email Signup',
} as const;
