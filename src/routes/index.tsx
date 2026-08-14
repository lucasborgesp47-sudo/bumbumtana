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
