

export const EmotionalOverlay = () => {
  return (
    <div
      className="fixed inset-0 z-50 bg-[#1A1A2E]/95 text-white p-6 flex flex-col justify-center items-center text-center animate-in fade-in duration-300"
    >
      <div className="max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-primary">Você não está sozinha.</h2>
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
