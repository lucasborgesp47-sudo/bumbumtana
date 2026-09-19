import { useEffect } from "react";

const UTMIFY_PIXEL_ID = "6aaf10ea7cb4ebd4fe2ec332";
const UTMIFY_SCRIPT_URL = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";

let injected = false;

/**
 * Injeta o pixel da Utmify uma única vez (async/defer),
 * mesmo com re-renders ou remontagens do componente.
 */
export function useUtmifyPixel() {
  useEffect(() => {
    if (injected || typeof window === "undefined") return;
    injected = true;

    (window as any).pixelId = UTMIFY_PIXEL_ID;

    const script = document.createElement("script");
    script.src = UTMIFY_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);
}
