type Props = {
  title: string;
  category: string;
  amount: string;
  type: "income" | "expense";
};

export default function TransactionItem({
  title,
  category,
  amount,
  type
}: Props) {
  const sign = type === "income" ? "+" : "-";
  const color = type === "income" ? "text-green-600" : "text-red-600";

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex flex-col">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-[11px] text-muted">{category}</span>
      </div>
      <div className={`text-sm font-semibold ${color}`}>
        {sign}
        {amount}
      </div>
    </div>
  );
}
