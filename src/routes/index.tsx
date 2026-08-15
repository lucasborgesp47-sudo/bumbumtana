import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/")({
  component: PirateWarning,
});

function PirateWarning() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-100">
      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-8">
        <div className="flex justify-center">
          <div className="bg-red-500/10 p-6 rounded-full">
            <ShieldAlert size={64} className="text-red-500 animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-black text-red-500 tracking-tighter">
            ESTA EXTENSÃO FOI PIRATEADA
          </h1>
          
          <div className="h-1 w-24 bg-red-500/30 mx-auto rounded-full" />
          
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium">
            A chave utilizada nesta extensão foi bloqueada por uso não autorizado. 
            Fale com o contato oficial abaixo para adquirir a versão original. 
            FALAR COM O CONTATO OFICIAL (91) 98583-7992 ou no botão abaixo
          </p>
        </div>

        <div className="pt-4">
          <a
            href="https://wa.me/91985837992"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-500 text-white font-bold py-5 px-8 rounded-2xl text-xl transition-all active:scale-95 shadow-lg shadow-green-900/20 uppercase tracking-wide"
          >
            CHAMAR NO WHATSAPP
          </a>
        </div>
        
        <p className="text-slate-500 text-sm font-mono">
          ID de Bloqueio: ERR_PIRACY_DETECTED_04X
        </p>
      </div>
    </div>
  );
}
