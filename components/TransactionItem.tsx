import type { Expense, Income } from '@/types/finance';
import { formatCurrency } from '@/lib/currency';

type Props =
  | { type: 'income'; item: Income }
  | { type: 'expense'; item: Expense };

export function TransactionItem(props: Props) {
  const { item } = props;
  const isIncome = props.type === 'income';
  const sign = isIncome ? '+' : '-';
  const color = isIncome ? 'text-green-600' : 'text-red-600';

  const amountLabel = formatCurrency(item.amount, item.currency);
  const title = isIncome ? item.source : item.category;
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

