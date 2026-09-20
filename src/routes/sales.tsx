import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { trackQuizStep } from "../lib/analytics";
import { 
  Shield, 
  ChevronRight, 
  CheckCircle2, 
  Zap, 
  Clock, 
  Smartphone, 
  Users, 
  ArrowRight,
  HelpCircle,
  Menu,
  Heart,
  Layout,
  PlayCircle,
  CreditCard,
  Landmark,
  Wallet,
  X
} from "lucide-react";
import { useLoadingBar } from "../components/ui/LoadingBar";
import mockup1 from "@/assets/capa-bumbum-granada.jpg";
import mockup2 from "@/assets/bumbum-granada.jpg";
import mockup3 from "@/assets/mapa-da-silhueta.jpg";
import resultHero from "@/assets/result-hero.jpeg.asset.json"; import photoCarla from "@/assets/testimonialcarla.jpg"; import photoMariana from "@/assets/testimonialmariana.jpg"; import photoFernanda from "@/assets/testimonialfernanda.jpg";

export const Route = createFileRoute("/sales")({
  component: SalesPage,
});

// TODO: substituir pela URL real do produto na Kiwify quando estiver criado
const CHECKOUT_URL_REGULAR = "https://pay.kiwify.com.br/JJb9YhU"; const CHECKOUT_URL_EXPIRED = "https://pay.kiwify.com.br/H8e9SxG";

function SalesPage() {
  const navigate = useNavigate();
  const { start, finish } = useLoadingBar();
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(0); // 15:00
  const [isExpired, setIsExpired] = useState(false);
  
  // Quiz data (obrigatório: sem quiz respondido, volta para o início)
  const [quizData, setQuizData] = useState<{name?: string, objective?: string}>(() => {
    return {};
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bbg_quiz_data');
      if (saved) {
        setQuizData(JSON.parse(saved));
      }
    }
  }, []);

  const [hasCheckedQuiz, setHasCheckedQuiz] = useState(false);

  useEffect(() => {
    const hasData = Boolean(quizData?.name && quizData?.objective);
    if (!hasData && hasCheckedQuiz) {
      navigate({ to: "/" });
    }
    setHasCheckedQuiz(true);
  }, [quizData, navigate, hasCheckedQuiz]);

  useEffect(() => {
    const timerStartKey = 'oferta_inicio';
    const DURATION = 900; // 15 mins
    const now = Math.floor(Date.now() / 1000);
    
    let startTime = parseInt(localStorage.getItem(timerStartKey) || '0');
    
    if (!startTime) {
      startTime = now;
      localStorage.setItem(timerStartKey, startTime.toString());
    }
    
    const elapsed = now - startTime;
    const remaining = Math.max(0, DURATION - elapsed);
    
    if (remaining === 0) {
      setIsExpired(true);
    }
    
    setTimeLeft(remaining);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePurchase = () => {
    trackQuizStep("clique_checkout");
    start();
    const checkoutLink = `${isExpired ? CHECKOUT_URL_EXPIRED : CHECKOUT_URL_REGULAR}`;

    setTimeout(() => {
      finish();
      window.location.href = checkoutLink;
    }, 800);
  };

  const currentPrice = isExpired ? "99,90" : "29,90";
  const anchorPrice = "188"; const discountPercent = isExpired ? "47" : "84";

  if (!hasCheckedQuiz || !quizData?.name) return null;

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)] font-sans overflow-x-hidden selection:bg-[var(--brand-soft)] selection:text-[var(--brand)]">
      
      {/* SECTION 1: DIAGNÓSTICO PERSONALIZADO */}
      <section className="px-5 py-12 md:px-6 md:py-[72px] text-center max-w-2xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] font-bold text-sm">
          <Zap size={14} fill="currentColor" />
          <span>PROTOCOLO 100% PERSONALIZADO</span>
        </div>
        
        <h1 className="text-[32px] leading-[1.15] font-extrabold tracking-tight text-[var(--ink)]">
          Seu protocolo está pronto, {quizData.name || "Guerreira"}
        </h1>
        
        <p className="text-base leading-relaxed text-[var(--ink-2)] text-balance">
          Pelas suas respostas, seu principal ponto de atenção é a <span className="text-[var(--brand)] font-bold">ativação do glúteo</span>. Por isso, ajustamos seu protocolo para trabalhar o glúteo de forma mais direcionada, sem exigir horas de academia.
        </p>

        <div className="max-w-md mx-auto">
          <img 
            src={resultHero.url} 
            alt="Resultado real do Protocolo Bumbum Tanajura" 
            className="w-full rounded-3xl shadow-xl shadow-[var(--brand)]/10 border border-[var(--line)]"
            loading="eager"
            width={500}
            height={500}
          />
        </div>

        <div className="space-y-6">
          {/* Real Timer */}
          <div className="bg-[var(--brand)] text-white border-2 border-white/20 rounded-2xl p-4 inline-block w-full max-w-[280px] shadow-2xl shadow-[var(--brand)]/40">
            {!isExpired ? (
              <>
                <div className="flex items-center justify-center gap-2 text-[13px] font-semibold uppercase mb-1 opacity-90">
                  <Clock size={14} /> Oferta expira em:
                </div>
                <div className="text-[40px] font-extrabold leading-none">
                  {formatTime(timeLeft)}
                </div>
                <div className="mt-2 space-y-1">
                  <div className="text-sm font-bold opacity-75 line-through">
                    De R$ 99,90 por
                  </div>
                  <div className="text-[13px] font-bold text-white animate-pulse">
                    R$ 29,90
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-1">
                <div className="text-[13px] font-bold uppercase tracking-wide">
                  ⚠️ Oferta especial encerrada
                </div>
                <div className="text-[13px] font-semibold opacity-90 mt-1">
                  O preço promocional de R$ 29,90 terminou.
                </div>
                <div className="text-[26px] font-extrabold leading-none mt-2">
                  Agora: R$ 99,90
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={handlePurchase}
            className="w-full bg-[var(--brand)] text-white py-5 rounded-2xl font-extrabold text-lg shadow-lg shadow-[var(--brand)]/30 active:scale-95 transition-all flex items-center justify-center gap-2 group max-w-md mx-auto"
          >
            QUERO ATIVAR MEU GLÚTEO — R$ {currentPrice}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* SECTION 2: O QUE TRAVA O RESULTADO */}
      <section className="px-5 py-12 bg-[var(--brand-soft)] md:px-6 md:py-[72px] text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold max-w-2xl mx-auto leading-tight">
            Não é falta de esforço. É isso que está travando seu resultado.
          </h2>
          <p className="text-base md:text-lg text-[var(--ink-2)] max-w-xl mx-auto -mt-4">
            Você pode estar direcionando o estímulo para o lugar errado.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            { emoji: "⏰", title: "Rotina sobrecarregada", desc: "Você não precisa de 1 hora. O estímulo certo acontece em minutos." },
            { emoji: "🍑", title: "Treinos genéricos", desc: "Séries repetitivas que não ativam as fibras profundas do glúteo." },
            { emoji: "🔥", title: "Falta de ativação", desc: "O problema não é o peso, é a conexão neural que está desligada." }
          ].map((item, i) => (
            <div key={i} className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--line)] space-y-3 shadow-lg shadow-[var(--brand)]/5">
              <div className="w-12 h-12 rounded-2xl bg-[var(--brand-soft)] flex items-center justify-center text-2xl">
                {item.emoji}
              </div>
              <h3 className="text-lg font-bold leading-tight">{item.title}</h3>
              <p className="text-sm text-[var(--ink-2)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* SECTION 2.5: COMO FUNCIONA */}
      <section className="px-5 py-12 md:px-6 md:py-[72px] max-w-2xl mx-auto space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Como o Protocolo Bumbum Tanajura funciona</h2>
        <div className="space-y-6">
          {[
            { step: "1", title: "Ativação", desc: "Aprenda a direcionar o estímulo para o glúteo." },
            { step: "2", title: "Estímulo localizado", desc: "Movimentos selecionados para o objetivo do protocolo." },
            { step: "3", title: "Rotina curta", desc: "Sessões que cabem no tempo que você tem disponível." },
            { step: "4", title: "Progressão", desc: "Evolução organizada ao longo dos dias." },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--brand)] text-white flex items-center justify-center font-bold">
                {item.step}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-base">{item.title}</h4>
                <p className="text-sm text-[var(--ink-2)] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: O PRODUTO (VISUAL) */}
      <section className="px-5 py-12 bg-[var(--brand-soft)] md:px-6 md:py-[72px] text-center space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold">O Protocolo Bumbum Tanajura</h2>
        
        {/* CSS-Only Phone Mockup */}
        <div className="relative mx-auto w-[280px] h-[580px] bg-[var(--ink)] rounded-[40px] border-[8px] border-[var(--line)] overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[var(--ink)] rounded-b-2xl z-20" />
          <div className="flex h-full animate-scroll-mockup">
             <div className="min-w-full h-full relative">
               <img src={mockup1} width={500} height={500} loading="lazy" decoding="async" alt="Bumbum Tanajura" className="w-full h-full object-cover" />
               <div className="absolute inset-x-0 bottom-8 text-white text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-4">
                 <h3 className="text-2xl font-black uppercase italic leading-tight">Capa Bumbum Tanajura</h3>
               </div>
             </div>
             <div className="min-w-full h-full relative">
               <img src={mockup2} width={500} height={500} loading="lazy" decoding="async" alt="Express Bumbum em Casa" className="w-full h-full object-cover" />
               <div className="absolute inset-x-0 bottom-8 text-white text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-4">
                 <h3 className="text-2xl font-black uppercase italic leading-tight">Express Bumbum em Casa</h3>
               </div>
             </div>
             <div className="min-w-full h-full relative">
               <img src={mockup3} width={500} height={500} loading="lazy" decoding="async" alt="Mapa da Silhueta" className="w-full h-full object-cover" />
               <div className="absolute inset-x-0 bottom-8 text-white text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-4">
                 <h3 className="text-2xl font-black uppercase italic leading-tight">Mapa da Silhueta</h3>
               </div>
             </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-md mx-auto">
          {[
            { icon: <Clock size={16} />, text: "Treinos de 20 minutos" },
            { icon: <Zap size={16} />, text: "Sem equipamento" },
            { icon: <Smartphone size={16} />, text: "Acesso pelo navegador" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-[var(--surface-2)] px-4 py-2 rounded-full text-sm font-semibold text-[var(--ink-2)] border border-[var(--line)]">
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: ANTES E DEPOIS DO PROTOCOLO */}
      <section className="px-5 py-12 md:px-6 md:py-[72px] text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold max-w-2xl mx-auto leading-tight">
            O que muda com o Protocolo Bumbum Tanajura
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-[#FEF2F2] p-6 rounded-[32px] border border-[#FEE2E2] space-y-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#991B1B] flex items-center gap-2">
                Antes do Protocolo
              </h3>
              <ul className="space-y-4">
                {[
                  "Dor ou desconforto ao tentar treinar sozinha",
                  "Vergonha de postar foto de biquíni ou usar roupa justa",
                  "Horas perdidas com treinos genéricos sem ver resultado",
                  "Frustração de sentir que já tentou de tudo",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div className="mt-1 w-5 h-5 rounded-full bg-[#FCA5A5] flex items-center justify-center shrink-0">
                      <X size={12} className="text-[#991B1B]" strokeWidth={3} />
                    </div>
                    <span className="text-sm md:text-base font-medium text-[#991B1B]/80 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#F0FDF4] p-6 rounded-[32px] border border-[#DCFCE7] space-y-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#166534] flex items-center gap-2">
                Depois do Protocolo
              </h3>
              <ul className="space-y-4">
                {[
                  "Ativação correta do glúteo em minutos, sem dor nas articulações",
                  "Confiança para usar a roupa que quiser",
                  "Treino de 20 minutos que cabe em qualquer rotina",
                  "Resultado visível que comprova que valeu a pena",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div className="mt-1 w-5 h-5 rounded-full bg-[#86EFAC] flex items-center justify-center shrink-0">
                      <CheckCircle2 size={12} className="text-[#166534]" strokeWidth={3} />
                    </div>
                    <span className="text-sm md:text-base font-medium text-[#166534]/80 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: STACK DE ENTREGÁVEIS */}
      <section className="px-5 py-12 bg-[var(--surface-2)] md:px-6 md:py-[72px]">
        <div className="max-w-2xl mx-auto space-y-6 border-2 border-[var(--brand)] rounded-[32px] p-6 md:p-10 bg-[var(--surface)] shadow-2xl shadow-[var(--brand)]/10">
          <h2 className="text-2xl font-bold text-center mb-8">O que você vai receber hoje</h2>
          
          <div className="space-y-3">
            {[
              { title: "Protocolo Bumbum Tanajura — 20 Minutos", benefit: "Ativação neural profunda para quem tem pressa.", price: "47" },
              { title: 'Rotina Express "Bumbum em Casa"', benefit: "Treinos curtos que cabem em qualquer espaço.", price: "67" },
              { title: "Bônus 1: Mapa da Silhueta Definida", benefit: "Guia alimentar focado em curvas femininas.", price: "47", isBonus: true },
              { title: "Bônus 2: Checklist de Ativação Diária", benefit: "Passo a passo rápido para fazer antes de cada treino.", price: "27", isBonus: true },
            ].map((item, i) => (
              <div key={i} className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--line)] flex justify-between items-center gap-4 shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[var(--brand-soft)] flex items-center justify-center text-sm shrink-0">
                      ✅
                    </div>
                    <h4 className="font-bold text-base">{item.title}</h4>
                  </div>
                  <p className="text-[13px] text-[var(--ink-2)] pl-6">{item.benefit}</p>
                </div>
                <div className="text-[var(--ink-2)] line-through font-semibold text-sm whitespace-nowrap">R$ {item.price}</div>
              </div>
            ))}
          </div>

          <div className="bg-[var(--brand-soft)] border-2 border-dashed border-[var(--brand)] p-6 rounded-2xl text-center space-y-4">
            <div>
              <div className="flex flex-col items-center gap-1 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--ink-2)] font-semibold line-through">Valor total: R$ {anchorPrice}</span>
                  <span className="bg-[var(--ok)] text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">{discountPercent}% OFF</span>
                </div>
              </div>
              <div className="text-2xl font-black text-[var(--brand)]">
                HOJE: R$ {currentPrice}
              </div>
            </div>
            <button 
              onClick={handlePurchase}
              className="w-full bg-[var(--brand)] text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-[var(--brand)]/20 active:scale-95 transition-all"
            >
              QUERO TODOS OS BÔNUS — R$ {currentPrice}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: PROVA SOCIAL */}
      <section className="px-5 py-12 bg-[var(--brand-soft)] md:px-6 md:py-[72px] overflow-hidden">
        <h2 className="text-2xl font-bold text-center mb-8">Resultados reais em 21 dias</h2>
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide -mx-5 px-5">
          {[
            {
              name: "Carla Silva",
              age: "43 anos",
              photo: photoCarla,
              text: "Gente, eu não acreditava. Com 43 anos achei que meu bumbum nunca mais ia subir. Em 21 dias do Protocolo Bumbum Tanajura, minhas calças jeans voltaram a servir e estão até folgadas na cintura!"
            },
            {
              name: "Mariana Costa",
              age: "28 anos",
              photo: photoMariana,
              text: "O melhor são os treinos de 20 minutos. Eu trabalho o dia todo e não tenho tempo pra academia. Meus glúteos estão muito mais firmes e empinados!"
            },
            {
              name: "Fernanda Lima",
              age: "35 anos",
              photo: photoFernanda,
              text: "Já tinha tentado outros aplicativos e até creme, sem resultado nenhum. A sensação de ativação desse protocolo é surreal — senti o músculo trabalhando de verdade logo no primeiro dia."
            }
          ].map((item, idx) => (
            <div key={idx} className="min-w-[280px] bg-[var(--surface)] p-6 rounded-2xl border border-[var(--line)] space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <img 
                  loading="lazy"
                  decoding="async"
                  width={64}
                  height={64}
                  src={item.photo} 
                  alt={item.name} 
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[var(--brand-soft)] shadow-md"
                />
                <div>
                  <div className="font-bold text-[var(--ink)]">{item.name}</div>
                  <div className="text-xs text-[var(--ink-2)]">{item.age}</div>
                </div>
              </div>
              <p className="text-sm italic leading-relaxed text-[var(--ink-2)]">
                "{item.text}"
              </p>
              <div className="flex text-[#FFD700]">
                {[...Array(5)].map((_, i) => <Zap key={i} size={14} fill="currentColor" />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: OFERTA */}
      <section className="px-5 py-12 md:px-6 md:py-[72px] bg-[var(--surface-2)]">
        <div className="max-w-md mx-auto bg-[var(--surface)] border-[3px] border-[var(--brand)] rounded-[32px] p-8 text-center space-y-6 shadow-2xl shadow-[var(--brand)]/20 relative overflow-hidden">
          {!isExpired && (
            <div className="absolute top-4 right-[-35px] rotate-45 bg-[var(--brand)] text-white text-[10px] font-bold py-1 px-10 shadow-md">
              84% OFF
            </div>
          )}
          
          <div className="space-y-1">
            <h3 className="text-xl font-bold uppercase tracking-widest text-[var(--ink-2)]">Acesso Vitalício</h3>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <span className="text-[var(--ink-2)] line-through font-bold">R$ {anchorPrice}</span>
                <span className="bg-[var(--ok)] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{discountPercent}% OFF</span>
              </div>
            </div>
            <div className="text-[40px] font-black text-[var(--brand)] leading-none">R$ {currentPrice}</div>
            <p className="text-sm font-bold text-[var(--ok)]">Pagamento único · Sem assinaturas</p>
          </div>

          <button 
            onClick={handlePurchase}
            className="w-full bg-[var(--brand)] text-white py-5 rounded-2xl font-extrabold text-xl shadow-lg shadow-[var(--brand)]/30 active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            QUERO ATIVAR MEU GLÚTEO — R$ {currentPrice}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[var(--ink-2)] opacity-70">
              <Shield size={14} /> Compra Segura · Kiwify
            </div>
            <div className="flex items-center justify-center gap-4 text-[var(--ink-2)] opacity-60">
              <span className="flex items-center gap-1 text-[11px] font-semibold"><CreditCard size={16} /> Cartão</span>
              <span className="flex items-center gap-1 text-[11px] font-semibold"><Landmark size={16} /> Pix</span>
              <span className="flex items-center gap-1 text-[11px] font-semibold"><Wallet size={16} /> Boleto</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: COMO FUNCIONA DEPOIS DA COMPRA */}
      <section className="px-5 py-12 md:px-6 md:py-[72px] max-w-2xl mx-auto space-y-8">
        <h2 className="text-2xl font-bold text-center">O que acontece após o pagamento?</h2>
        <div className="space-y-6">
          {[
            { step: "1", title: "Pagamento Aprovado", desc: "Assim que o sistema confirma o pagamento (instantâneo no PIX e Cartão)." },
            { step: "2", title: "Acesso Imediato no E-mail", desc: "Você recebe o link único de acesso e sua senha em até 2 minutos." },
            { step: "3", title: "Primeiro Treino Hoje", desc: "Basta abrir no celular e começar o seu primeiro ciclo de 20 minutos." }
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--ink)] text-white flex items-center justify-center font-bold">
                {item.step}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-base">{item.title}</h4>
                <p className="text-sm text-[var(--ink-2)] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: GARANTIA */}
      <section className="px-5 py-12 md:px-6 md:py-[72px] bg-[var(--surface-2)]">
        <div className="max-w-xl mx-auto bg-white border-2 border-[var(--ok)] rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
          <div className="w-20 h-20 flex-shrink-0 rounded-full bg-[var(--ok)]/10 flex items-center justify-center text-[var(--ok)]">
            <Shield size={48} />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-[var(--ok)]">7 dias para testar sem risco</h3>
            <p className="text-sm text-[var(--ink-2)] leading-relaxed">
              Entre, abra os treinos e teste. Se não for o que você esperava, é só pedir o reembolso em até 7 dias pelo <a href="mailto:sacbumbumperfeito@gmail.com" className="font-bold underline">sacbumbumperfeito@gmail.com</a>. Devolvemos 100% do valor, sem perguntas.
            </p>
            <button 
              onClick={handlePurchase}
              className="mt-4 w-full bg-[var(--ok)] text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-[var(--ok)]/20 active:scale-95 transition-all"
            >
              QUERO TESTAR SEM RISCO — R$ {currentPrice}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQ */}
      <section className="px-5 py-12 md:px-6 md:py-[72px] max-w-2xl mx-auto space-y-8">
        <h2 className="text-2xl font-bold text-center">Dúvidas Frequentes</h2>
        <div className="space-y-3">
          {[
            { q: "É um aplicativo? Preciso baixar alguma coisa?", a: "Não! É um WebApp (PWA). Você acessa direto pelo navegador e pode adicionar o ícone na tela inicial do celular como se fosse um app, sem ocupar memória." },
            { q: "É cobrança única ou assinatura?", a: "Cobrança única! Você paga uma vez e o acesso é seu para sempre, incluindo todas as atualizações futuras do protocolo." },
            { q: "Como e quando recebo o acesso?", a: "O acesso é enviado automaticamente para o seu e-mail cadastrado no checkout em até 2 minutos após a aprovação." },
            { q: "Funciona se eu nunca treinei ou estou fora de forma?", a: "Com certeza. O protocolo respeita o seu nível e o estímulo neural não depende de força bruta ou experiência prévia." },
            { q: "Preciso de equipamento ou espaço grande?", a: "Absolutamente nada. Você só precisa do seu peso corporal e de um espaço pequeno como um tapete de quarto." },
            { q: "Em quanto tempo vejo diferença?", a: "A maioria das mulheres relata sentir a musculatura mais 'acordada' nas primeiras 72h e mudanças visíveis de firmeza em 21 dias." },
            { q: "E se eu não gostar?", a: "Você tem 7 dias de garantia incondicional. Se não gostar, basta enviar um e-mail para o suporte." }
          ].map((item, i) => (
            <details key={i} className="group border border-[var(--line)] rounded-xl overflow-hidden bg-white">
              <summary className="p-4 flex justify-between items-center font-bold text-sm md:text-base cursor-pointer hover:bg-[var(--surface-2)] transition-colors list-none">
                {item.q}
                <ChevronRight size={18} className="text-[var(--brand)] group-open:rotate-90 transition-transform" />
              </summary>
              <div className="p-4 pt-0 text-sm text-[var(--ink-2)] leading-relaxed border-t border-[var(--line)]">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* SECTION 10: CTA FINAL */}
      <section className="px-5 py-16 md:px-6 md:py-[80px] bg-[var(--ink)] text-white text-center space-y-8">
        <div className="space-y-4 max-w-lg mx-auto">
          <h2 className="text-3xl font-extrabold">Preparada para começar?</h2>
          <p className="opacity-80">Junte-se a milhares de mulheres que decidiram ativar o bumbum sem sair de casa.</p>
        </div>

        <div className="max-w-sm mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold opacity-60 line-through">De R$ {anchorPrice}</span>
              <span className="bg-[var(--ok)] text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">{discountPercent}% OFF</span>
            </div>
          </div>
          <div className="text-4xl font-black text-[var(--brand)]">Por R$ {currentPrice}</div>
          <button 
            onClick={handlePurchase}
            className="w-full bg-[var(--brand)] text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-[var(--brand)]/20 active:scale-95 transition-all"
          >
            SIM, QUERO COMEÇAR HOJE — R$ {currentPrice}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-5 py-8 md:px-6 text-center space-y-4 border-t border-[var(--line)] bg-[var(--surface-2)]">
        <p className="text-[11px] text-[var(--ink-2)] leading-relaxed max-w-xl mx-auto">
          Resultados variam de pessoa para pessoa. Este produto não substitui acompanhamento médico ou de profissional de educação física. Todas as informações contidas aqui são apenas para fins educativos.
        </p>
        <p className="text-[10px] text-[var(--ink-2)] opacity-50">
          © {new Date().getFullYear()} Protocolo Bumbum Tanajura · Todos os direitos reservados
        </p>
      </footer>

      {/* STICKY CTA BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[var(--line)] z-[100] h-[82px] md:h-[92px] pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-lg mx-auto px-5 h-full flex flex-col justify-center items-center gap-1 text-center">
          <button 
            onClick={handlePurchase}
            className="w-full bg-[var(--brand)] text-white h-14 rounded-xl font-bold flex flex-col items-center justify-center leading-tight shadow-lg shadow-[var(--brand)]/20 active:scale-95 transition-transform"
          >
            <span className="text-base">Quero meu protocolo — R$ {currentPrice}</span>
            <span className="text-[12px] font-medium opacity-90">Pagamento único · Acesso imediato</span>
          </button>
        </div>
      </div>

      {/* Spacing for sticky bar */}
      <div className="h-[96px]" />

      <style>{`
        @keyframes scroll-mockup {
          0% { transform: translateX(0); }
          25% { transform: translateX(0); }
          33% { transform: translateX(-100%); }
          58% { transform: translateX(-100%); }
          66% { transform: translateX(-200%); }
          91% { transform: translateX(-200%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-mockup {
          animation: scroll-mockup 12s infinite cubic-bezier(0.85, 0, 0.15, 1);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
