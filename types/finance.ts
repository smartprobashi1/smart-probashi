export type CurrencyCode = 'SAR' | 'USD' | 'EUR' | 'BDT' | 'INR' | 'PKR';

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
  category: string;
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
}

export interface Profile {
  name: string;
  country: string;
  currency: CurrencyCode;
  language: string;
}

export type ThemeMode = 'light' | 'dark';

