import { useFinanceStore } from '@/store/financeStore';
import { formatCurrency } from '@/lib/currency';

export function AnalyticsBar() {
  const getMonthlyIncome = useFinanceStore((s) => s.getMonthlyIncome);
  const getMonthlyExpense = useFinanceStore((s) => s.getMonthlyExpense);
  const currency = useFinanceStore((s) => s.currency);

  const now = new Date();
  const monthKey = `${now.getFullYear()}-${now.getMonth() + 1}`;
  const income = getMonthlyIncome(monthKey);
  const expense = getMonthlyExpense(monthKey);

  const max = Math.max(income, expense, 1);

  const incomeWidth = `${Math.round((income / max) * 100)}%`;
  const expenseWidth = `${Math.round((expense / max) * 100)}%`;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-800 px-4 py-3">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold">Income vs Expense</h2>
        <span className="text-[11px] text-muted">
          {now.toLocaleString(undefined, { month: 'short', year: 'numeric' })}
        </span>
      </div>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-green-700">Income</span>
            <span className="text-muted">
              {formatCurrency(income, currency)}
            </span>
          </div>
          <div className="h-2 rounded-full bg-green-50 overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: incomeWidth }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-red-700">Expense</span>
            <span className="text-muted">
              {formatCurrency(expense, currency)}
            </span>
          </div>
          <div className="h-2 rounded-full bg-red-50 overflow-hidden">
            <div
              className="h-full bg-red-500 rounded-full"
              style={{ width: expenseWidth }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

