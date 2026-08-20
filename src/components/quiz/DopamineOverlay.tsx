import { ChevronRight, Star } from "lucide-react";
import carlaImg from "@/assets/carla-before-after.jpg.asset.json";
import julianaImg from "@/assets/juliana-before-after.jpg.asset.json";
import fernandaImg from "@/assets/fernanda-before-after.jpg.asset.json";

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
    image: carlaImg.url,
    alt: "Resultado antes e depois do Protocolo Bumbum Granada — Carla, 43 anos",
    transition: "👇 Vamos descobrir o que está travando o seu resultado...",
  },
  2: {
    headline: "🔥 Mais de 3.426 mulheres já comprovaram esse método nos últimos 6 meses.",
    stat: "E o que mais impressiona? 74% delas nunca tinham feito nenhum treino em casa antes.",
    quote:
      "Eu era completamente sedentária e tinha vergonha até de fazer vídeo. Com poucos minutos por dia, em 3 semanas já via a diferença no espelho.",
    author: "— Mariana, 31 anos",
    image: julianaImg.url,
    alt: "Resultado antes e depois do Protocolo Bumbum Granada — Mariana, 31 anos",
    transition: "👇 Falta pouco para montar o seu protocolo...",
  },
  3: {
    headline: "🔥 São mais de 3.426 mulheres que já usaram esse método — e aprovaram.",
    stat: "E o detalhe? 81% delas já tinham desistido de outros métodos antes de tentar esse.",
    quote:
      "Testei academia, dieta, de tudo. Nada tinha destravado tanto o meu corpo quanto esse protocolo em tão pouco tempo.",
    author: "— Fernanda, 27 anos",
    image: fernandaImg.url,
    alt: "Resultado antes e depois do Protocolo Bumbum Granada — Fernanda, 27 anos",
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

        <div className="relative bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm overflow-hidden group shadow-xl">
          <img 
            src={content.image} 
            alt={content.alt}
            className="w-full h-auto object-cover rounded-t-3xl border-b border-white/10"
            loading="lazy"
            width={500}
          />
          
          <div className="p-8 text-left">
            <div className="flex gap-1 text-secondary mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>

            <p className="italic text-lg relative z-10 leading-relaxed text-gray-200">"{content.quote}"</p>
            <p className="mt-4 font-bold text-primary">{content.author}</p>
          </div>

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
