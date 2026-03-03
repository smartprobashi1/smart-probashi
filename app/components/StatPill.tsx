type Props = {
  label: string;
  value: string;
  variant?: "income" | "expense" | "neutral";
};

export default function StatPill({ label, value, variant = "neutral" }: Props) {
  const color =
    variant === "income"
      ? "bg-green-50 text-green-700"
      : variant === "expense"
      ? "bg-red-50 text-red-700"
      : "bg-slate-50 text-slate-700";

  return (
    <div className={`flex-1 rounded-xl px-3 py-2 ${color}`}>
      <div className="text-[11px] opacity-70">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
