import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Trophy, Check, Shield, Lock } from "lucide-react";

export const Route = createFileRoute("/sales")({
  component: SalesPage,
});

function SalesPage() {
  const navigate = useNavigate();
  const [spots, setSpots] = useState(47);

  useEffect(() => {
    // Dynamic spot counter logic
    const interval = setInterval(() => {
      setSpots((prev) => (prev > 3 ? prev - 1 : 3));
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Section */}
      <div className="bg-card p-8 text-center space-y-4">
        <div className="text-5xl">🍑</div>
        <div className="bg-primary/10 text-primary py-1 px-3 rounded-full inline-block font-bold">100% Personalizado</div>
        <h1 className="text-3xl font-bold leading-tight">Seu treino personalizado está pronto!</h1>
        <p className="text-muted-foreground">Com base nas suas respostas, identificamos que você pode conquistar bumbum mais firme e coxas definidas em 4 semanas — mesmo sem academia.</p>
        
        <div className="bg-card border border-primary/20 p-4 rounded-xl space-y-2">
          <p className="text-sm font-bold text-muted-foreground">Resgate seu desconto:</p>
          <div className="text-2xl font-mono font-bold text-primary">07:14</div>
        </div>

        <div className="text-2xl font-bold">Por apenas <span className="text-primary">R$29,90</span></div>
        <button 
          className="w-full bg-primary hover:bg-primary-hover text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20"
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
        <h2 className="text-xl font-bold text-center mb-6">O que você vai receber</h2>
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
      <div className="px-6 mt-12 space-y-6">
        <h2 className="text-xl font-bold text-center">Quem seguiu o plano, teve resultado</h2>
        <div className="grid gap-4">
          <div className="bg-card p-6 rounded-2xl border border-border">
            <p className="italic mb-4 text-sm">"Pensei que meu bumbum nunca mais levantaria depois dos 40. Em 21 dias usando o app, minha calça jeans subiu dois números mais confortáveis."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">C</div>
              <span className="font-bold text-sm">Carla, 43 anos — 21 dias</span>
            </div>
          </div>
          <div className="bg-primary/5 p-4 rounded-xl text-center border border-primary/10">
            <p className="font-bold text-primary">47.832 mulheres nos últimos 6 meses</p>
          </div>
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
      <div className="mx-6 my-12 bg-secondary p-6 rounded-2xl text-white text-center space-y-2">
        <h3 className="font-bold text-lg">⚠️ PREÇO DE VALIDAÇÃO</h3>
        <p className="text-sm opacity-90">Esse valor é exclusivo para as primeiras 200 mulheres.</p>
        <div className="text-4xl font-bold">{spots}</div>
        <p className="font-bold">Vagas restantes</p>
      </div>

      {/* FAQ */}
      <div className="px-6 space-y-4">
        <h2 className="text-xl font-bold text-center">Perguntas Frequentes</h2>
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
      <div className="m-6 p-6 rounded-2xl border-2 border-success/30 bg-success/5 space-y-3">
        <h3 className="font-bold text-success flex items-center gap-2">
          <Shield size={20} /> GARANTIA DE 7 DIAS
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Não gostou? Não funcionou pra você? Entre em contato em até 7 dias e devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
        </p>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border z-50">
        <button 
          className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg"
          onClick={() => window.location.href = "https://kiwify.com.br/checkout"}
        >
          Garantir Minha Vaga Agora →
        </button>
      </div>
    </div>
  );
}
