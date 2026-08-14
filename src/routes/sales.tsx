import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Trophy, Check, Shield, Lock, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/sales")({
  component: SalesPage,
});

function SalesPage() {
  const navigate = useNavigate();
  const [spots, setSpots] = useState(47);
  const [timeLeft, setTimeLeft] = useState(434); // Default 7:14

  useEffect(() => {
    const timerStartKey = 'bbg_timer_start';
    const duration = 434;
    const now = Math.floor(Date.now() / 1000);
    
    let startTime = parseInt(localStorage.getItem(timerStartKey) || '0');
    
    if (!startTime || (now - startTime) > duration) {
      startTime = now;
      localStorage.setItem(timerStartKey, startTime.toString());
    }
    
    const elapsed = now - startTime;
    const remaining = Math.max(0, duration - elapsed);
    setTimeLeft(remaining);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setSpots((prev) => (prev > 3 ? prev - 1 : 3));
    }, 270000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-32 overflow-x-hidden">
      {/* Hero Section */}
      <div className="bg-card p-6 md:p-8 text-center space-y-4">
        <div className="text-5xl">🍑</div>
        <div className="bg-primary/10 text-primary py-1 px-3 rounded-full inline-block font-bold text-sm">100% Personalizado</div>
        <h1 className="text-2xl md:text-3xl font-bold leading-tight px-2">Seu treino personalizado está pronto!</h1>
        <p className="text-muted-foreground text-sm md:text-base px-2">Com base nas suas respostas, identificamos que você pode conquistar bumbum mais firme e coxas definidas em 4 semanas — mesmo sem academia.</p>
        
        <div className="bg-card border border-primary/20 p-4 rounded-xl space-y-2 max-w-[280px] mx-auto">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Resgate seu desconto:</p>
          <div className="text-3xl font-mono font-black text-primary">{formatTime(timeLeft)}</div>
        </div>

        <div className="text-xl md:text-2xl font-bold">Por apenas <span className="text-primary">R$29,90</span></div>
        <button 
          className="w-full bg-primary hover:bg-primary-hover text-white py-4 md:py-5 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 transition-transform active:scale-95"
          onClick={() => window.location.href = "https://kiwify.com.br/checkout"}
        >
          Quero Treinar Meu Bumbum →
        </button>
      </div>

      {/* Trust Badges */}
      <div className="flex justify-center gap-6 py-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-1"><Shield size={16} /> Compra Segura</div>
        <div className="flex items-center gap-1"><Trophy size={16} /> Satisfação</div>
        <div className="flex items-center gap-1"><Lock size={16} /> Privacidade</div>
      </div>

      {/* Offer Stack */}
      <div className="px-6 space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-balance">O que você vai receber</h2>
        {[
          { title: "Protocolo Base ANS — 5 Minutos", icon: "🧠" },
          { title: 'Rotina Express "Bumbum em Casa"', icon: "⚡" },
          { title: 'Método "Porta Fechada"', icon: "🚪" },
          { title: "BÔNUS — Mapa da Silhueta Definida", icon: "🎁", bonus: true },
        ].map((item, i) => (
          <div key={i} className="bg-card p-5 rounded-2xl border border-border flex items-center gap-4">
            <span className="text-3xl">{item.icon}</span>
            <div>
              <h4 className="font-bold">{item.title}</h4>
              {item.bonus && <span className="text-xs text-primary font-bold">Valor real: R$47 — incluso hoje</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Social Proof */}
      <div className="px-6 mt-12 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black">6 meses.</h2>
          <p className="text-muted-foreground text-sm max-w-[280px] mx-auto">
            E o mais impressionante? 68% deles tinham mais de 35 anos e acharam que já era tarde demais.
          </p>
        </div>

        <div className="bg-card p-6 md:p-8 rounded-[32px] border border-white/5 relative overflow-hidden shadow-2xl mx-auto w-full max-w-sm md:max-w-md">
          <div className="flex justify-end gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="text-[#FF6F00]">★</span>
            ))}
          </div>
          
          <p className="italic mb-8 text-base md:text-lg leading-relaxed text-center font-medium px-2">
            "Pensei que meu bumbum nunca mais levantaria depois dos 40. Em 21 dias usando o app, minha calça jeans levantou dois números mais confortáveis."
          </p>
          
          <div className="flex items-center justify-center gap-2 text-[#E91E63] font-bold">
            <span className="w-5 h-[2px] bg-[#E91E63]"></span>
            <span>Carla, 43 anos</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 text-base md:text-lg font-bold text-center">
          <span className="text-2xl animate-bounce">👇</span>
          <span className="text-balance px-4">Vamos descobrir o que está travando o seu resultado</span>
        </div>
      </div>

      {/* Before/After */}
      <div className="px-6 mt-12 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-100 p-4 rounded-2xl text-slate-500">
            <h4 className="font-bold mb-2 flex items-center gap-1">❌ ANTES</h4>
            <ul className="text-xs space-y-1">
              <li>Mensalidade cara</li>
              <li>Falta de tempo</li>
              <li>Frustração</li>
            </ul>
          </div>
          <div className="bg-primary/5 p-4 rounded-2xl text-primary border border-primary/10">
            <h4 className="font-bold mb-2 flex items-center gap-1">✅ DEPOIS</h4>
            <ul className="text-xs space-y-1">
              <li>Treina em casa</li>
              <li>Confiança</li>
              <li>Bumbum firme</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Scarcity Section */}
      <div className="mx-6 my-12 bg-secondary p-6 rounded-2xl text-white text-center space-y-2 max-w-sm mx-auto">
        <h3 className="font-bold text-lg">⚠️ PREÇO DE VALIDAÇÃO</h3>
        <p className="text-sm opacity-90">Esse valor é exclusivo para as primeiras 200 mulheres.</p>
        <div className="text-4xl font-bold">{spots}</div>
        <p className="font-bold">Vagas restantes</p>
      </div>

      {/* FAQ */}
      <div className="px-6 space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-center text-balance">Perguntas Frequentes</h2>
        <div className="space-y-2">
          {[
            "Funciona sem equipamento?",
            "Precisa de espaço grande?",
            "Melhora a aparência da pele?",
            "Quanto tempo para ver resultado?",
          ].map((q, i) => (
            <details key={i} className="bg-card border border-border rounded-xl">
              <summary className="p-4 font-bold text-sm cursor-pointer list-none flex justify-between items-center">
                {q}
                <ChevronRight size={16} className="text-primary" />
              </summary>
              <div className="p-4 pt-0 text-sm text-muted-foreground border-t border-border">
                Sim! O protocolo foi desenhado para ser feito 100% em casa, sem nenhum acessório extra, focando apenas na Ativação Neural Sequencial.
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Guarantee */}
      <div className="m-6 p-6 rounded-2xl border-2 border-success/30 bg-success/5 space-y-3 max-w-sm mx-auto">
        <h3 className="font-bold text-success flex items-center gap-2">
          <Shield size={20} /> GARANTIA DE 7 DIAS
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Não gostou? Não funcionou pra você? Entre em contato em até 7 dias e devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
        </p>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border z-50">
        <button 
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 transition-transform active:scale-95 text-lg"
          onClick={() => window.location.href = "https://kiwify.com.br/checkout"}
        >
          Garantir Minha Vaga Agora →
        </button>
      </div>
    </div>
  );
}
