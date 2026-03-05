'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, Target, User } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Profile', href: '/profile', icon: User },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 border-t border-gray-200 dark:border-slate-800 max-w-md mx-auto">
      <div className="flex justify-around py-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center px-3 py-1.5 text-[11px] ${
                active ? 'text-primary font-semibold' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Icon className="h-5 w-5 mb-0.5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


