export type CurrencyCode = 'SAR' | 'USD' | 'EUR' | 'BDT' | 'INR' | 'PKR';

export type TransactionType = 'income' | 'expense';

export type ExpenseCategory =
  | 'family_remittance'
  | 'food'
  | 'rent'
  | 'transport'
  | 'savings'
  | 'other';

export interface Income {
  id: string;
  amount: number;
  source: string;
  date: string; // ISO string
  note?: string;
  currency: CurrencyCode;
}

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  date: string; // ISO string
  note?: string;
  currency: CurrencyCode;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  deadline?: string; // ISO date
  currency: CurrencyCode;
  completed?: boolean;
}

export interface Profile {
  name: string;
  country: string;
  currency: CurrencyCode;
  language: string;
}

export type ThemeMode = 'light' | 'dark';

