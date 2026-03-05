'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useFinanceStore } from '@/store/financeStore';
import type { ThemeMode } from '@/types/finance';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useFinanceStore((s) => s.theme);
  const setTheme = useFinanceStore((s) => s.setTheme);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    if (!theme) {
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, [theme, setTheme]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
}

export function useThemeToggle(): { theme: ThemeMode; toggle: () => void } {
  const theme = useFinanceStore((s) => s.theme);
  const setTheme = useFinanceStore((s) => s.setTheme);

  const toggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggle };
}

