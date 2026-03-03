type Props = {
  title: string;
  amount: string;
  subtitle?: string;
};

export default function SummaryCard({ title, amount, subtitle }: Props) {
  return (
    <div className="bg-primary text-white rounded-2xl px-4 py-4 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs opacity-80">{title}</span>
        <span className="text-[10px] bg-white/10 px-2 py-1 rounded-full">
          This month
        </span>
      </div>
      <div className="text-2xl font-semibold mb-1">{amount}</div>
      {subtitle && (
        <div className="text-[11px] text-primarySoft/90">{subtitle}</div>
      )}
    </div>
  );
}
