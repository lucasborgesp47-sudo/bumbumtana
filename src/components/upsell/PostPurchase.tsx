import { useEffect, useState, type ReactNode } from "react";
import { Check } from "lucide-react";

/** Primeiro nome salvo no quiz (mesmo navegador). Vazio se a pessoa veio de outro funil. */
export function useBuyerName() {
  const [name, setName] = useState("");
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("bbg_quiz_data") || "{}");
      const first =
        String(saved?.name || "")
          .trim()
          .split(/\s+/)[0] || "";
      setName(first);
    } catch {
      // storage indisponível: segue sem nome
    }
  }, []);
  return name;
}

/** Vai para a próxima etapa mantendo a query string (token da Kiwify, UTMs). */
export function goToStep(path: string) {
  if (typeof window === "undefined") return;
  window.location.href = `${path}${window.location.search}`;
}

/** Barra "passo X de 3" que reforça que o acesso ainda está sendo liberado. */
export function PostPurchaseProgress({ step }: { step: 1 | 2 | 3 }) {
  const labels = ["Compra aprovada", "Ajuste do protocolo", "Acesso liberado"];
  return (
    <div className="bg-[var(--ink)] text-white px-5 py-3">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between gap-2">
          {labels.map((label, i) => {
            const n = i + 1;
            const done = n < step || step === 3;
            const current = n === step && step !== 3;
            return (
              <div key={label} className="flex-1 flex flex-col items-center gap-1 text-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    done
                      ? "bg-[var(--ok)]"
                      : current
                        ? "bg-[var(--brand)] animate-pulse"
                        : "bg-white/20"
                  }`}
                >
                  {done ? <Check size={14} strokeWidth={3} /> : n}
                </div>
                <span
                  className={`text-[11px] leading-tight ${current || done ? "opacity-100" : "opacity-60"}`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Section({
  children,
  tone = "plain",
}: {
  children: ReactNode;
  tone?: "plain" | "soft";
}) {
  return (
    <section className={`px-5 py-10 ${tone === "soft" ? "bg-[var(--brand-soft)]" : ""}`}>
      <div className="max-w-md mx-auto space-y-4">{children}</div>
    </section>
  );
}

export function Disclaimer() {
  return (
    <footer className="px-5 py-8 text-center border-t border-[var(--line)] bg-[var(--surface-2)]">
      <p className="text-[11px] text-[var(--ink-2)] leading-relaxed max-w-md mx-auto">
        Resultados variam de pessoa para pessoa. Este produto não substitui acompanhamento médico ou
        de profissional de educação física.
      </p>
    </footer>
  );
}
