'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Income', href: '/add-income', icon: '➕' },
  { name: 'Expense', href: '/add-expense', icon: '➖' },
  { name: 'Goals', href: '/goals', icon: '🎯' },
  { name: 'Profile', href: '/profile', icon: '👤' },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 border-t border-gray-200 dark:border-slate-800 max-w-md mx-auto">
      <div className="flex justify-around py-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center px-3 py-1.5 text-[11px] ${
                active ? 'text-primary font-semibold' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <span className="text-lg mb-0.5">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

