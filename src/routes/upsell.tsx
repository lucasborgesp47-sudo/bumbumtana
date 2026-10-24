import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Zap, Timer, TrendingUp, Gift, Shield, MessageCircle, ArrowDown } from "lucide-react";
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
import { UPSELL, KIWIFY_SNIPPET_UPSELL, FALLBACK_CHECKOUT_UPSELL } from "../lib/upsell-config";

export const Route = createFileRoute("/upsell")({
  head: () => ({
    meta: [
      { title: "Seu acesso está sendo liberado — Truque do Bumbum na Nuca" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: UpsellPage,
});

/*
 * Copy: Fórmula Upsell (9 passos)
 * 1 Parabéns · 2 Pode existir um problema · 3 Demanda · 4 Novo produto · 5 Explicação rápida
 * 6 Bônus · 7 Escassez/ancoragem/urgência · 8 Garantia · 9 Futuro dela agora
 * Tipo de upsell: impaciência (resultado mais rápido).
 */
function UpsellPage() {
  const name = useBuyerName();
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackEvent("upsell_view", { value: UPSELL.priceValue, currency: "BRL" });
  }, []);

  const scrollToOffer = () => {
    trackEvent("upsell_cta_topo");
    document.getElementById("oferta")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)] font-sans overflow-x-hidden">
      <PostPurchaseProgress step={2} />

      {/* 1. PARABÉNS */}
      <section className="px-5 pt-8 pb-6 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <p className="text-sm font-bold uppercase tracking-widest text-[var(--brand)]">
            Espera{name ? `, ${name}` : ""}! Não feche esta página
          </p>
          <h1 className="text-[28px] leading-[1.15] font-extrabold tracking-tight">
            Sua compra foi aprovada e seu acesso já está a caminho do seu e-mail
          </h1>
          <p className="text-base text-[var(--ink-2)] leading-relaxed">
            Antes de você começar o primeiro treino, tem uma coisa sobre o seu resultado que eu
            preciso te contar. Leva menos de 2 minutos.
          </p>
        </div>
      </section>

      {/* 2. PODE EXISTIR UM PROBLEMA */}
      <Section tone="soft">
        <h2 className="text-2xl font-bold leading-tight">
          O protocolo funciona. Mas existe uma coisa que pode deixar o seu resultado mais lento.
        </h2>
        <p className="text-[var(--ink-2)] leading-relaxed">
          O Truque do Bumbum na Nuca foi montado para <strong>1 sessão de 20 minutos por dia</strong>. É o
          suficiente para o seu glúteo começar a responder.
        </p>
        <p className="text-[var(--ink-2)] leading-relaxed">
          O ponto é que, com um único estímulo por dia, você evolui no ritmo do protocolo. E a
          maioria das mulheres quer ver diferença <strong>antes</strong>: antes do verão, de uma
          viagem, de uma festa, antes de desanimar.
        </p>
      </Section>

      {/* 3. DEMANDA */}
      <Section>
        <p className="text-[var(--ink-2)] leading-relaxed">
          Se você é como a maioria das mulheres que começa o protocolo, a primeira pergunta que vem
          na cabeça é esta:
        </p>
        <div className="flex gap-3 items-start bg-[var(--surface-2)] border border-[var(--line)] rounded-2xl p-4">
          <MessageCircle className="text-[var(--brand)] shrink-0 mt-0.5" size={22} />
          <p className="text-[17px] font-bold leading-snug">Dá pra acelerar?</p>
        </div>
        <p className="text-[var(--ink-2)] leading-relaxed">
          Dá. E foi pensando exatamente nisso que a gente montou um complemento para quem não quer
          esperar.
        </p>
      </Section>

      {/* 4. NOVO PRODUTO */}
      <section className="px-5 py-10 bg-[var(--ink)] text-white text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sm font-bold">
            <Zap size={14} fill="currentColor" /> Complemento oficial do protocolo
          </div>
          <h2 className="text-[30px] font-black leading-tight">{UPSELL.name}</h2>
          <p className="opacity-85 leading-relaxed">
            O complemento para quem quer <strong>acelerar</strong> o resultado do protocolo que você
            acabou de garantir, sem precisar de academia e sem treinar mais de 15 minutos extras por
            dia.
          </p>
          <button
            onClick={scrollToOffer}
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-soft)] underline underline-offset-4"
          >
            Ver a condição desta página <ArrowDown size={16} />
          </button>
        </div>
      </section>

      {/* 5. EXPLICAÇÃO RÁPIDA */}
      <Section>
        <h2 className="text-2xl font-bold text-center">Funciona em 2 passos simples</h2>
        {[
          {
            icon: <Zap size={20} />,
            title: "Ativação Profunda — 3 minutos",
            desc: "Uma sequência curta antes de cada treino para “acordar” o glúteo. Assim o estímulo vai para o lugar certo desde a primeira repetição, em vez de escapar para a coxa e a lombar.",
          },
          {
            icon: <Timer size={20} />,
            title: "Sessão Turbo — 10 minutos",
            desc: "Um segundo estímulo curto no dia, em outro horário, sem repetir o treino principal. É o que dá ritmo ao resultado.",
          },
        ].map((item, i) => (
          <div
            key={item.title}
            className="flex gap-4 bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-4 shadow-sm"
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
        <DemoStrip />
        <p className="text-sm text-[var(--ink-2)] text-center">
          Fica tudo no mesmo app do seu protocolo. Sem baixar nada novo.
        </p>
      </Section>

      {/* 6. BÔNUS */}
      <Section tone="soft">
        <div className="flex items-center gap-2 text-[var(--brand)] font-bold uppercase text-sm tracking-wide">
          <Gift size={18} /> Bônus só para quem leva hoje
        </div>
        <div className="bg-[var(--surface)] border-2 border-dashed border-[var(--brand)] rounded-2xl p-5 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-bold text-lg leading-tight flex items-center gap-2">
              <TrendingUp size={20} className="text-[var(--brand)] shrink-0" /> Fase 2: 30 dias de
              progressão
            </h3>
            <span className="text-sm text-[var(--ink-2)] line-through whitespace-nowrap">
              R$ 47
            </span>
          </div>
          <p className="text-sm text-[var(--ink-2)] leading-relaxed">
            O que fazer depois dos 21 dias para continuar evoluindo e não estagnar. É aqui que a
            maioria para de ver diferença, e é aqui que você vai continuar.
          </p>
        </div>
      </Section>

      {/* 7–9. OFERTA, GARANTIA, FUTURO */}
      <section id="oferta" className="px-5 py-10 scroll-mt-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* 9. Futuro dela agora */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold leading-tight">Imagine as próximas semanas…</h2>
            <p className="text-[var(--ink-2)] leading-relaxed">
              De manhã, os 20 minutos do protocolo. À noite, 10 minutos de Turbo enquanto a novela
              começa. Na primeira semana você já sente o glúteo trabalhando de verdade. Algumas
              semanas depois, aquela calça jeans veste diferente e você se pega olhando de lado no
              espelho.
            </p>
          </div>

          {/* 7. Ancoragem / escassez / urgência */}
          <div className="border-[3px] border-[var(--brand)] rounded-[28px] p-6 text-center space-y-4 shadow-2xl shadow-[var(--brand)]/15">
            <p className="text-sm text-[var(--ink-2)] leading-relaxed">
              Separado, o {UPSELL.name} sairia por{" "}
              <span className="line-through">R$ {UPSELL.anchor}</span>. E valeria cada centavo. Mas
              você acabou de confiar no nosso trabalho, então{" "}
              <strong className="text-[var(--ink)]">só nesta página</strong> você leva tudo, com a
              Fase 2 de bônus, por:
            </p>
            <div className="text-[44px] font-black text-[var(--brand)] leading-none">
              R$ {UPSELL.price}
            </div>
            <p className="text-xs font-semibold text-[var(--ink-2)]">
              Pagamento único. Se você pagou no cartão, é 1 clique: sem digitar nada de novo.
            </p>

            <KiwifyOfferButtons
              snippet={KIWIFY_SNIPPET_UPSELL}
              fallbackCheckout={FALLBACK_CHECKOUT_UPSELL}
              stage="upsell"
              value={UPSELL.priceValue}
              acceptLabel="SIM, QUERO ACELERAR MEU RESULTADO"
              acceptSubLabel={`Adicionar o Turbo por R$ ${UPSELL.price}`}
              declineLabel="Não, obrigada. Prefiro seguir no ritmo normal."
              onDecline={() => goToStep("/downsell")}
            />

            <p className="text-[12px] text-[var(--ink-2)]">
              ⚠️ Esta condição aparece só agora. Se você sair desta página, ela não volta.
            </p>
          </div>

          {/* 8. Garantia (cashback) */}
          <div className="flex gap-4 items-start bg-[var(--ok)]/5 border border-[var(--ok)]/40 rounded-2xl p-4">
            <Shield className="text-[var(--ok)] shrink-0" size={32} />
            <p className="text-sm text-[var(--ink-2)] leading-relaxed">
              <strong className="text-[var(--ok)]">Risco zero:</strong> você tem 7 dias para testar
              o Turbo. Se não gostar, pede o reembolso direto na Kiwify, pelo link do e-mail da
              compra, e devolvemos 100% do valor dele. Sem precisar falar com ninguém.
            </p>
          </div>
        </div>
      </section>

      <Disclaimer />
    </div>
  );
}
