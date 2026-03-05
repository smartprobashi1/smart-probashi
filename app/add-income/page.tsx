"use client";

import { useState } from "react";
import TopBar from "../components/Header";
import BottomNav from "../components/BottomNavbar";
import { Input, TextArea } from "@/components/Input";
import { Button } from "@/components/Button";
import { useFinanceStore } from "@/store/financeStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { incomeSchema, type IncomeFormValues } from "@/lib/validation";

export default function AddIncomePage() {
  const addIncome = useFinanceStore((s) => s.addIncome);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IncomeFormValues>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      amount: 0,
      source: "",
      date: "",
      note: "",
    },
  });

  const onSubmit = (values: IncomeFormValues) => {
    const date = values.date || new Date().toISOString().slice(0, 10);

    addIncome({
      amount: values.amount,
      source: values.source,
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
        <h1 className="text-sm font-semibold mb-3">Add Income</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl border border-slate-200 px-4 py-4 space-y-3"
        >
          <Input
            label="Amount"
            type="number"
            {...register("amount", { valueAsNumber: true })}
            placeholder="e.g. 3000"
            required
            error={errors.amount?.message}
          />

          <Input
            label="Source"
            type="text"
            {...register("source")}
            placeholder="Salary, bonus, etc."
            required
            error={errors.source?.message}
          />

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

          <Button type="submit" fullWidth className="mt-2" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Income"}
          </Button>

          {submitted && !isSubmitting && (
            <p className="text-[11px] text-green-600 mt-2">
              Income saved locally.
            </p>
          )}
        </form>
      </main>
      <BottomNav />
    </>
  );
}
