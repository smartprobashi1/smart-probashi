'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FloatingActionButtonProps {
  href?: string;
}

export function FloatingActionButton({ href = '/add-income' }: FloatingActionButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(href)}
      className="fixed bottom-16 right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-soft-card hover:bg-primary/90 transition-colors md:right-auto md:left-1/2 md:translate-x-40"
      aria-label="Add transaction"
    >
      <Plus className="h-5 w-5" />
    </button>
  );
}

