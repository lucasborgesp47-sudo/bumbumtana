import { useState, useEffect } from 'react';

export interface QuizData {
  age?: string;
  objective?: string;
  feelings?: string;
  tried?: string[];
  time?: string;
  activityLevel?: string;
  weight?: string;
  height?: string;
}

export const useQuiz = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuizData>(() => {
    const saved = localStorage.getItem('bbg_quiz_data');
    return saved ? JSON.parse(saved) : {};
  });
  const [loading, setLoading] = useState(false);
  const [showDopamine, setShowDopamine] = useState(false);
  const [dopamineType, setDopamineType] = useState<number | null>(null);
  const [showEmotionalOverlay, setShowEmotionalOverlay] = useState(false);

  useEffect(() => {
    localStorage.setItem('bbg_quiz_data', JSON.stringify(data));
  }, [data]);

  const updateData = (newData: Partial<QuizData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = (stepData?: Partial<QuizData>) => {
    if (stepData) {
      updateData(stepData);
    }

    if (step === 2) {
      setDopamineType(1);
      setShowDopamine(true);
    } else if (step === 3) {
      setShowEmotionalOverlay(true);
      setTimeout(() => {
        setShowEmotionalOverlay(false);
        setStep(4);
      }, 3000);
    } else if (step === 4) {
      setDopamineType(2);
      setShowDopamine(true);
    } else if (step === 5) {
      setDopamineType(3);
      setShowDopamine(true);
    } else if (step === 6) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(7);
      }, 3000);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const closeDopamine = () => {
    setShowDopamine(false);
    setStep((prev) => prev + 1);
  };

  const getConditional = () => {
    const { tried, time, age, activityLevel } = data;
    
    // Priority Y > Z > X > W
    if (tried && tried.length > 0 && !tried.includes("Nunca tentei nada direcionado")) return 'Y';
    if (time === "Menos de 10 minutos") return 'Z';
    if (age === "40 a 49 anos" || age === "50+ anos") return 'X';
    if (activityLevel === "Sedentária — nada há meses") return 'W';
    
    return 'Y'; // Default
  };

  return {
    step,
    data,
    updateData,
    nextStep,
    loading,
    showDopamine,
    dopamineType,
    closeDopamine,
    showEmotionalOverlay,
    getConditional,
    setStep
  };
};
