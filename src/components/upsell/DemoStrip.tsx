import demo1 from "@/assets/demo-1-ponte.jpg";
import demo2 from "@/assets/demo-2-concha.jpg";
import demo3 from "@/assets/demo-3-coice.jpg";

const STEPS = [
  { img: demo1, title: "Ponte com pausa", desc: "Segura 3 s no alto" },
  { img: demo2, title: "Abertura lateral", desc: "Joelho abre, pés juntos" },
  { img: demo3, title: "Coice no tapete", desc: "Sobe devagar, desce devagar" },
];

/**
 * Demonstração da Ativação Profunda (prova por demonstração).
 * [PROVA REAL] quando houver relatos reais de alunas do Turbo, entram logo abaixo deste bloco.
 * [CONFIRMAR] o conteúdo do Turbo no app precisa ter estes 3 movimentos.
 */
export function DemoStrip({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-3">
      {!compact && (
        <p className="text-center text-sm font-bold uppercase tracking-wide text-[var(--brand)]">
          Veja a Ativação Profunda: 3 movimentos, cerca de 1 minuto cada
        </p>
      )}
      <div className="grid grid-cols-3 gap-2">
        {STEPS.map((step, i) => (
          <figure key={step.title} className="space-y-1 text-center">
            <img
              src={step.img}
              alt={`Ativação Profunda, passo ${i + 1}: ${step.title}`}
              width={180}
              height={180}
              loading="lazy"
              decoding="async"
              className="w-full aspect-square object-cover rounded-xl border border-[var(--line)]"
            />
            <figcaption className="leading-tight">
              <span className="block text-[12px] font-bold">
                {i + 1}. {step.title}
              </span>
              {!compact && (
                <span className="block text-[11px] text-[var(--ink-2)]">{step.desc}</span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
