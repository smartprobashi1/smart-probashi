import type { Goal } from '@/types/finance';
import { formatCurrency } from '@/lib/currency';

interface GoalCardProps {
  goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
  const progress = goal.targetAmount > 0 ? goal.savedAmount / goal.targetAmount : 0;
  const pct = Math.min(100, Math.round(progress * 100));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-800 px-4 py-3 mb-3">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{goal.name}</span>
          <span className="text-[11px] text-muted">
            Target: {formatCurrency(goal.targetAmount, goal.currency)} • Saved:{' '}
            {formatCurrency(goal.savedAmount, goal.currency)}
          </span>
          {goal.deadline ? (
            <span className="text-[10px] text-muted mt-0.5">
              Deadline: {new Date(goal.deadline).toLocaleDateString()}
            </span>
          ) : null}
        </div>
        <span className="text-xs font-medium text-primary">{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

