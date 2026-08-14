import { useState, useEffect } from 'react';

export const useQuiz = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [showDopamine, setShowDopamine] = useState(false);
  const [dopamineType, setDopamineType] = useState<number | null>(null);

  const updateData = (newData: any) => {
    setData((prev: any) => ({ ...prev, ...newData }));
  };

  const nextStep = (stepData?: any) => {
    if (stepData) {
      updateData(stepData);
    }

    if (step === 2 || step === 4 || step === 5) {
      setDopamineType(step === 2 ? 1 : step === 4 ? 2 : 3);
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

  return {
    step,
    data,
    updateData,
    nextStep,
    loading,
    showDopamine,
    dopamineType,
    closeDopamine,
    setStep
  };
};
