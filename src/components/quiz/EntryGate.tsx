import { ChevronRight } from "lucide-react";
import antesImg from "@/assets/marianaentryantes.jpg";
import depoisImg from "@/assets/marianaentrydepois.jpg";

interface EntryGateProps {
  onEnter: () => void;
}

/**
 * Primeira tela do funil (quem chega do anúncio).
 * Objetivo único: fazer a pessoa tocar em "começar o teste".
 * - A promessa do anúncio aparece no topo (título), para ela saber que caiu no lugar certo.
 * - O botão fica visível sem rolar, mesmo em celular pequeno (360 x 640).
 * - O texto do botão deixa claro que é um teste gratuito, não uma compra.
 */
export const EntryGate = ({ onEnter }: EntryGateProps) => {
  return (
    <div className="min-h-screen bg-background flex items-start sm:items-center justify-center pt-6 pb-8 px-5 overflow-x-hidden overflow-y-auto">
      <div className="w-full max-w-md mx-auto space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-[26px] leading-tight font-extrabold text-balance">
            Bumbum empinado <span className="text-primary">sem agachamento</span>
          </h1>
          <p className="text-base leading-snug text-muted-foreground text-balance">
            Responda um teste rápido e receba o seu protocolo do{" "}
            <strong className="text-primary">Truque da Virgínia</strong>, para fazer em casa em
            poucos minutos por dia.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <figure className="text-center space-y-1">
            <img
              src={antesImg}
              alt="Mariana antes do Truque da Virgínia"
              className="w-full aspect-[4/5] object-cover rounded-2xl border-2 border-border"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={220}
              height={275}
            />
            <figcaption className="font-bold text-xs uppercase tracking-wide text-muted-foreground">
              Antes
            </figcaption>
          </figure>
          <figure className="text-center space-y-1">
            <img
              src={depoisImg}
              alt="Mariana depois do Truque da Virgínia"
              className="w-full aspect-[4/5] object-cover rounded-2xl border-2 border-primary"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={220}
              height={275}
            />
            <figcaption className="font-bold text-xs uppercase tracking-wide text-primary">
              Depois
            </figcaption>
          </figure>
        </div>

        <button
          onClick={onEnter}
          className="w-full bg-primary hover:bg-primary-hover text-white py-5 px-6 rounded-2xl font-bold text-xl flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-primary/25"
        >
          Fazer meu teste gratuito <ChevronRight className="ml-2" />
        </button>

        <p className="text-center text-sm font-medium text-muted-foreground">
          ⏱️ Leva cerca de 2 minutos · 100% gratuito
        </p>

        <p className="text-center text-sm leading-relaxed">
          Mariana conquistou o bumbum dos seus sonhos em 21 dias com o{" "}
          <strong className="text-primary">Truque da Virgínia</strong>.{" "}
          <strong>SEM AGACHAMENTO.</strong>
        </p>

        <div className="border border-primary/20 bg-primary/5 rounded-xl px-3 py-2 text-center">
          <p className="text-sm text-muted-foreground leading-snug">
            🔥 <span className="font-semibold text-primary">Mais de 2.428 mulheres</span> já
            descobriram o Truque da Virgínia
          </p>
        </div>
      </div>
    </div>
  );
};
