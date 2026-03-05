'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';

interface PwaProviderProps {
  children: ReactNode;
}

export function PwaProvider({ children }: PwaProviderProps) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    const register = async () => {
      try {
        await navigator.serviceWorker.register('/sw.js');
      } catch {
        // ignore registration errors for now
      }
    };

    register();
  }, []);

  return <>{children}</>;
}

