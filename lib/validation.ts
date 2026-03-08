import { z } from 'zod';
import { EXPENSE_CATEGORIES } from '@/lib/categories';

export const incomeSchema = z.object({
  amount: z
    .number({ required_error: 'Amount is required' })
    .positive('Amount must be greater than 0'),
  source: z
    .string({ required_error: 'Source is required' })
    .min(2, 'Source must be at least 2 characters'),
  date: z.string().optional(),
  note: z.string().max(500, 'Note is too long').optional(),
});

export type IncomeFormValues = z.infer<typeof incomeSchema>;

export const expenseSchema = z.object({
  amount: z
    .number({ required_error: 'Amount is required' })
    .positive('Amount must be greater than 0'),
  category: z
    .string({ required_error: 'Category is required' })
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
    .string({ required_error: 'Goal name is required' })
    .min(2, 'Goal name must be at least 2 characters'),
  targetAmount: z
    .number({ required_error: 'Target amount is required' })
    .positive('Target must be greater than 0'),
  savedAmount: z
    .number({ required_error: 'Saved amount is required' })
    .min(0, 'Saved cannot be negative')
    .optional()
    .default(0),
  deadline: z.string().optional(),
});

export type GoalFormValues = z.infer<typeof goalSchema>;

