"use client";

import TopBar from "../components/Header";
import BottomNav from "../components/BottomNavbar";
import Link from "next/link";
import { BalanceCard } from "@/components/BalanceCard";
import { AnalyticsBar } from "@/components/AnalyticsBar";
import { useFinanceStore } from "@/store/financeStore";
import { TransactionItem } from "@/components/TransactionItem";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { formatDisplayDate } from "@/utils/date";
import { Edit3, Trash2 } from "lucide-react";

export default function DashboardPage() {
  const hydrated = useIsHydrated();
  const incomes = useFinanceStore((s) => s.incomes);
  const expenses = useFinanceStore((s) => s.expenses);
  const deleteIncome = useFinanceStore((s) => s.deleteIncome);
  const deleteExpense = useFinanceStore((s) => s.deleteExpense);
  const editIncome = useFinanceStore((s) => s.editIncome);
  const editExpense = useFinanceStore((s) => s.editExpense);

  const recent = [...incomes.map((i) => ({ type: "income" as const, item: i })), ...expenses.map((e) => ({ type: "expense" as const, item: e }))]
    .sort((a, b) => new Date(b.item.date).getTime() - new Date(a.item.date).getTime())
    .slice(0, 5);

  const all = [...incomes.map((i) => ({ type: "income" as const, item: i })), ...expenses.map((e) => ({ type: "expense" as const, item: e }))]
    .sort((a, b) => new Date(b.item.date).getTime() - new Date(a.item.date).getTime());

  const handleDelete = (type: "income" | "expense", id: string) => {
    if (type === "income") deleteIncome(id);
    else deleteExpense(id);
  };

  const handleEditAmount = (type: "income" | "expense", id: string, current: number) => {
    const input = window.prompt("Update amount", current.toString());
    if (!input) return;
    const amount = Number(input);
    if (Number.isNaN(amount) || amount <= 0) return;
    if (type === "income") editIncome(id, { amount });
    else editExpense(id, { amount });
  };

  return (
    <>
      <TopBar />
      <main className="flex-1 flex flex-col px-4 py-4 gap-4 pb-20">
        {!hydrated ? (
          <div className="h-28 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        ) : (
          <BalanceCard />
        )}

        <div className="flex gap-2">
          <Link
            href="/add-income"
            className="flex-1 bg-green-50 text-green-700 text-xs font-semibold py-2 rounded-xl text-center"
          >
            + Add Income
          </Link>
          <Link
            href="/add-expense"
            className="flex-1 bg-red-50 text-red-700 text-xs font-semibold py-2 rounded-xl text-center"
          >
            + Add Expense
          </Link>
        </div>

        <AnalyticsBar />

        <section className="mt-1">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-sm font-semibold">Recent activity</h2>
            <span className="text-[11px] text-primary cursor-pointer">
              Last 5
            </span>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-800 px-3 py-2">
            {recent.length === 0 ? (
              <p className="text-[11px] text-muted py-2">
                No transactions yet. Start by adding income or expense.
              </p>
            ) : (
              recent.map((t) => (
                <TransactionItem key={t.item.id} type={t.type} item={t.item as any} />
              ))
            )}
          </div>
        </section>

        <section className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-sm font-semibold">History</h2>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-800 px-3 py-2 max-h-64 overflow-y-auto">
            {all.length === 0 ? (
              <p className="text-[11px] text-muted py-2">
                Your full history will appear here.
              </p>
            ) : (
              all.map((t) => (
                <div
                  key={t.item.id}
                  className="flex items-center justify-between py-2 border-b last:border-b-0 border-slate-100 dark:border-slate-800"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {t.type === "income" ? t.item.source : t.item.category}
                    </span>
                    <span className="text-[11px] text-muted">
                      {formatDisplayDate(t.item.date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                      onClick={() => handleEditAmount(t.type, t.item.id, t.item.amount)}
                      aria-label="Edit amount"
                    >
                      <Edit3 className="h-4 w-4 text-slate-500" />
                    </button>
                    <button
                      type="button"
                      className="p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30"
                      onClick={() => handleDelete(t.type, t.item.id)}
                      aria-label="Delete transaction"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
      <BottomNav />
      <FloatingActionButton />
    </>
  );
}

