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
    headline: "🔥 Mais de 2.428 mulheres já descobriram o Truque da Virgínia",
    stat: "E o mais impressionante? boa parte delas tinha mais de 35 anos e achava que já era tarde demais.",
    quote:
      "Pensei que meu bumbum nunca mais levantaria depois dos 40. Parei de agachar, usei o Truque da Virgínia por 20 min em casa. Em 21 dias, minha calça jeans subiu dois números.",
    author: "Carla, 43 anos — parou de agachar",
    image: carlaImg.url,
    alt: "Resultado antes e depois do Protocolo Bumbum Tanajura — Carla, 43 anos",
    transition: "👇 Vamos descobrir por que o agachamento não funcionou para você...",
  },
  2: {
    headline: "🔥 Mais de 2.428 mulheres pararam de agachar e começaram a usar o Truque",
    stat: "E o que mais impressiona? muitas delas nunca tinham feito nenhum treino em casa antes.",
    quote:
      "Eu era completamente sedentária. Fazia agachamento e só engrossava a coxa. Com o Truque da Virgínia em casa, em 3 semanas o bumbum subiu.",
    author: "Mariana, 31 anos — ex-viciada em agachamento",
    image: julianaImg.url,
    alt: "Resultado antes e depois do Protocolo Bumbum Tanajura — Mariana, 31 anos",
    transition: "👇 Falta pouco para montar o seu Protocolo Bumbum Tanajura...",
  },
  3: {
    headline: "Mais de 2.428 mulheres sentiram exatamente isso antes de descobrir o Truque da Virgínia",
    stat: "Mais de 2.428 mulheres já passaram por essa mesma sensação antes de encontrar esse método.",
    quote:
      "Testei academia, agachamento, dieta, de tudo. Só engrossava a coxa. O Truque da Virgínia destravou meu bumbum em 21 dias — sem pisar na academia.",
    author: "Fernanda, 27 anos — ex-frequentadora de academia",
    image: fernandaImg.url,
    alt: "Resultado antes e depois do Protocolo Bumbum Tanajura — Fernanda, 27 anos",
    transition: "👇 Agora vamos calibrar o Truque da Virgínia para o seu corpo...",
  },
} as const;

const HIGHLIGHT_PHRASES = ["Mais de 2.428 mulheres", "Truque da Virgínia"];
const HIGHLIGHT_PATTERN = new RegExp(
  `(${HIGHLIGHT_PHRASES.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  "g"
);

const highlightText = (text: string) =>
  text.split(HIGHLIGHT_PATTERN).map((part, i) =>
    HIGHLIGHT_PHRASES.includes(part) ? (
      <span key={i} className="text-primary font-bold">
        {part}
      </span>
    ) : (
      part
    )
  );

export const DopamineOverlay = ({ onContinue, type }: DopamineProps) => {
  const content = VARIANTS[type] ?? VARIANTS[1];

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A2E] text-white p-6 flex flex-col justify-start overflow-y-auto animate-in fade-in duration-300">
      <div className="max-w-md mx-auto w-full text-center space-y-8 py-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold leading-tight">{highlightText(content.headline)}</h2>
          <p className="text-gray-400 text-lg">{highlightText(content.stat)}</p>
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

            <p className="italic text-lg relative z-10 leading-relaxed text-gray-200">"{highlightText(content.quote)}"</p>
            <p className="mt-4 font-bold text-primary">{content.author}</p>
          </div>

          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-700" />
        </div>

        <div className="space-y-6">
          <p className="text-xl font-medium">{highlightText(content.transition)}</p>

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
