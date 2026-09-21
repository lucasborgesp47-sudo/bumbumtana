import { useEffect } from "react";

const measurementId = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY"] as
  | string
  | undefined;

const GA_SCRIPT_ID = "ga4-gtag-script";

declare global {
  interface Window {
    dataLayer?: IArguments[] | unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Initializes GA4 once per page load. The queue is created before requesting
 * gtag.js so events fired during script loading are queued rather than lost.
 */
export function useGA4() {
  useEffect(() => {
    if (typeof window === "undefined" || !measurementId) return;

    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer!.push(args);
      };
    }

    // Configure before appending the external script; gtag.js drains dataLayer.
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { send_page_view: true });

    if (!document.getElementById(GA_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = GA_SCRIPT_ID;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      document.head.appendChild(script);
    }
  }, []);
}

/** Sends a GA4 event and preserves the existing Meta custom-event behavior. */
export function trackQuizStep(step: string) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", step);
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", step);
  }
}
