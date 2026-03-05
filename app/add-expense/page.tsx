"use client";

import { useState } from "react";
import TopBar from "../components/Header";
import BottomNav from "../components/BottomNavbar";
import { Input, TextArea } from "@/components/Input";
import { Button } from "@/components/Button";
import { useFinanceStore } from "@/store/financeStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseSchema, type ExpenseFormValues } from "@/lib/validation";
import { EXPENSE_CATEGORIES } from "@/lib/categories";

export default function AddExpensePage() {
  const addExpense = useFinanceStore((s) => s.addExpense);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: 0,
      category: EXPENSE_CATEGORIES[0]?.id ?? "family_remittance",
      date: "",
      note: "",
    },
  });

  const onSubmit = (values: ExpenseFormValues) => {
    const date = values.date || new Date().toISOString().slice(0, 10);

    addExpense({
      amount: values.amount,
      category: values.category as any,
      date,
      note: values.note,
    });

    setSubmitted(true);
    reset();
  };

  return (
    <>
      <TopBar />
      <main className="flex-1 px-4 py-4 pb-20">
        <h1 className="text-sm font-semibold mb-3">Add Expense</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl border border-slate-200 px-4 py-4 space-y-3"
        >
          <Input
            label="Amount"
            type="number"
            {...register("amount", { valueAsNumber: true })}
            placeholder="e.g. 500"
            required
            error={errors.amount?.message}
          />

          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-muted">Category</label>
            <select
              {...register("category")}
              className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-white dark:bg-slate-900"
            >
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category?.message && (
              <p className="text-[10px] text-red-500 mt-0.5">
                {errors.category.message}
              </p>
            )}
          </div>

          <Input
            label="Date"
            type="date"
            {...register("date")}
          />

          <TextArea
            label="Note (optional)"
            {...register("note")}
            placeholder="Add any details..."
            error={errors.note?.message}
          />

          <Button
            type="submit"
            fullWidth
            className="mt-2"
            variant="secondary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Expense"}
          </Button>

          {submitted && !isSubmitting && (
            <p className="text-[11px] text-green-600 mt-2">
              Expense saved locally.
            </p>
          )}
        </form>
      </main>
      <BottomNav />
    </>
  );
}
