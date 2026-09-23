import { ChevronRight } from "lucide-react";
import antesImg from "@/assets/marianaentryantes.jpg";
import depoisImg from "@/assets/marianaentrydepois.jpg";

interface EntryGateProps {
  onEnter: () => void;
}

export const EntryGate = ({ onEnter }: EntryGateProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-6 overflow-x-hidden overflow-y-auto">
      <div className="w-full max-w-md mx-auto space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-500 text-white text-center py-3 px-2 rounded-xl">
            <span className="block font-bold text-lg leading-tight">SEM</span>
            <span className="block text-sm leading-tight">Truque da Virgínia</span>
          </div>
          <div className="bg-primary text-white text-center py-3 px-2 rounded-xl">
            <span className="block font-bold text-lg leading-tight">COM</span>
            <span className="block text-sm leading-tight">Truque da Virgínia</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="text-center space-y-2">
            <img
              src={antesImg}
              alt="Mariana antes do Truque da Virgínia"
              className="w-full aspect-[3/4] object-cover rounded-2xl border-2 border-border"
              loading="lazy"
              width={220}
            />
            <p className="font-bold text-sm uppercase tracking-wide">Antes</p>
          </div>
          <div className="text-center space-y-2">
            <img
              src={depoisImg}
              alt="Mariana depois do Truque da Virgínia"
              className="w-full aspect-[3/4] object-cover rounded-2xl border-2 border-border"
              loading="lazy"
              width={220}
            />
            <p className="font-bold text-sm uppercase tracking-wide">Depois</p>
          </div>
        </div>

        <p className="text-center text-base leading-relaxed">
          Mariana conquistou o bumbum dos seus sonhos em apenas 4 semanas com o{" "}
          <strong className="text-primary">Truque da Virgínia</strong>. <strong>SEM AGACHAMENTO.</strong>
        </p>

        <div className="border border-primary/20 bg-primary/5 rounded-xl px-3 py-2 text-center">
          <p className="text-sm text-muted-foreground leading-snug">
            🔥 <span className="font-semibold text-primary">Mais de 2.428 mulheres</span> já descobriram o Truque da
            Virgínia
          </p>
        </div>

        <button
          onClick={onEnter}
          className="w-full bg-primary hover:bg-primary-hover text-white py-5 px-8 rounded-2xl font-bold text-xl flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-primary/25"
        >
          Obter Truque da Virgínia Agora <ChevronRight className="ml-2" />
        </button>

        <p className="text-center text-sm font-medium text-muted-foreground">
          ⏱️ Teste gratuito · leva cerca de 2 minutos
        </p>
      </div>
    </div>
  );
};
