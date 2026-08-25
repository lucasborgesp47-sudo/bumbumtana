import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuiz } from "../hooks/useQuiz";
import { ChevronRight, Check } from "lucide-react";
import { DopamineOverlay } from "../components/quiz/DopamineOverlay";
import { EmotionalOverlay } from "../components/quiz/EmotionalOverlay";
import { EntryGate } from "../components/quiz/EntryGate";
import { useLoadingBar } from "../components/ui/LoadingBar";

export const Route = createFileRoute("/")({
  component: Index,
});

function ProgressBar({ step }: { step: number }) {
  // Total steps in the funnel: 9 content steps + loading/results
  const totalSteps = 11;
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
    toggleTried,
    getConditional,
    data
  } = useQuiz();
  const { start, finish } = useLoadingBar();
  const [touched, setTouched] = useState(false);
  const [showEntryGate, setShowEntryGate] = useState(true);

  const weightNum = Number(data.weight);
  const heightNum = Number(data.height);
  const nameError = !data.name?.trim() ? "Informe seu nome" : "";
  const weightError = !data.weight
    ? "Informe seu peso"
    : !Number.isFinite(weightNum) || weightNum < 30 || weightNum > 200
      ? "Peso deve estar entre 30 e 200 kg"
      : "";
  const heightError = !data.height
    ? "Informe sua altura"
    : !Number.isFinite(heightNum) || heightNum < 120 || heightNum > 220
      ? "Altura deve estar entre 120 e 220 cm"
      : "";
  const formValid = !nameError && !weightError && !heightError;

  useEffect(() => {
    if (loading) {
      start();
    } else {
      finish();
    }
  }, [loading, start, finish]);

  if (showEntryGate) {
    return <EntryGate onEnter={() => setShowEntryGate(false)} />;
  }

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
                <p className="text-muted text-sm md:text-base">Isso nos ajuda a definir a intensidade mais adequada para o seu perfil</p>
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
                <h1 className="text-2xl md:text-3xl font-bold text-balance leading-tight">Se você pudesse escolher apenas UMA coisa para mudar no seu bumbum nos próximos 21 dias...</h1>
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
                <h1 className="text-2xl md:text-3xl font-bold text-balance leading-tight">Como você REALMENTE se sente quando olha para seu bumbum no espelho?</h1>
                <div className="grid gap-4">
                  {[
                    "😔 Frustrada — já tentei de tudo e nada muda",
                    "😤 Irritada — agacho e a coxa cresce, o bumbum não",
                    "😶 Desmotivada — já desisti de academia",
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
              <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
                <h1 className="text-2xl md:text-3xl font-bold text-balance">Quando você faz agachamento ou exercício de perna, onde você sente mais o esforço?</h1>
                <div className="grid gap-4">
                  {[
                    { label: "Principalmente no bumbum", icon: "🍑" },
                    { label: "Mais nas coxas (esse é o problema)", icon: "🦵" },
                    { label: "Sinto pouco o músculo", icon: "😕" },
                    { label: "Não sei dizer", icon: "🤔" },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => nextStep({ effortLocation: opt.label })}
                      className="flex items-center text-left w-full bg-card p-6 rounded-2xl border-2 border-border hover:border-primary transition-all"
                    >
                      <span className="text-3xl mr-4">{opt.icon}</span>
                      <span className="font-bold text-lg">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
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
                  ].map((opt) => {
                    const triedList = Array.isArray(data.tried) ? data.tried : [];
                    const selected = triedList.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleTried(opt)}
                        className={`w-full text-left bg-card p-4 rounded-xl border-2 transition-all flex items-center ${selected ? "border-primary" : "border-border hover:border-primary"}`}
                      >
                        <div className={`w-6 h-6 border-2 rounded mr-4 flex items-center justify-center ${selected ? "border-primary bg-primary" : "border-gray-300"}`}>
                          {selected && <Check size={16} className="text-white" />}
                        </div>
                        <span className="font-medium">{opt}</span>
                      </button>
                    );
                  })}
                  <button
                    onClick={() => nextStep()}
                    disabled={!(Array.isArray(data.tried) ? data.tried : []).length}
                    className="mt-4 w-full bg-primary text-white py-4 rounded-xl font-bold disabled:opacity-50"
                  >
                    Continuar →
                  </button>
                </div>
              </div>
            )}
            
            {step === 6 && (
              <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
                <h1 className="text-2xl md:text-3xl font-bold text-balance">Por dia, quantos minutos você consegue separar?</h1>
                <div className="grid gap-4">
                  {[
                    { label: "Menos de 10 minutos", icon: "⏱️" },
                    { label: "10 a 15 minutos", icon: "⏱️" },
                    { label: "15 a 30 minutos", icon: "⏳" },
                    { label: "Sem limite de tempo", icon: "🚀" },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => nextStep({ time: opt.label })}
                      className="flex items-center text-left w-full bg-card p-6 rounded-2xl border-2 border-border hover:border-primary transition-all shadow-sm"
                    >
                      <span className="text-3xl mr-4">{opt.icon}</span>
                      <span className="font-bold text-lg">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="space-y-4">
                  <h1 className="text-xl md:text-2xl font-bold text-balance">E seu nível de atividade hoje?</h1>
                  <div className="grid gap-3">
                    {[
                      "🛋️ Sedentária — parada há meses",
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
            
            {step === 8 && (
              <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
                <h1 className="text-2xl md:text-3xl font-bold text-balance">Dados Físicos</h1>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Qual o seu nome?</label>
                    <input
                      type="text"
                      value={data.name || ""}
                      placeholder="Ex: Ana"
                      className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none"
                      onChange={(e) => updateData({ name: e.target.value })}
                    />
                    {touched && nameError && <p className="text-sm text-red-600 mt-1">{nameError}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Qual o seu peso atual? (kg)</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={data.weight || ""}
                      placeholder="Ex: 68"
                      className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none"
                      onChange={(e) => updateData({ weight: e.target.value })}
                    />
                    {touched && weightError && <p className="text-sm text-red-600 mt-1">{weightError}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Qual a sua altura? (cm)</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={data.height || ""}
                      placeholder="Ex: 165"
                      className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none"
                      onChange={(e) => updateData({ height: e.target.value })}
                    />
                    {touched && heightError && <p className="text-sm text-red-600 mt-1">{heightError}</p>}
                  </div>
                  <button
                    onClick={() => {
                      setTouched(true);
                      if (!formValid) return;
                      nextStep();
                    }}
                    disabled={touched && !formValid}
                    className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg mt-4 disabled:opacity-50"
                  >
                    Calibrar Meu Protocolo →
                  </button>
                </div>
              </div>
            )}
            
            {step === 9 && (
              <div className="bg-card p-6 md:p-8 rounded-3xl border shadow-xl text-center space-y-6 max-w-sm mx-auto animate-in fade-in duration-500">
                <h2 className="text-2xl font-bold text-primary">🎯 SEU PROTOCOLO BUMBUM TANAJURA ESTÁ PRONTO</h2>
                <div className="text-left space-y-3 bg-background p-4 rounded-xl border border-border">
                  <p>
                    <strong>Principal ponto de atenção:</strong>{" "}
                    {data.effortLocation === "Sinto pouco o músculo" || data.effortLocation === "Mais nas coxas (esse é o problema)"
                      ? "falta de ativação do glúteo durante o treino"
                      : "ativação do glúteo"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pelas suas respostas, seu protocolo foi ajustado para priorizar estímulos direcionados ao glúteo, dentro do tempo que você tem disponível: <strong>{data.time || "poucos minutos por dia"}</strong>.
                  </p>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-xl text-left border border-primary/10">
                  <p className="text-sm italic text-muted-foreground">
                    {getConditional() === 'Y' && (
                      <>
                        Foi vendido para você a ideia de que precisa passar horas na academia. O <strong className="text-primary not-italic">Truque da Virgínia</strong> ativa o glúteo em 20 min — sem academia, sem coxa grande.
                      </>
                    )}
                    {getConditional() === 'Z' && (
                      <>
                        'Não tenho tempo' é a desculpa #1. O <strong className="text-primary not-italic">Truque da Virgínia</strong> resolve isso: 20 minutos em casa, sem equipamento, sem academia.
                      </>
                    )}
                    {getConditional() === 'X' && (
                      <>
                        Depois dos 35, o corpo responde a estímulos direcionados — não a agachamentos genéricos. É por isso que o <strong className="text-primary not-italic">Truque da Virgínia</strong> funciona tão bem para mulheres 40+.
                      </>
                    )}
                    {getConditional() === 'W' && "Começar do zero é uma VANTAGEM. Nível 1: em pé, sem impacto, sem equipamento, sem academia. Você não precisa estar pronta — só precisa de 20 minutos."}
                  </p>
                </div>

                <button
                  onClick={() => navigate({ to: "/sales" })}
                  className="w-full bg-primary hover:bg-primary-hover text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-lg shadow-primary/30"
                >
                  Quero Meu Truque da Virgínia Agora →
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
