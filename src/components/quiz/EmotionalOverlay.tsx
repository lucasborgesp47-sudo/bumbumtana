
import { useEffect, useState } from "react";

export const EmotionalOverlay = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 25); // 100% over ~2.5-3 seconds (matching the 3s timeout in useQuiz)

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1A1A2E]/95 text-white p-6 flex flex-col justify-center items-center text-center animate-in fade-in duration-300"
    >
      <div className="max-w-md space-y-8">
        <h2 className="text-2xl font-bold text-primary">Você não está sozinha.</h2>
        
        <div className="space-y-4">
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden max-w-[280px] mx-auto">
            <div 
              className="bg-primary h-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs font-bold text-primary uppercase tracking-widest animate-pulse">
            Analisando seu perfil
          </p>
        </div>

        <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
          <p>
            E o pior: não é culpa sua. O glúteo é o músculo mais 'preguiçoso' do corpo feminino.
          </p>
          <p>
            Sem a ativação correta, você pode fazer 100 agachamentos e zero resultado.
          </p>
          <p className="font-bold text-white">
            É por isso que academia tradicional não funciona para 89% das mulheres.
          </p>
        </div>
      </div>
    </div>
  );
};
