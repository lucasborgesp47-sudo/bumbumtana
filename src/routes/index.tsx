import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuiz, type QuizData } from "../hooks/useQuiz";
import { ChevronRight, Check } from "lucide-react";
import { DopamineOverlay } from "../components/quiz/DopamineOverlay";
import { EmotionalOverlay } from "../components/quiz/EmotionalOverlay";
import { EntryGate } from "../components/quiz/EntryGate";
import { useLoadingBar } from "../components/ui/LoadingBar";
import { trackQuizStep, trackEvent, trackMetaCustom, cleanAnswer } from "../lib/analytics";
import { STEP_NAMES } from "../hooks/useQuiz";

export const Route = createFileRoute("/")({
  component: Index,
});

/** Monta o diagnóstico exibido no resultado a partir das respostas do quiz. */
function buildDiagnosis(data: QuizData) {
  const effort = data.effortLocation || "";
  const activity = cleanAnswer(data.activityLevel || "");
  const feelings = cleanAnswer(data.feelings || "");
  const tried = (Array.isArray(data.tried) ? data.tried : [])
    .map(cleanAnswer)
    .filter((t) => t !== "Nunca tentei nada direcionado");

  let activation = {
    label: "Baixa",
    level: 30,
    text: "Pelas suas respostas, o glúteo está trabalhando menos do que deveria nos exercícios.",
  };
  if (effort === "Mais nas coxas (esse é o problema)") {
    activation = {
      label: "Baixa",
      level: 25,
      text: "Seu esforço está indo para as coxas. É por isso que a coxa engrossa e o bumbum não responde.",
    };
  } else if (effort === "Sinto pouco o músculo") {
    activation = {
      label: "Baixa",
      level: 20,
      text: "Seu glúteo está sendo pouco recrutado. Sem ativação, ele não recebe o estímulo para ganhar volume.",
    };
  } else if (effort === "Não sei dizer") {
    activation = {
      label: "Não percebida",
      level: 35,
      text: "Quando não dá para perceber onde está o esforço, o glúteo costuma trabalhar menos do que deveria.",
    };
  } else if (effort === "Principalmente no bumbum") {
    activation = {
      label: "Moderada",
      level: 60,
      text: "Você já sente o glúteo. O próximo passo é direcionar o estímulo para ganhar volume e empinar.",
    };
  }

  const intensity = activity.startsWith("Sedentária")
    ? "Leve: começa do zero, em pé e sem impacto"
    : activity.startsWith("Leve")
      ? "Leve a moderada"
      : activity.startsWith("Moderada")
        ? "Moderada"
        : activity.startsWith("Ativa")
          ? "Moderada a intensa"
          : "Ajustada ao seu nível";

  return {
    activation,
    intensity,
    hasEvent: feelings.startsWith("Ansiosa"),
    objective: cleanAnswer(data.objective || ""),
    time: data.time || "poucos minutos por dia",
    activityShort: activity.split(" — ")[0] || "—",
    tried: tried.length > 0 ? tried.join(", ") : "Nada direcionado ainda",
  };
}

function ProgressBar({ step }: { step: number }) {
  // 9 etapas no total: a barra chega a 100% na tela de resultado
  const totalSteps = 9;
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

  const nameError = !data.name?.trim() ? "Informe seu nome" : "";
  const formValid = !nameError;

  useEffect(() => {
    if (loading) {
      start();
    } else {
      finish();
    }
  }, [loading, start, finish]);

  useEffect(() => {
    if (showEntryGate) return;
    if (step === 9) {
      // Perfil completo (sem dados pessoais) para cruzar respostas x compra
      trackQuizStep("previa_resultado", {
        perfil: getConditional(),
        idade: cleanAnswer(data.age || ""),
        objetivo: cleanAnswer(data.objective || ""),
        local_esforco: cleanAnswer(data.effortLocation || ""),
        tempo_disponivel: cleanAnswer(data.time || ""),
        nivel_atividade: cleanAnswer(data.activityLevel || ""),
        sentimento: cleanAnswer(data.feelings || ""),
        ativacao: buildDiagnosis(data).activation.label,
      });
      return;
    }
    // GA4: um evento único com o número/nome da etapa (etapas 1 a 8, sem agrupar)
    trackEvent("quiz_etapa", { etapa: step, nome_etapa: STEP_NAMES[step] });
    // Meta: mantém os nomes antigos para não quebrar públicos/conversões existentes
    trackMetaCustom(`quiz_etapa_${Math.min(step, 6)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, showEntryGate]);

  if (showEntryGate) {
    return (
      <EntryGate
        onEnter={() => {
          trackEvent("quiz_inicio");
          setShowEntryGate(false);
        }}
      />
    );
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
                <h1 className="text-2xl md:text-3xl font-bold text-balance">Para quem vamos montar o protocolo?</h1>
                <p className="text-muted text-sm md:text-base">Seu nome aparece no seu diagnóstico personalizado.</p>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="quiz-name" className="block text-sm font-bold mb-2">Seu primeiro nome</label>
                    <input
                      id="quiz-name"
                      type="text"
                      autoComplete="given-name"
                      enterKeyHint="done"
                      value={data.name || ""}
                      placeholder="Ex: Ana"
                      className="w-full p-4 rounded-xl border-2 border-border focus:border-primary outline-none"
                      onChange={(e) => updateData({ name: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key !== "Enter") return;
                        setTouched(true);
                        if (formValid) nextStep();
                      }}
                    />
                    {touched && nameError && <p className="text-sm text-red-600 mt-1">{nameError}</p>}
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
            
            {step === 9 && (() => {
              const d = buildDiagnosis(data);
              const firstName = (data.name || "").trim().split(" ")[0];
              const profileRows = [
                { icon: "🎯", label: "Objetivo", value: d.objective },
                { icon: "⏱️", label: "Tempo por dia", value: d.time },
                { icon: "💪", label: "Nível atual", value: d.activityShort },
                { icon: "🔁", label: "Já tentou", value: d.tried },
              ];
              return (
              <div className="bg-card p-6 md:p-8 rounded-3xl border shadow-xl space-y-5 max-w-sm mx-auto animate-in fade-in duration-500">
                <div className="text-center space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Diagnóstico concluído</p>
                  <h2 className="text-2xl font-bold text-primary leading-tight">
                    {firstName ? `${firstName}, seu protocolo do Truque da Virgínia está pronto` : "Seu protocolo do Truque da Virgínia está pronto"}
                  </h2>
                </div>

                {/* Espelho das respostas: a pessoa se reconhece no resultado */}
                <div className="bg-background rounded-xl border border-border divide-y divide-border">
                  {profileRows.map((row) => (
                    <div key={row.label} className="flex items-start gap-3 px-4 py-3 text-left">
                      <span className="text-lg leading-none mt-0.5">{row.icon}</span>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">{row.label}</p>
                        <p className="text-sm font-semibold leading-snug">{row.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Diagnóstico principal */}
                <div className="text-left space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-bold">Ativação do glúteo</p>
                    <p className={`text-sm font-extrabold ${d.activation.level >= 50 ? "text-amber-600" : "text-red-600"}`}>
                      {d.activation.label}
                    </p>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-3 rounded-full ${d.activation.level >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                      style={{ width: `${d.activation.level}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.activation.text}</p>
                </div>

                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-left space-y-2">
                  <p className="text-sm">
                    <strong>Intensidade inicial:</strong> {d.intensity}
                  </p>
                  <p className="text-sm">
                    <strong>Foco:</strong> estímulos direcionados ao glúteo, sem engrossar a coxa
                  </p>
                  {d.hasEvent && (
                    <p className="text-sm font-semibold text-primary">
                      📅 Como você tem uma data marcada, o ideal é começar ainda hoje para aproveitar os 21 dias do protocolo.
                    </p>
                  )}
                </div>

                <div className="bg-primary/5 p-4 rounded-xl text-left border border-primary/10">
                  <p className="text-sm italic text-muted-foreground">
                    {getConditional() === 'Y' && (
                      <>
                        Foi vendido para você a ideia de que precisa passar horas na academia. O <strong className="text-primary not-italic">Truque da Virgínia</strong> ativa o glúteo em poucos minutos por dia, sem academia e sem coxa grande.
                      </>
                    )}
                    {getConditional() === 'Z' && (
                      <>
                        'Não tenho tempo' é a desculpa #1. O <strong className="text-primary not-italic">Truque da Virgínia</strong> resolve isso: leva poucos minutos, em casa, sem equipamento, sem academia.
                      </>
                    )}
                    {getConditional() === 'X' && (
                      <>
                        Depois dos 40, o corpo responde a estímulos direcionados, não a agachamentos genéricos. É por isso que o <strong className="text-primary not-italic">Truque da Virgínia</strong> funciona tão bem para mulheres 40+.
                      </>
                    )}
                    {getConditional() === 'W' && "Começar do zero é uma VANTAGEM. Nível 1: em pé, sem impacto, sem equipamento, sem academia. Você não precisa estar pronta, só precisa de poucos minutos por dia."}
                  </p>
                </div>

                <button
                  onClick={() => {
                    trackEvent("clique_ver_oferta", { perfil: getConditional() });
                    navigate({ to: "/sales" });
                  }}
                  className="w-full bg-primary hover:bg-primary-hover text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-lg shadow-primary/30"
                >
                  Quero Meu Truque da Virgínia Agora →
                </button>
              </div>
              );
            })()}
        </div>
      </div>
    </div>
  );
}

