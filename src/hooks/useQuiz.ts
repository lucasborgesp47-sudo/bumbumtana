import { useState, useEffect } from 'react';

export interface QuizData {
  name?: string;
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
    if (typeof window === 'undefined') return {};
    try {
      const saved = window.localStorage.getItem('bbg_quiz_data');
      const parsed = saved ? JSON.parse(saved) : {};
      // Normalize legacy/corrupt values: `tried` must always be an array
      if (parsed && !Array.isArray(parsed.tried)) {
        parsed.tried = typeof parsed.tried === 'string' && parsed.tried ? [parsed.tried] : [];
      }
      return parsed;
    } catch {
      return {};
    }
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

  // Independent multi-select toggle (never clears other options)
  const toggleTried = (option: string) => {
    setData((prev) => {
      const current = Array.isArray(prev.tried) ? prev.tried : [];
      return {
        ...prev,
        tried: current.includes(option)
          ? current.filter((t) => t !== option)
          : [...current, option],
      };
    });
  };

  const nextStep = (stepData?: Partial<QuizData>) => {
    if (stepData) {
      updateData(stepData);
    }

    // Step mapping (Total steps increased due to split):
    // 1: Age
    // 2: Objective
    // (Dopamine 1)
    // 3: Feelings
    // (Emotional)
    // 4: Tried
    // (Dopamine 2)
    // 5: Time (Minutes)
    // 6: Activity Level
    // (Dopamine 3)
    // 7: Physical Data (Weight/Height)
    // (Loading)
    // 8: Results

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
    } else if (step === 6) { // Now happens after step 6 (Activity Level)
      setDopamineType(3);
      setShowDopamine(true);
    } else if (step === 7) { // Now happens after step 7 (Physical Data)
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(8);
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
    if (activityLevel === "Sedentária — parada há meses") return 'W';
    
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
