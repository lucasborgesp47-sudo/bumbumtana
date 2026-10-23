import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { CheckCircle2, Mail, Smartphone, Play } from "lucide-react";
import { trackEvent } from "../lib/analytics";
import { useBuyerName, PostPurchaseProgress, Disclaimer } from "../components/upsell/PostPurchase";
import { SUPPORT_EMAIL } from "../lib/upsell-config";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Acesso liberado — Truque da Virgínia" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ObrigadoPage,
});

function ObrigadoPage() {
  const name = useBuyerName();
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackEvent("obrigado_view");
  }, []);

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)] font-sans overflow-x-hidden">
      <PostPurchaseProgress step={3} />

      <section className="px-5 pt-10 pb-8 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <CheckCircle2 size={56} className="mx-auto text-[var(--ok)]" />
          <h1 className="text-[28px] leading-[1.15] font-extrabold tracking-tight">
            Tudo certo{name ? `, ${name}` : ""}! Seu acesso foi liberado
          </h1>
          <p className="text-base text-[var(--ink-2)] leading-relaxed">
            Você vai receber o acesso no e-mail que usou na compra em até 2 minutos.
          </p>
        </div>
      </section>

      <section className="px-5 pb-10">
        <div className="max-w-md mx-auto space-y-3">
          {[
            {
              icon: <Mail size={20} />,
              title: "Abra o e-mail da Kiwify",
              desc: "Não chegou? Confira as abas Promoções e Spam.",
            },
            {
              icon: <Smartphone size={20} />,
              title: "Coloque o app na tela inicial",
              desc: "Abra o link no celular e toque em “Adicionar à tela inicial”. Fica como um aplicativo.",
            },
            {
              icon: <Play size={20} />,
              title: "Faça o primeiro treino hoje",
              desc: "São 20 minutos. Quem começa no mesmo dia tem muito mais chance de seguir até o fim.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="flex gap-4 bg-[var(--surface-2)] border border-[var(--line)] rounded-2xl p-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold">
                  {i + 1}. {item.title}
                </h3>
                <p className="text-sm text-[var(--ink-2)] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
          <p className="text-sm text-[var(--ink-2)] text-center pt-4">
            Qualquer dúvida:{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="underline font-semibold">
              {SUPPORT_EMAIL}
            </a>
          </p>
        </div>
      </section>

      <Disclaimer />
    </div>
  );
}
