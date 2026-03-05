'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFinanceStore } from '@/store/financeStore';
import { useThemeToggle } from '@/components/ThemeProvider';
import type { CurrencyCode } from '@/types/finance';

const TITLE_MAP: Record<string, string> = {
  '/': 'Smart Probashi',
  '/dashboard': 'Dashboard',
  '/add-income': 'Add Income',
  '/add-expense': 'Add Expense',
  '/goals': 'Goals',
  '/profile': 'Profile',
};

const SUPPORTED_CURRENCIES: CurrencyCode[] = ['SAR', 'BDT', 'INR', 'PKR', 'USD', 'EUR'];

export function Navbar() {
  const pathname = usePathname();
  const title = TITLE_MAP[pathname] ?? 'Smart Probashi';
  const profile = useFinanceStore((s) => s.profile);
  const currency = useFinanceStore((s) => s.currency);
  const setCurrency = useFinanceStore((s) => s.setCurrency);
  const { theme, toggle } = useThemeToggle();

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primarySoft flex items-center justify-center text-primary font-bold text-sm shadow-soft-card">
          SP
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted">Welcome back</span>
          <span className="text-sm font-semibold">{title}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
          className="text-[11px] border border-slate-200 dark:border-slate-700 rounded-full px-2 py-1 bg-white dark:bg-slate-900"
        >
          {SUPPORTED_CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={toggle}
          className="h-8 w-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs bg-white dark:bg-slate-900"
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? '☾' : '☀︎'}
        </button>
        <Link
          href="/profile"
          className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/placeholder-avatar.png"
            alt={profile.name}
            className="h-full w-full object-cover"
          />
        </Link>
      </div>
    </header>
  );
}

