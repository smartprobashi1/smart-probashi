import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { safeStorage, STORAGE_KEYS } from '@/lib/storage';
import type { CurrencyCode, Expense, Goal, Income, Profile, ThemeMode } from '@/types/finance';

interface FinanceState {
  incomes: Income[];
  expenses: Expense[];
  goals: Goal[];
  profile: Profile;
  theme: ThemeMode;
  currency: CurrencyCode;

  addIncome: (input: Omit<Income, 'id' | 'currency'>) => void;
  addExpense: (input: Omit<Expense, 'id' | 'currency'>) => void;
  addGoal: (input: Omit<Goal, 'id' | 'currency'>) => void;
  updateProfile: (profile: Partial<Profile>) => void;
  setCurrency: (currency: CurrencyCode) => void;
  setTheme: (theme: ThemeMode) => void;

  getMonthlyIncome: (month: string) => number;
  getMonthlyExpense: (month: string) => number;
  getBalance: () => number;
}

const defaultCurrency: CurrencyCode = 'SAR';

const initialProfile: Profile = {
  name: 'Md Smart Probashi',
  country: 'Saudi Arabia',
  currency: defaultCurrency,
  language: 'English',
};

const initialGoals: Goal[] = [
  {
    id: 'demo-goal-land',
    name: 'Buy land',
    targetAmount: 10000,
    savedAmount: 3500,
    deadline: '',
    currency: defaultCurrency,
  },
  {
    id: 'demo-goal-remittance',
    name: 'Send money home',
    targetAmount: 2000,
    savedAmount: 800,
    deadline: '',
    currency: defaultCurrency,
  },
];

function monthKey(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.getFullYear()}-${d.getMonth() + 1}`;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      incomes: [],
      expenses: [],
      goals: initialGoals,
      profile: initialProfile,
      theme: 'light',
      currency: defaultCurrency,

      addIncome: (input) =>
        set((state) => {
          const id = `income-${Date.now()}`;
          const income: Income = {
            id,
            currency: state.currency,
            ...input,
          };
          return { incomes: [income, ...state.incomes] };
        }),

      addExpense: (input) =>
        set((state) => {
          const id = `expense-${Date.now()}`;
          const expense: Expense = {
            id,
            currency: state.currency,
            ...input,
          };
          return { expenses: [expense, ...state.expenses] };
        }),

      addGoal: (input) =>
        set((state) => {
          const id = `goal-${Date.now()}`;
          const goal: Goal = {
            id,
            currency: state.currency,
            ...input,
          };
          return { goals: [...state.goals, goal] };
        }),

      updateProfile: (profile) =>
        set((state) => ({
          profile: { ...state.profile, ...profile },
        })),

      setCurrency: (currency) =>
        set((state) => ({
          currency,
          profile: { ...state.profile, currency },
        })),

      setTheme: (theme) => set(() => ({ theme })),

      getMonthlyIncome: (month) => {
        const key = month || monthKey(new Date().toISOString());
        return get().incomes
          .filter((i) => monthKey(i.date) === key)
          .reduce((sum, i) => sum + i.amount, 0);
      },

      getMonthlyExpense: (month) => {
        const key = month || monthKey(new Date().toISOString());
        return get().expenses
          .filter((e) => monthKey(e.date) === key)
          .reduce((sum, e) => sum + e.amount, 0);
      },

      getBalance: () => {
        const incomeTotal = get().incomes.reduce((sum, i) => sum + i.amount, 0);
        const expenseTotal = get().expenses.reduce((sum, e) => sum + e.amount, 0);
        return incomeTotal - expenseTotal;
      },
    }),
    {
      name: STORAGE_KEYS.FINANCE_STATE,
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({
        incomes: state.incomes,
        expenses: state.expenses,
        goals: state.goals,
        profile: state.profile,
        theme: state.theme,
        currency: state.currency,
      }),
    },
  ),
);

