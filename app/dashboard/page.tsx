"use client";

import TopBar from "../components/Header";
import BottomNav from "../components/BottomNavbar";
import Link from "next/link";
import { BalanceCard } from "@/components/BalanceCard";
import { AnalyticsBar } from "@/components/AnalyticsBar";
import { useFinanceStore } from "@/store/financeStore";
import { TransactionItem } from "@/components/TransactionItem";

export default function DashboardPage() {
  const incomes = useFinanceStore((s) => s.incomes);
  const expenses = useFinanceStore((s) => s.expenses);

  const recent = [...incomes.map((i) => ({ type: "income" as const, item: i })), ...expenses.map((e) => ({ type: "expense" as const, item: e }))]
    .sort((a, b) => new Date(b.item.date).getTime() - new Date(a.item.date).getTime())
    .slice(0, 5);

  return (
    <>
      <TopBar />
      <main className="flex-1 flex flex-col px-4 py-4 gap-4 pb-20">
        <BalanceCard />

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
      </main>
      <BottomNav />
    </>
  );
}

