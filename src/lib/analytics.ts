import { useEffect } from "react";

// This must be configured in the published app's build environment.
const measurementId = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY"] as
  | string
  | undefined;

const GA_SCRIPT_ID = "ga4-gtag-script";
const GA_INIT_KEY = "__bumbumtanaGa4Initialized";
const GA_READY_KEY = "__bumbumtanaGa4Ready";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    [GA_INIT_KEY]?: boolean;
    [GA_READY_KEY]?: boolean;
  }
}

/** Install the standard gtag queue before issuing any commands. */
function ensureGtagQueue() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    // IMPORTANTE: o gtag.js só processa comandos enfileirados como objeto `arguments`.
    // Usar rest params (`...args`) empurra um Array comum, que o gtag.js ignora —
    // por isso o 'config' nunca era lido e os hits ficavam "adiados".
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    } as (...args: unknown[]) => void;
  }
}

/** Initialize GA4 once. gtag.js processes queued commands after it loads. */
function initializeGA4() {
  if (typeof window === "undefined" || !measurementId) return;

  ensureGtagQueue();
  if (window[GA_INIT_KEY]) return;

  window[GA_INIT_KEY] = true;
  window[GA_READY_KEY] = false;
  window.gtag!("js", new Date());
  // Explicit page_view is sent below so SPA navigation can be measured too.
  window.gtag!("config", measurementId, { send_page_view: false });

  let script = document.getElementById(GA_SCRIPT_ID) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.onload = () => {
      window[GA_READY_KEY] = true;
    };
    script.onerror = () => {
      // Permit a later hook mount to retry after a network/CSP failure.
      window[GA_INIT_KEY] = false;
      window[GA_READY_KEY] = false;
      console.error("[GA4] Não foi possível carregar gtag.js. Verifique bloqueadores, CSP e rede.");
    };
    document.head.appendChild(script);
  }

  // Queue an initial page view after config; it will be processed in order.
  window.gtag!("event", "page_view", {
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
    send_to: measurementId,
  });
}

/** Hook called once from the app root. */
export function useGA4() {
  useEffect(() => {
    initializeGA4();
  }, []);
}

/** Track a virtual page view after client-side navigation. */
export function trackPageView() {
  if (typeof window === "undefined" || !measurementId) return;
  ensureGtagQueue();
  window.gtag!("event", "page_view", {
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
    send_to: measurementId,
  });
}

/** Send quiz events to GA4 and preserve existing Meta custom events. */
export function trackQuizStep(step: string) {
  if (typeof window === "undefined") return;

  ensureGtagQueue();
  if (measurementId) {
    window.gtag!("event", step, { send_to: measurementId });
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", step);
  }
}

/** A safe, non-PII diagnostic event for validating the configured stream. */
export function trackGA4Diagnostic() {
  if (typeof window === "undefined" || !measurementId) return false;
  ensureGtagQueue();
  window.gtag!("event", "ga4_diagnostic_test", {
    send_to: measurementId,
    debug_mode: true,
  });
  return true;
}
