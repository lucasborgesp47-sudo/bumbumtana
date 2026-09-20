import { useEffect } from "react";

const measurementId = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY as string | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function useGA4() {
  useEffect(() => {
    if (!measurementId) return;
    if (document.querySelector("script[data-ga4]")) return;

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    script.setAttribute("data-ga4", "true");
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    const gtag = (...args: unknown[]) => {
      window.dataLayer!.push(args);
    };
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", measurementId);
  }, []);
}

export function trackQuizStep(step: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", step);
  window.fbq?.("trackCustom", step);
}
