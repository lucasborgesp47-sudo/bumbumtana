import { ChevronRight, Star } from "lucide-react";

interface DopamineProps {
  onContinue: () => void;
  type: 1 | 2 | 3;
}

const VARIANTS = {
  1: {
    headline: "🔥 MAIS DE 3.426 MULHERES já usaram esse método nos últimos 6 meses.",
    stat: "E o mais impressionante? 68% delas tinham mais de 35 anos e achavam que já era tarde demais.",
    quote:
      "Pensei que meu bumbum nunca mais levantaria depois dos 40. Em 21 dias usando o app, minha calça jeans ficou dois números mais folgada.",
    author: "— Carla, 43 anos",
    transition: "👇 Vamos descobrir o que está travando o seu resultado...",
  },
  2: {
    headline: "💪 MAIS DE 2.180 MULHERES já sentiram a diferença nos primeiros 7 dias.",
    stat: "E o mais surpreendente? 74% delas nunca tinham feito nenhum treino em casa antes.",
    quote:
      "Eu era completamente sedentária e tinha vergonha até de fazer vídeo. Com poucos minutos por dia, em 3 semanas já via a diferença no espelho.",
    author: "— Juliana, 31 anos",
    transition: "👇 Falta pouco para montar o seu protocolo...",
  },
  3: {
    headline: "✨ MAIS DE 1.590 MULHERES concluíram os 21 dias completos.",
    stat: "E olha só: 81% relataram glúteos mais firmes já na segunda semana.",
    quote:
      "Tenho dois filhos e zero tempo. Fazia o treino enquanto o café passava. Nunca imaginei que tão pouco tempo mudaria tanto o meu corpo.",
    author: "— Patrícia, 37 anos",
    transition: "👇 Agora vamos calibrar a intensidade ideal para você...",
  },
} as const;

export const DopamineOverlay = ({ onContinue, type }: DopamineProps) => {
  const content = VARIANTS[type] ?? VARIANTS[1];

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A2E] text-white p-6 flex flex-col justify-start overflow-y-auto animate-in fade-in duration-300">
      <div className="max-w-md mx-auto w-full text-center space-y-8 py-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold leading-tight">{content.headline}</h2>
          <p className="text-gray-400 text-lg">{content.stat}</p>
        </div>

        <div className="relative bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm overflow-hidden group">
          <div className="absolute top-0 right-0 p-4">
            <div className="flex gap-1 text-secondary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
          </div>

          <p className="italic text-lg relative z-10 leading-relaxed">"{content.quote}"</p>
          <p className="mt-4 font-bold text-primary">{content.author}</p>

          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-700" />
        </div>

        <div className="space-y-6">
          <p className="text-xl font-medium">{content.transition}</p>

          <button
            onClick={onContinue}
            className="w-full bg-primary hover:bg-primary-hover text-white py-5 px-8 rounded-2xl font-bold text-xl flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-primary/25"
          >
            Continuar <ChevronRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
