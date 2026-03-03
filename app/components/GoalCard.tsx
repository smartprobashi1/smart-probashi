type Props = {
  title: string;
  target: string;
  saved: string;
  progress: number; // 0-1
};

export default function GoalCard({ title, target, saved, progress }: Props) {
  const pct = Math.round(progress * 100);

  return (
    <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 mb-3">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{title}</span>
          <span className="text-[11px] text-muted">
            Target: {target} • Saved: {saved}
          </span>
        </div>
        <span className="text-xs font-medium text-primary">{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
