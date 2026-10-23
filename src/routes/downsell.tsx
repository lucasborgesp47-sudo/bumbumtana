import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Zap, Timer, Check, X } from "lucide-react";
import { trackEvent } from "../lib/analytics";
import { KiwifyOfferButtons } from "../components/upsell/KiwifyOfferButtons";
import { DemoStrip } from "../components/upsell/DemoStrip";
import {
  useBuyerName,
  goToStep,
  PostPurchaseProgress,
  Section,
  Disclaimer,
} from "../components/upsell/PostPurchase";
import {
  DOWNSELL,
  UPSELL,
  KIWIFY_SNIPPET_DOWNSELL,
  FALLBACK_CHECKOUT_DOWNSELL,
} from "../lib/upsell-config";

export const Route = createFileRoute("/downsell")({
  head: () => ({
    meta: [
      { title: "Uma última condição — Truque da Virgínia" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DownsellPage,
});

/*
 * Copy: Fórmula Downsell (4 passos)
 * 1 Te entendo (interrupção) · 2 Mas sei que é importante (futuro sem o produto)
 * 3 Por isso fiz esse desconto (versão menor, preço menor) · 4 Agora esse vai ser seu futuro
 */
function DownsellPage() {
  const name = useBuyerName();
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackEvent("downsell_view", { value: DOWNSELL.priceValue, currency: "BRL" });
  }, []);

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)] font-sans overflow-x-hidden">
      <PostPurchaseProgress step={2} />

      {/* 1. TE ENTENDO */}
      <section className="px-5 pt-8 pb-6 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <p className="text-sm font-bold uppercase tracking-widest text-[var(--brand)]">
            Tudo bem{name ? `, ${name}` : ""}. Só mais um minuto
          </p>
          <h1 className="text-[28px] leading-[1.15] font-extrabold tracking-tight">
            Eu entendo. Talvez R$&nbsp;{UPSELL.price} agora não caiba no seu momento.
          </h1>
          <p className="text-base text-[var(--ink-2)] leading-relaxed">
            Seu acesso ao Truque da Virgínia continua garantido. Antes de ir, deixa eu te mostrar
            uma última condição, mais leve.
          </p>
        </div>
      </section>

      {/* 2. MAS SEI QUE É IMPORTANTE */}
      <Section tone="soft">
        <h2 className="text-2xl font-bold leading-tight">Mas pensa comigo um instante</h2>
        <p className="text-[var(--ink-2)] leading-relaxed">
          Você já decidiu cuidar do seu bumbum. Vai treinar de qualquer jeito. A diferença está em{" "}
          <strong>para onde vai o estímulo</strong> de cada treino.
        </p>
        <p className="text-[var(--ink-2)] leading-relaxed">
          Sem ativar o glúteo antes, parte do esforço escapa para a coxa e a lombar. É um dos
          motivos de quem treina direitinho e não vê o bumbum mudar. Seria uma pena fazer tudo certo
          e evoluir mais devagar do que poderia.
        </p>
        <DemoStrip compact />
      </Section>

      {/* 3. POR ISSO FIZ ESSE DESCONTO */}
      <Section>
        <h2 className="text-2xl font-bold leading-tight text-center">
          Por isso, separei só o essencial do Turbo para você
        </h2>
        <div className="border-[3px] border-[var(--brand)] rounded-[28px] p-6 space-y-5 shadow-2xl shadow-[var(--brand)]/15">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-black">{DOWNSELL.name}</h3>
            <p className="text-sm text-[var(--ink-2)]">
              Os 2 passos do Turbo, sem o bônus da Fase 2
            </p>
          </div>

          <ul className="space-y-3">
            {[
              {
                ok: true,
                icon: <Zap size={16} />,
                text: "Ativação Profunda: 3 minutos antes de cada treino",
              },
              {
                ok: true,
                icon: <Timer size={16} />,
                text: "Sessão Turbo: 10 minutos de segundo estímulo no dia",
              },
              {
                ok: false,
                icon: <X size={16} />,
                text: "Fase 2: 30 dias de progressão (fica de fora)",
              },
            ].map((item) => (
              <li key={item.text} className="flex gap-3 items-start">
                <span
                  className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    item.ok
                      ? "bg-[var(--ok)]/15 text-[var(--ok)]"
                      : "bg-[var(--line)] text-[var(--ink-2)]"
                  }`}
                >
                  {item.ok ? <Check size={14} strokeWidth={3} /> : item.icon}
                </span>
                <span
                  className={`text-sm leading-snug ${item.ok ? "" : "text-[var(--ink-2)] line-through"}`}
                >
                  {item.text}
                </span>
              </li>
            ))}
          </ul>

          <div className="text-center space-y-1">
            <div className="text-sm text-[var(--ink-2)]">
              O Turbo completo sai por R$ {UPSELL.price}. Esta versão essencial, sem a Fase 2:
            </div>
            <div className="text-[44px] font-black text-[var(--brand)] leading-none">
              R$ {DOWNSELL.price}
            </div>
            <p className="text-xs font-semibold text-[var(--ink-2)]">
              Pagamento único. Esta versão só aparece aqui.
            </p>
          </div>

          {/* 4. AGORA ESSE VAI SER SEU FUTURO */}
          <p className="text-[15px] text-[var(--ink-2)] leading-relaxed text-center">
            Imagina daqui a 21 dias: cada treino indo direto para o glúteo, e você sentindo a
            diferença no espelho e na roupa, pelo preço de um lanche.
          </p>

          <KiwifyOfferButtons
            snippet={KIWIFY_SNIPPET_DOWNSELL}
            fallbackCheckout={FALLBACK_CHECKOUT_DOWNSELL}
            stage="downsell"
            value={DOWNSELL.priceValue}
            acceptLabel="SIM, QUERO O TURBO ESSENCIAL"
            acceptSubLabel={`Adicionar por R$ ${DOWNSELL.price}`}
            declineLabel="Não, quero seguir só com o protocolo."
            onDecline={() => goToStep("/obrigado")}
          />
        </div>
      </Section>

      <Disclaimer />
    </div>
  );
}
