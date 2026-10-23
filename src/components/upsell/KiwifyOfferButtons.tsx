import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { trackEvent, trackMetaCustom, withTrackingParams } from "../../lib/analytics";

type Props = {
  /** HTML gerado pelo gerador de upsell da Kiwify. Vazio = modo reserva. */
  snippet: string;
  /** Checkout normal do produto, usado só no modo reserva. */
  fallbackCheckout: string;
  acceptLabel: string;
  acceptSubLabel?: string;
  declineLabel: string;
  /** Prefixo dos eventos: "upsell" ou "downsell". */
  stage: "upsell" | "downsell";
  value: number;
  /** Próximo passo quando a pessoa recusa (modo reserva). */
  onDecline: () => void;
};

/**
 * Botões de aceite/recusa da oferta pós-compra.
 * - Com snippet da Kiwify: injeta o HTML oficial (cobrança em 1 clique no cartão salvo)
 *   e só escuta os cliques para medir aceite/recusa.
 * - Sem snippet: mostra botões próprios (aceite → checkout normal, recusa → próximo passo).
 * Renderize UMA vez por página: a Kiwify identifica os botões por ID.
 */
export function KiwifyOfferButtons({
  snippet,
  fallbackCheckout,
  acceptLabel,
  acceptSubLabel,
  declineLabel,
  stage,
  value,
  onDecline,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasSnippet = snippet.trim().length > 0;

  const trackAccept = () => {
    trackEvent(`${stage}_aceite_clique`, { value, currency: "BRL" });
    trackMetaCustom(`${stage}_aceite_clique`);
  };
  const trackDecline = () => {
    trackEvent(`${stage}_recusa`, { value, currency: "BRL" });
    trackMetaCustom(`${stage}_recusa`);
  };

  // Injeta o snippet oficial e executa os <script> que vierem nele.
  useEffect(() => {
    const el = containerRef.current;
    if (!hasSnippet || !el) return;
    el.innerHTML = snippet;
    el.querySelectorAll("script").forEach((old) => {
      const s = document.createElement("script");
      for (const attr of Array.from(old.attributes)) s.setAttribute(attr.name, attr.value);
      s.text = old.text;
      old.replaceWith(s);
    });

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[id^='kiwify-upsell-cancel-trigger']")) trackDecline();
      else if (target.closest("[id^='kiwify-upsell-trigger']")) trackAccept();
    };
    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snippet, hasSnippet]);

  if (hasSnippet) {
    return <div ref={containerRef} className="kiwify-offer w-full" />;
  }

  const handleAccept = () => {
    trackAccept();
    if (!fallbackCheckout) {
      console.warn(
        `[${stage}] Configure o snippet da Kiwify ou o link de checkout em upsell-config.ts`,
      );
      return;
    }
    window.location.href = withTrackingParams(fallbackCheckout);
  };

  const handleDecline = () => {
    trackDecline();
    onDecline();
  };

  return (
    <div className="w-full space-y-4">
      <button
        onClick={handleAccept}
        className="w-full bg-[var(--ok)] text-white py-5 px-4 rounded-2xl font-extrabold text-lg leading-tight shadow-lg shadow-[var(--ok)]/30 active:scale-95 transition-all flex flex-col items-center justify-center gap-1"
      >
        <span className="flex items-center gap-2">
          {acceptLabel}
          <ArrowRight size={20} />
        </span>
        {acceptSubLabel && (
          <span className="text-[13px] font-semibold opacity-90">{acceptSubLabel}</span>
        )}
      </button>
      <button
        onClick={handleDecline}
        className="w-full text-center text-sm text-[var(--ink-2)] underline underline-offset-2 py-2"
      >
        {declineLabel}
      </button>
    </div>
  );
}
