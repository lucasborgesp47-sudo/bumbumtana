import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import antesImg from "@/assets/marianaentryantes.jpg";
import depoisImg from "@/assets/marianaentrydepois.jpg";

interface EntryGateProps {
  onEnter: () => void;
}

const COUNTDOWN_SECONDS = 5 * 60;
const DEADLINE_STORAGE_KEY = "entryGateDeadline";

function formatCountdown(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export const EntryGate = ({ onEnter }: EntryGateProps) => {
  const [remainingSeconds, setRemainingSeconds] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    let deadline = Number(localStorage.getItem(DEADLINE_STORAGE_KEY));

    if (!deadline || Number.isNaN(deadline)) {
      deadline = Date.now() + COUNTDOWN_SECONDS * 1000;
      localStorage.setItem(DEADLINE_STORAGE_KEY, String(deadline));
    }

    const updateRemaining = () => {
      const secondsLeft = Math.max(0, Math.round((deadline - Date.now()) / 1000));
      setRemainingSeconds(secondsLeft);
    };

    updateRemaining();
    const interval = setInterval(updateRemaining, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background py-8 px-6 overflow-x-hidden overflow-y-auto">
      <div className="max-w-md mx-auto space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-500 text-white text-center py-3 px-2 rounded-xl">
            <span className="block font-bold text-lg leading-tight">SEM</span>
            <span className="block text-sm leading-tight">Truque da Virgínia</span>
          </div>
          <div className="bg-primary text-white text-center py-3 px-2 rounded-xl">
            <span className="block font-bold text-lg leading-tight">COM</span>
            <span className="block text-sm leading-tight">Truque da Virgínia</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="text-center space-y-2">
            <img
              src={antesImg}
              alt="Mariana antes do Truque da Virgínia"
              className="w-full h-auto object-cover rounded-2xl border-2 border-border"
              loading="lazy"
              width={220}
            />
            <p className="font-bold text-sm uppercase tracking-wide">Antes</p>
          </div>
          <div className="text-center space-y-2">
            <img
              src={depoisImg}
              alt="Mariana depois do Truque da Virgínia"
              className="w-full h-auto object-cover rounded-2xl border-2 border-border"
              loading="lazy"
              width={220}
            />
            <p className="font-bold text-sm uppercase tracking-wide">Depois</p>
          </div>
        </div>

        <p className="text-center text-base leading-relaxed">
          Mariana conquistou o bumbum dos seus sonhos em apenas 4 semanas com o{" "}
          <strong className="text-primary">Truque da Virgínia</strong>. <strong>SEM AGACHAMENTO.</strong>
        </p>

        <div className="border-2 border-primary bg-primary/5 rounded-2xl p-4 text-center">
          <p className="text-sm font-medium leading-relaxed">
            ⚠️ Atenção, devido ao alto volume de acessos, esta oportunidade é disponibilizada{" "}
            <strong className="text-primary">gratuitamente apenas 1 vez por pessoa</strong>. Se você
            sair, perderá sua vez.
          </p>
        </div>

        <button
          onClick={onEnter}
          className="w-full bg-primary hover:bg-primary-hover text-white py-5 px-8 rounded-2xl font-bold text-xl flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-primary/25"
        >
          Obter Truque da Virgínia Agora <ChevronRight className="ml-2" />
        </button>

        <p className="text-center text-sm font-bold text-primary">
          Acesso liberado pelos próximos: {formatCountdown(remainingSeconds)}
        </p>
      </div>
    </div>
  );
};
