import type { ExpenseCategory } from '@/types/finance';

export const EXPENSE_CATEGORIES: { id: ExpenseCategory; label: string }[] = [
  { id: 'family_remittance', label: 'Family Remittance' },
  { id: 'food', label: 'Food & Groceries' },
  { id: 'rent', label: 'Rent' },
  { id: 'transport', label: 'Transport' },
  { id: 'savings', label: 'Savings' },
  { id: 'other', label: 'Other' },
];

export function normalizeCategoryLabel(label: string): ExpenseCategory {
  const lower = label.toLowerCase();
  if (lower.includes('family')) return 'family_remittance';
  if (lower.includes('food') || lower.includes('groc')) return 'food';
  if (lower.includes('rent')) return 'rent';
  if (lower.includes('transport') || lower.includes('travel')) return 'transport';
  if (lower.includes('save')) return 'savings';
  return 'other';
}

