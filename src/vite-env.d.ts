/// <reference types="vite/client" />

interface Window {
  gtag?: (command: string, targetId: string, config?: Record<string, string | number | boolean>) => void;
  dataLayer?: Array<Record<string, unknown>>;
}
