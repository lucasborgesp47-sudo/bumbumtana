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

      {/* Scarcity Section */}
      <div className="mx-6 my-8 bg-secondary p-6 rounded-2xl text-white text-center space-y-2">
        <h3 className="font-bold text-lg">⚠️ PREÇO DE VALIDAÇÃO</h3>
        <p className="text-sm opacity-90">Esse valor é exclusivo para as primeiras 200 mulheres.</p>
        <div className="text-4xl font-bold">{spots}</div>
        <p className="font-bold">Vagas restantes</p>
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
