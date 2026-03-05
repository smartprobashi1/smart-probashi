import { z } from 'zod';
import { EXPENSE_CATEGORIES } from '@/lib/categories';

export const incomeSchema = z.object({
  amount: z
    .number()
    .positive('Amount must be greater than 0'),
  source: z
    .string()
    .min(2, 'Source must be at least 2 characters'),
  date: z.string().optional(),
  note: z.string().max(500, 'Note is too long').optional(),
});

export type IncomeFormValues = z.infer<typeof incomeSchema>;

export const expenseSchema = z.object({
  amount: z
    .number()
    .positive('Amount must be greater than 0'),
  category: z
    .string()
    .refine(
      (val) => EXPENSE_CATEGORIES.some((c) => c.id === val),
      'Invalid category',
    ),
  date: z.string().optional(),
  note: z.string().max(500, 'Note is too long').optional(),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;

export const goalSchema = z.object({
  name: z
    .string()
    .min(2, 'Goal name must be at least 2 characters'),
  targetAmount: z
    .number()
    .positive('Target must be greater than 0'),
  savedAmount: z
    .number()
    .min(0, 'Saved cannot be negative')
    .optional()
    .default(0),
  deadline: z.string().optional(),
});

export type GoalFormValues = z.infer<typeof goalSchema>;

