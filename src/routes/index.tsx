import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useQuiz } from "../hooks/useQuiz";
import { ChevronRight } from "lucide-react";
import { DopamineOverlay } from "../components/quiz/DopamineOverlay";

export const Route = createFileRoute("/")({
  component: Index,
});

function ProgressBar({ step }: { step: number }) {
  const percentage = (step / 6) * 100;
  return (
    <div className="w-full bg-slate-200 rounded-full h-2 mb-8">
      <motion.div
        className="bg-primary h-2 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}

function Index() {
  const { step, nextStep, loading, showDopamine, dopamineType, closeDopamine } = useQuiz();

  if (showDopamine) {
    return <DopamineOverlay type={dopamineType as 1 | 2 | 3} onContinue={closeDopamine} />;
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto">
        <ProgressBar step={step} />
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {step === 1 && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Qual a sua idade?</h1>
                <p className="text-muted">Isso calibra a intensidade ideal para o seu metabolismo</p>
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
                <h1 className="text-3xl font-bold">Se você pudesse escolher apenas UMA coisa para mudar nos próximos 21 dias...</h1>
                <div className="grid gap-4">
                  {[
                    "🍑 Levantar o bumbum e dar mais volume",
                    "🦵 Deixar as coxas mais firmes e definidas",
                    "✨ Melhorar a aparência da pele na região",
                    "🎯 Tudo isso junto",
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={nextStep}
                      className="w-full text-left bg-card p-6 rounded-2xl border-2 border-border hover:border-primary transition-all font-bold text-lg"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {step === 7 && (
              <div className="bg-card p-8 rounded-3xl border shadow-xl text-center space-y-6">
                <h2 className="text-2xl font-bold text-primary">🎯 Seu Protocolo Personalizado está pronto!</h2>
                <div className="text-left space-y-2 bg-background p-4 rounded-xl border border-border">
                  <p><strong>Idade:</strong> 30-39 → Intensidade calibrada</p>
                  <p><strong>Objetivo:</strong> Levantar o bumbum</p>
                  <p><strong>Protocolo:</strong> 5 minutos</p>
                </div>
                <button
                  className="w-full bg-primary hover:bg-primary-hover text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-lg shadow-primary/30"
                >
                  Quero Meu Protocolo Agora →
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
