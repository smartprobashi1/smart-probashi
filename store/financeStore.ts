import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { safeStorage, STORAGE_KEYS } from '@/lib/storage';
import type {
  CurrencyCode,
  Expense,
  ExpenseCategory,
  Goal,
  Income,
  Profile,
  ThemeMode,
} from '@/types/finance';
import { getLastMonths, getMonthKey } from '@/utils/date';

interface MonthlySummary {
  month: string; // yyyy-MM
  income: number;
  expense: number;
  balance: number;
}

interface CategorySummaryItem {
  category: ExpenseCategory;
  total: number;
}

interface FinanceState {
  incomes: Income[];
  expenses: Expense[];
  goals: Goal[];
  profile: Profile;
  theme: ThemeMode;
  currency: CurrencyCode;

  addIncome: (input: Omit<Income, 'id' | 'currency'>) => void;
  editIncome: (id: string, patch: Partial<Income>) => void;
  deleteIncome: (id: string) => void;

  addExpense: (input: Omit<Expense, 'id' | 'currency'>) => void;
  editExpense: (id: string, patch: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;

  addGoal: (input: Omit<Goal, 'id' | 'currency' | 'completed'>) => void;
  toggleGoalCompleted: (id: string) => void;

  updateProfile: (profile: Partial<Profile>) => void;
  setCurrency: (currency: CurrencyCode) => void;
  setTheme: (theme: ThemeMode) => void;

  getMonthlyIncome: (month: string) => number;
  getMonthlyExpense: (month: string) => number;
  getBalance: () => number;
  getMonthlySummaries: (monthsBack: number) => MonthlySummary[];
  getCategorySummaryForMonth: (month: string) => CategorySummaryItem[];
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

      editIncome: (id, patch) =>
        set((state) => ({
          incomes: state.incomes.map((i) => (i.id === id ? { ...i, ...patch } : i)),
        })),

      deleteIncome: (id) =>
        set((state) => ({
          incomes: state.incomes.filter((i) => i.id !== id),
        })),

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

      editExpense: (id, patch) =>
        set((state) => ({
          expenses: state.expenses.map((e) => (e.id === id ? { ...e, ...patch } : e)),
        })),

      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),

      addGoal: (input) =>
        set((state) => {
          const id = `goal-${Date.now()}`;
          const goal: Goal = {
            id,
            currency: state.currency,
            completed: false,
            ...input,
          };
          return { goals: [...state.goals, goal] };
        }),

      toggleGoalCompleted: (id) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id ? { ...g, completed: !g.completed } : g,
          ),
        })),

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
        const key = month || getMonthKey(new Date());
        return get().incomes
          .filter((i) => getMonthKey(i.date) === key)
          .reduce((sum, i) => sum + i.amount, 0);
      },

      getMonthlyExpense: (month) => {
        const key = month || getMonthKey(new Date());
        return get().expenses
          .filter((e) => getMonthKey(e.date) === key)
          .reduce((sum, e) => sum + e.amount, 0);
      },

      getBalance: () => {
        const incomeTotal = get().incomes.reduce((sum, i) => sum + i.amount, 0);
        const expenseTotal = get().expenses.reduce((sum, e) => sum + e.amount, 0);
        return incomeTotal - expenseTotal;
      },

      getMonthlySummaries: (monthsBack) => {
        const months = getLastMonths(monthsBack);
        return months.map((month) => {
          const income = get()
            .incomes.filter((i) => getMonthKey(i.date) === month)
            .reduce((sum, i) => sum + i.amount, 0);
          const expense = get()
            .expenses.filter((e) => getMonthKey(e.date) === month)
            .reduce((sum, e) => sum + e.amount, 0);
          return {
            month,
            income,
            expense,
            balance: income - expense,
          };
        });
      },

      getCategorySummaryForMonth: (month) => {
        const key = month || getMonthKey(new Date());
        const map = new Map<ExpenseCategory, number>();
        get()
          .expenses.filter((e) => getMonthKey(e.date) === key)
          .forEach((e) => {
            map.set(e.category, (map.get(e.category) ?? 0) + e.amount);
          });
        return Array.from(map.entries()).map(([category, total]) => ({
          category,
          total,
        }));
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

