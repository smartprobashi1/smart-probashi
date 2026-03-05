import { useFinanceStore } from '@/store/financeStore';
import { formatCurrency } from '@/lib/currency';

export function BalanceCard() {
  const balance = useFinanceStore((s) => s.getBalance());
  const currency = useFinanceStore((s) => s.currency);
  const getMonthlyIncome = useFinanceStore((s) => s.getMonthlyIncome);
  const getMonthlyExpense = useFinanceStore((s) => s.getMonthlyExpense);

  const now = new Date();
  const monthKey = `${now.getFullYear()}-${now.getMonth() + 1}`;
  const income = getMonthlyIncome(monthKey);
  const expense = getMonthlyExpense(monthKey);

  const balanceLabel = formatCurrency(balance, currency);
  const incomeLabel = formatCurrency(income, currency);
  const expenseLabel = formatCurrency(expense, currency);

  return (
    <div className="bg-primary text-white rounded-2xl px-4 py-4 shadow-soft-card">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs opacity-80">Total balance</span>
        <span className="text-[10px] bg-white/10 px-2 py-1 rounded-full">
          This month
        </span>
      </div>
      <div className="text-2xl font-semibold mb-1">{balanceLabel}</div>
      <div className="flex justify-between text-[11px] text-primarySoft">
        <span>Income: {incomeLabel}</span>
        <span>Expenses: {expenseLabel}</span>
      </div>
    </div>
  );
}

