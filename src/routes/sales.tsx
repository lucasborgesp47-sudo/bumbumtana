import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
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
  Wallet
} from "lucide-react";
import { useLoadingBar } from "../components/ui/LoadingBar";
import mockup1 from "@/assets/capa-bumbum-granada.jpg";
import mockup2 from "@/assets/bumbum-granada.jpg";
import mockup3 from "@/assets/mapa-da-silhueta.jpg";

export const Route = createFileRoute("/sales")({
  component: SalesPage,
});

// TODO: substituir pela URL real do produto na Kiwify quando estiver criado
const CHECKOUT_URL = "https://kiwify.com.br/checkout";

function SalesPage() {
  const navigate = useNavigate();
  const { start, finish } = useLoadingBar();
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(900); // 15:00
  const [isExpired, setIsExpired] = useState(false);
  
  // Quiz data (obrigatório: sem quiz respondido, volta para o início)
  const [quizData, setQuizData] = useState<{name?: string, objective?: string}>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bbg_quiz_data');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const hasQuizData = Boolean(quizData?.name && quizData?.objective);

  useEffect(() => {
    if (!hasQuizData) {
      navigate({ to: "/" });
    }
  }, [hasQuizData, navigate]);

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
    start();
    const checkoutLink = `${CHECKOUT_URL}?plan=${isExpired ? "99" : "29"}`;

    setTimeout(() => {
      finish();
      window.location.href = checkoutLink;
    }, 800);
  };

  const currentPrice = isExpired ? "99,90" : "29,90";
  const anchorPrice = "188";

  if (!hasQuizData) return null;

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
          Pelas suas respostas, seu ponto de travamento é <span className="text-[var(--brand)] font-bold">{quizData.objective || "a falta de estímulo correto nas fibras musculares"}</span> — e é exatamente isso que o protocolo ataca nas primeiras 72 horas.
        </p>

        <div className="space-y-6">
          {/* Real Timer */}
          <div className="bg-[var(--surface-2)] border border-[var(--line)] rounded-2xl p-4 inline-block w-full max-w-[280px]">
            <p className="text-[13px] font-semibold text-[var(--ink-2)] uppercase mb-1">Oferta expira em:</p>
            <div className={`text-[40px] font-extrabold leading-none ${isExpired ? 'text-[var(--ink-2)]' : 'text-[var(--brand)]'}`}>
              {formatTime(timeLeft)}
            </div>
            {!isExpired && (
              <div className="mt-2 space-y-1">
                <div className="text-sm font-bold text-[var(--ink-2)] line-through">
                  R$ {anchorPrice}
                </div>
                <div className="text-[13px] font-bold text-[var(--ok)] animate-pulse">
                  {isExpired ? 'Preço normal' : '84% de desconto aplicado'}
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={handlePurchase}
            className="w-full bg-[var(--brand)] text-white py-5 rounded-2xl font-extrabold text-lg shadow-lg shadow-[var(--brand)]/30 active:scale-95 transition-all flex items-center justify-center gap-2 group max-w-md mx-auto"
          >
            QUERO ATIVAR MEU PROTOCOLO AGORA — R$ {currentPrice}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* SECTION 2: O QUE TRAVA O RESULTADO */}
      <section className="px-5 py-12 bg-[var(--surface-2)] md:px-6 md:py-[72px] text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold max-w-2xl mx-auto leading-tight">
            Não é falta de esforço. É isso que está travando seu resultado.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            { icon: <Clock className="text-[var(--brand)]" />, title: "Rotina sobrecarregada", desc: "Você não precisa de 1 hora. O estímulo certo acontece em minutos." },
            { icon: <Layout className="text-[var(--brand)]" />, title: "Treinos genéricos", desc: "Séries repetitivas que não ativam as fibras profundas do glúteo." },
            { icon: <Zap className="text-[var(--brand)]" />, title: "Falta de ativação", desc: "O problema não é o peso, é a conexão neural que está desligada." }
          ].map((item, i) => (
            <div key={i} className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--line)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--brand-soft)] flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold leading-tight">{item.title}</h3>
              <p className="text-sm text-[var(--ink-2)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: O PRODUTO (VISUAL) */}
      <section className="px-5 py-12 md:px-6 md:py-[72px] text-center space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold">O Desafio Bumbum Granada</h2>
        
        {/* CSS-Only Phone Mockup */}
        <div className="relative mx-auto w-[280px] h-[580px] bg-[var(--ink)] rounded-[40px] border-[8px] border-[var(--line)] overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[var(--ink)] rounded-b-2xl z-20" />
          <div className="flex h-full animate-scroll-mockup">
             <div className="min-w-full h-full relative">
               <img src={mockup1} width={500} height={500} loading="lazy" decoding="async" alt="Bumbum Granada" className="w-full h-full object-cover" />
               <div className="absolute inset-x-0 bottom-8 text-white text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-4">
                 <h3 className="text-2xl font-black uppercase italic leading-tight">Capa Bumbum Granada</h3>
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
            { icon: <Clock size={16} />, text: "Treinos de 5 minutos" },
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

      {/* SECTION 4: STACK DE ENTREGÁVEIS */}
      <section className="px-5 py-12 bg-[var(--surface-2)] md:px-6 md:py-[72px]">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-center mb-8">O que você vai receber hoje</h2>
          
          <div className="space-y-3">
            {[
              { title: "Protocolo Bumbum Granada — 5 Minutos", benefit: "Ativação neural profunda para quem tem pressa.", price: "47" },
              { title: 'Rotina Express "Bumbum em Casa"', benefit: "Treinos curtos que cabem em qualquer espaço.", price: "67" },
              { title: "Bônus 1: Mapa da Silhueta Definida", benefit: "Guia alimentar focado em curvas femininas.", price: "47", isBonus: true },
              { title: "Bônus 2: Checklist de Ativação Diária", benefit: "Passo a passo rápido para fazer antes de cada treino.", price: "27", isBonus: true },
            ].map((item, i) => (
              <div key={i} className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--line)] flex justify-between items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-[var(--ok)]" />
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
                  <span className="bg-[var(--ok)] text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">84% OFF</span>
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
      <section className="px-5 py-12 md:px-6 md:py-[72px] overflow-hidden">
        <h2 className="text-2xl font-bold text-center mb-8">Resultados reais em 21 dias</h2>
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide -mx-5 px-5">
          {[
            {
              name: "Carla Silva",
              age: "43 anos",
              photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop",
              text: "Gente, eu não acreditava. Com 43 anos achei que meu bumbum nunca mais ia subir. Em 21 dias do Protocolo Bumbum Granada, minhas calças jeans voltaram a servir e estão até folgadas na cintura!"
            },
            {
              name: "Mariana Costa",
              age: "28 anos",
              photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop",
              text: "O melhor são os treinos de 5 minutos. Eu trabalho o dia todo e não tenho tempo pra academia. Meus glúteos estão muito mais firmes e empinados!"
            },
            {
              name: "Fernanda Lima",
              age: "35 anos",
              photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
              text: "A sensação de ativação é surreal. Você sente o músculo trabalhando de verdade logo no primeiro dia. Mudou meu corpo completamente."
            }
          ].map((item, idx) => (
            <div key={idx} className="min-w-[280px] bg-[var(--surface)] p-6 rounded-2xl border border-[var(--line)] space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <img 
                  loading="lazy"
                  decoding="async"
                  width={48}
                  height={48}
                  src={item.photo} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-[var(--brand-soft)]"
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
        <div className="max-w-md mx-auto bg-[var(--surface)] border-2 border-[var(--brand)] rounded-[32px] p-8 text-center space-y-6 shadow-xl relative overflow-hidden">
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
                <span className="bg-[var(--ok)] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">84% OFF</span>
              </div>
            </div>
            <div className="text-[40px] font-black text-[var(--brand)] leading-none">R$ {currentPrice}</div>
            <p className="text-sm font-bold text-[var(--ok)]">Pagamento único · Sem assinaturas</p>
          </div>

          <button 
            onClick={handlePurchase}
            className="w-full bg-[var(--brand)] text-white py-5 rounded-2xl font-extrabold text-xl shadow-lg shadow-[var(--brand)]/30 active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            QUERO ATIVAR MEU PROTOCOLO AGORA — R$ {currentPrice}
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
            { step: "3", title: "Primeiro Treino Hoje", desc: "Basta abrir no celular e começar o seu primeiro ciclo de 5 minutos." }
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
              Entre, abra os treinos e teste. Se não for o que você esperava, é só pedir o reembolso em até 7 dias pelo <span className="font-bold">suporte@bumbumgranada.com</span>. Devolvemos 100% do valor, sem perguntas.
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
              <span className="bg-[var(--ok)] text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">84% OFF</span>
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
          © 2024 Desafio Bumbum Granada · Todos os direitos reservados
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