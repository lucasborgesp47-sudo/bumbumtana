import { useEffect } from "react";

const measurementId = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY"] as
  | string
  | undefined;

const GA_SCRIPT_ID = "ga4-gtag-script";
const GA_INIT_KEY = "__bumbumtanaGa4Initialized";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    [GA_INIT_KEY]?: boolean;
  }
}

/** Ensures gtag calls are queued even before the external library has loaded. */
function ensureGtagQueue() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer!.push(args);
    };
  }
}

/** Initializes GA4 once and queues configuration before loading gtag.js. */
export function useGA4() {
  useEffect(() => {
    if (typeof window === "undefined" || !measurementId) return;
    if (window[GA_INIT_KEY]) return;

    ensureGtagQueue();
    window[GA_INIT_KEY] = true;
    window.gtag!("js", new Date());
    window.gtag!("config", measurementId, { send_page_view: true });

    if (!document.getElementById(GA_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = GA_SCRIPT_ID;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      script.onerror = () => {
        // Allow a later mount to retry if the browser/network failed to load GA.
        window[GA_INIT_KEY] = false;
      };
      document.head.appendChild(script);
    }
  }, []);
}

/** Sends quiz events to GA4 and preserves existing Meta custom events. */
export function trackQuizStep(step: string) {
  if (typeof window === "undefined") return;

  // Never silently drop an event just because the GA4 hook has not run yet.
  ensureGtagQueue();
  window.gtag!("event", step);

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", step);
  }
}
