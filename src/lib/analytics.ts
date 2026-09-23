import { useEffect } from "react";

// This must be configured in the published app's build environment.
const measurementId = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY"] as
  | string
  | undefined;

const GA_SCRIPT_ID = "ga4-gtag-script";
const UTM_STORAGE_KEY = "bbg_utms";
// Parâmetros de rastreio repassados ao checkout (UTMify/Kiwify leem utm_*, src e sck).
const TRACKING_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "src",
  "sck",
  "fbclid",
  "gclid",
  "xcod",
];

let lastTrackedPath: string | null = null;

type EventParams = Record<string, string | number | boolean | undefined | unknown[]>;
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
  trackPageView();
}

/** Hook called once from the app root. */
export function useGA4() {
  useEffect(() => {
    captureTrackingParams();
    initializeGA4();
  }, []);
}

/**
 * Track a page view. Called on first load and on every client-side navigation
 * (quiz → /sales). Deduplicated by path so the same page is not counted twice.
 */
export function trackPageView() {
  if (typeof window === "undefined" || !measurementId) return;
  const path = `${window.location.pathname}${window.location.search}`;
  if (path === lastTrackedPath) return;
  lastTrackedPath = path;
  ensureGtagQueue();
  window.gtag!("event", "page_view", {
    page_location: window.location.href,
    page_path: path,
    page_title: document.title,
    send_to: measurementId,
  });
}

/** Send a GA4-only event with parameters (never send name, e-mail, weight or height). */
export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined" || !measurementId) return;
  ensureGtagQueue();
  window.gtag!("event", name, { ...params, send_to: measurementId });
}

/** Meta-only custom event. Keeps the legacy event names used by existing audiences/conversions. */
export function trackMetaCustom(name: string) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", name);
  }
}

/** Remove emojis/símbolos das respostas para relatórios mais limpos no GA4. */
export function cleanAnswer(value: string) {
  return value
    .replace(/\p{Extended_Pictographic}|\u200d|\ufe0f/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100);
}

/** Faixa de IMC (nunca enviar peso/altura exatos). */
export function imcBand(weightKg: number, heightCm: number) {
  if (!weightKg || !heightCm) return "nao_informado";
  const imc = weightKg / Math.pow(heightCm / 100, 2);
  if (!Number.isFinite(imc)) return "nao_informado";
  if (imc < 18.5) return "abaixo";
  if (imc < 25) return "normal";
  if (imc < 30) return "sobrepeso";
  return "obesidade";
}

/** Guarda UTMs da primeira página (a navegação para /sales perde a query string). */
export function captureTrackingParams() {
  if (typeof window === "undefined") return;
  try {
    const current = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const key of TRACKING_PARAMS) {
      const value = current.get(key);
      if (value) found[key] = value;
    }
    if (Object.keys(found).length > 0) {
      window.localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(found));
    }
  } catch {
    // storage indisponível (aba anônima restrita): segue sem persistir
  }
}

/** Anexa as UTMs salvas ao link do checkout sem sobrescrever parâmetros já existentes. */
export function withTrackingParams(url: string) {
  if (typeof window === "undefined") return url;
  try {
    const target = new URL(url);
    const saved = JSON.parse(window.localStorage.getItem(UTM_STORAGE_KEY) || "{}") as Record<
      string,
      string
    >;
    const current = new URLSearchParams(window.location.search);
    for (const key of TRACKING_PARAMS) {
      const value = current.get(key) || saved[key];
      if (value && !target.searchParams.has(key)) target.searchParams.set(key, value);
    }
    return target.toString();
  } catch {
    return url;
  }
}

/** Send an event to GA4 (with optional params) and the same name to Meta. */
export function trackQuizStep(step: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;

  trackEvent(step, params);
  trackMetaCustom(step);
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
