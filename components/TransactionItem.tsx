import type { Expense, Income } from '@/types/finance';
import { formatCurrency } from '@/lib/currency';

type IncomeProps = { type: 'income'; item: Income };
type ExpenseProps = { type: 'expense'; item: Expense };
type Props = IncomeProps | ExpenseProps;

export function TransactionItem(props: Props) {
  const isIncome = props.type === 'income';
  const sign = isIncome ? '+' : '-';
  const color = isIncome ? 'text-green-600' : 'text-red-600';

  const item = isIncome ? (props.item as Income) : (props.item as Expense);

  const amountLabel = formatCurrency(item.amount, item.currency);
  const title = isIncome ? (item as Income).source : (item as Expense).category;
  const subtitle = new Date(item.date).toLocaleDateString();

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex flex-col">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-[11px] text-muted">{subtitle}</span>
        {item.note ? (
          <span className="text-[10px] text-muted/80 mt-0.5 line-clamp-1">
            {item.note}
          </span>
        ) : null}
      </div>
      <div className={`text-sm font-semibold ${color}`}>
        {sign}
        {amountLabel}
      </div>
    </div>
  );
}


