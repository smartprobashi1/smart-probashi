"use client";

import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import SummaryCard from "../components/SummaryCard";
import StatPill from "../components/StatPill";
import TransactionItem from "../components/TransactionItem";
import Link from "next/link";

export default function dashboardPage() {
  const recent = [
    {
      title: "Salary - KSA",
      category: "Income",
      amount: "3,000 SAR",
      type: "income" as const
    },
    {
      title: "Family Remittance",
      category: "Expense",
      amount: "1,200 SAR",
      type: "expense" as const
    },
    {
      title: "Food & Groceries",
      category: "Expense",
      amount: "350 SAR",
      type: "expense" as const
    }
  ];

  return (
    <>
      <TopBar />
      <main className="flex-1 flex flex-col px-4 py-4 gap-4">
        <SummaryCard
          title="Net balance"
          amount="1,450 SAR"
          subtitle="After income & expenses this month"
        />

        <div className="flex gap-2">
          <StatPill label="Income" value="3,000 SAR" variant="income" />
          <StatPill label="Expenses" value="1,550 SAR" variant="expense" />
        </div>

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

        <section className="mt-2">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-sm font-semibold">Recent activity</h2>
            <span className="text-[11px] text-primary cursor-pointer">
              View all
            </span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 px-3 py-2">
            {recent.map((t, idx) => (
              <TransactionItem key={idx} {...t} />
            ))}
          </div>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
