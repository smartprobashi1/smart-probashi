import { useState, useEffect } from 'react';

export type ThemeType = 'light' | 'dark' | 'fintech' | 'ocean' | 'emerald';

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    return (localStorage.getItem('sp-theme') as ThemeType) || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-fintech', 'theme-ocean', 'theme-emerald');
    if (theme === 'dark') root.classList.add('dark');
    else if (theme === 'fintech') root.classList.add('theme-fintech');
    else if (theme === 'ocean') root.classList.add('theme-ocean');
    else if (theme === 'emerald') root.classList.add('theme-emerald');
    localStorage.setItem('sp-theme', theme);
  }, [theme]);

  return { theme, setTheme: setThemeState };
}
