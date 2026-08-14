import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuiz } from "../hooks/useQuiz";
import { ChevronRight, Check } from "lucide-react";
import { DopamineOverlay } from "../components/quiz/DopamineOverlay";
import { EmotionalOverlay } from "../components/quiz/EmotionalOverlay";
import { useLoadingBar } from "../components/ui/LoadingBar";
import { useLoadingBar } from "../components/ui/LoadingBar";

export const Route = createFileRoute("/")({
  component: Index,
});

function ProgressBar({ step }: { step: number }) {
  // Total steps in the funnel: 8 content steps + loading/results
  const totalSteps = 10;
  const percentage = Math.min((step / totalSteps) * 100, 100);
  return (
    <div className="w-full bg-slate-200 rounded-full h-2 mb-8 overflow-hidden">
      <div
        className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

function Index() {
  const navigate = useNavigate();
  const { 
    step, 
    nextStep, 
    loading, 
    showDopamine, 
    dopamineType, 
    closeDopamine,
    showEmotionalOverlay,
    updateData,
    getConditional,
    data
  } = useQuiz();
  const { start, finish } = useLoadingBar();

  useEffect(() => {
    if (loading) {
      start();
    } else {
      finish();
    }
  }, [loading, start, finish]);

  if (showDopamine) {
    return <DopamineOverlay type={dopamineType as 1 | 2 | 3} onContinue={closeDopamine} />;
  }

  if (showEmotionalOverlay) {
    return <EmotionalOverlay />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid mb-4" />
        <p className="text-xl font-bold text-primary">Calibrando seu protocolo...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-6 overflow-x-hidden overflow-y-auto">
      <div className="max-w-md mx-auto">
        <ProgressBar step={step} />
        <div key={step}>
            {step === 1 && (
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-2xl md:text-3xl font-bold text-balance">Qual a sua idade?</h1>
                <p className="text-muted text-sm md:text-base">Isso calibra a intensidade ideal para o seu metabolismo</p>
                <div className="grid gap-4">
                  {[
                    { label: "18 a 29 anos", icon: "🔥" },
                    { label: "30 a 39 anos", icon: "⚡" },
                    { label: "40 a 49 anos", icon: "🌟" },
                    { label: "50+ anos", icon: "💎" },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => nextStep({ age: opt.label })}
                      className="flex items-center text-left w-full bg-card p-6 rounded-2xl border-2 border-border hover:border-primary transition-all"
                    >
                      <span className="text-3xl mr-4">{opt.icon}</span>
                      <span className="font-bold text-lg">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <h1 className="text-2xl md:text-3xl font-bold text-balance leading-tight">Se você pudesse escolher apenas UMA coisa para mudar nos próximos 21 dias...</h1>
                <div className="grid gap-4">
                  {[
                    "🍑 Levantar o bumbum e dar mais volume",
                    "🦵 Deixar as coxas mais firmes e definidas",
                    "✨ Melhorar a aparência da pele na região",
                    "🎯 Tudo isso junto",
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => nextStep({ objective: opt })}
                      className="w-full text-left bg-card p-6 rounded-2xl border-2 border-border hover:border-primary transition-all font-bold text-lg"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-2xl md:text-3xl font-bold text-balance leading-tight">Como você REALMENTE se sente quando olha para suas coxas e bumbum no espelho?</h1>
                <div className="grid gap-4">
                  {[
                    "😔 Frustrada — já tentei de tudo e nada muda",
                    "😤 Irritada — vejo outras mulheres com resultado",
                    "😶 Desmotivada — cheguei a desistir de tentar",
                    "😰 Ansiosa — tenho evento/data marcada",
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => nextStep({ feelings: opt })}
                      className="w-full text-left bg-card p-6 rounded-2xl border-2 border-border hover:border-primary transition-all font-bold text-lg"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {step === 4 && (
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-2xl md:text-3xl font-bold text-balance">Marque tudo que você já fez para mudar bumbum e coxa:</h1>
                <div className="grid gap-3">
                  {[
                    "🏋️‍♀️ Academia tradicional",
                    "🥗 Dieta restritiva / detox",
                    "📱 Outros apps de exercício",
                    "💊 Suplementos / cremes",
                    "💉 Procedimentos estéticos",
                    "🙅‍♀️ Nunca tentei nada direcionado",
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => nextStep({ tried: [opt] })}
                      className="w-full text-left bg-card p-4 rounded-xl border-2 border-border hover:border-primary transition-all flex items-center"
                    >
                      <div className="w-6 h-6 border-2 border-gray-300 rounded mr-4 flex items-center justify-center">
                        <Check size={16} className="text-primary hidden group-active:block" />
                      </div>
                      <span className="font-medium">{opt}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => nextStep()}
                    className="mt-4 w-full bg-primary text-white py-4 rounded-xl font-bold"
                  >
                    Continuar →
                  </button>
                </div>
              </div>
            )}
            
            {step === 5 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="space-y-4">
                  <h1 className="text-xl md:text-2xl font-bold text-balance">Por dia, quantos minutos você consegue separar?</h1>
                  <div className="grid grid-cols-2 gap-3">
                    {["⏱️ < 10 min", "⏱️ 10-15 min", "⏱️ 15-30 min", "⏱️ Sem limite"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => nextStep({ time: opt })}
                        className="bg-card p-4 rounded-xl border-2 border-border hover:border-primary text-center font-bold"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="space-y-4">
                  <h1 className="text-xl md:text-2xl font-bold text-balance">E seu nível de atividade hoje?</h1>
                  <div className="grid gap-3">
                    {[
                      "🛋️ Sedentária — nada há meses",
                      "🚶‍♀️ Leve — caminho eventualmente",
                      "💪 Moderada — 1-2x por semana",
                      "🏃‍♀️ Ativa — treino regular",
                    ].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => nextStep({ activityLevel: opt })}
                        className="w-full text-left bg-card p-4 rounded-xl border-2 border-border hover:border-primary font-bold"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {step === 7 && (
              <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
                <h1 className="text-2xl md:text-3xl font-bold text-balance">Dados Físicos</h1>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Qual o seu peso atual? (kg)</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder="Ex: 68"
                      className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none"
                      onChange={(e) => updateData({ weight: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Qual a sua altura? (cm)</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder="Ex: 165"
                      className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none"
                      onChange={(e) => updateData({ height: e.target.value })}
                    />
                  </div>
                  <button
                    onClick={() => nextStep()}
                    className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg mt-4"
                  >
                    Calibrar Meu Protocolo →
                  </button>
                </div>
              </div>
            )}
            
            {step === 8 && (
              <div className="bg-card p-6 md:p-8 rounded-3xl border shadow-xl text-center space-y-6 max-w-sm mx-auto animate-in fade-in duration-500">
                <h2 className="text-2xl font-bold text-primary">🎯 Seu Protocolo Personalizado está pronto!</h2>
                <div className="text-left space-y-2 bg-background p-4 rounded-xl border border-border">
                  <p><strong>Idade:</strong> {data.age || "Calibrada"}</p>
                  <p><strong>Peso:</strong> {data.weight ? `${data.weight}kg` : "--"}</p>
                  <p><strong>Altura:</strong> {data.height ? `${data.height}cm` : "--"}</p>
                  <p><strong>Protocolo:</strong> {data.time?.includes("< 10") ? "5 minutos" : "12 minutos"}</p>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-xl text-left border border-primary/10">
                  <p className="text-sm italic text-muted-foreground">
                    {getConditional() === 'Y' && "Você foi vendida a ideia de que precisa passar 2h na academia. O Protocolo faz Ativação Neural (2min) e Estímulo Localizado."}
                    {getConditional() === 'Z' && "'Não tenho tempo' é a desculpa #1, e a gente resolveu. Você precisa de 5 minutos de ativação glútea focada."}
                    {getConditional() === 'X' && "Depois dos 35, o corpo quer estímulos curtos e direcionados. É por isso que o Protocolo funciona tão bem para mulheres 40+."}
                    {getConditional() === 'W' && "Começar do zero é uma VANTAGEM. Nível 1: em pé, sem impacto, sem equipamento. Você não precisa estar pronta."}
                  </p>
                </div>

                <button
                  onClick={() => navigate({ to: "/sales" })}
                  className="w-full bg-primary hover:bg-primary-hover text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-lg shadow-primary/30"
                >
                  Quero Meu Protocolo Agora →
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
