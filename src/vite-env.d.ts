/// <reference types="vite/client" />

interface Window {
  gtag?: (command: string, targetId: string, config?: Record<string, any>) => void;
  dataLayer?: any[];
}
