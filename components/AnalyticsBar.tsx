'use client';

import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useFinanceStore } from '@/store/financeStore';

export function AnalyticsBar() {
  const summaries = useFinanceStore((s) => s.getMonthlySummaries(6));

  const data = useMemo(
    () =>
      summaries.map((s) => ({
        name: s.month.slice(5), // MM
        income: s.income,
        expense: s.expense,
      })),
    [summaries],
  );

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-800 px-4 py-3">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold">Last 6 months</h2>
        <span className="text-[11px] text-muted">Income vs Expense</span>
      </div>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} />
            <YAxis tickLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#16a34a" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="#dc2626" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


