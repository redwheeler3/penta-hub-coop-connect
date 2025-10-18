/**
 * Global type declarations for window object
 */

interface Window {
  gtag?: (
    command: 'event' | 'config' | 'js',
    targetId: string,
    config?: Record<string, string | number | boolean>
  ) => void;
  dataLayer?: Array<Record<string, unknown>>;
}
