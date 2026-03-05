"use client";

import { useState } from "react";
import TopBar from "../components/Header";
import BottomNav from "../components/BottomNavbar";
import { Input, TextArea } from "@/components/Input";
import { Button } from "@/components/Button";
import { useFinanceStore } from "@/store/financeStore";

export default function AddExpensePage() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Family Remittance");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const addExpense = useFinanceStore((s) => s.addExpense);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = parseFloat(amount);
    if (Number.isNaN(value) || value <= 0) return;

    addExpense({
      amount: value,
      category,
      date: date || new Date().toISOString(),
      note,
    });

    setSubmitted(true);
    setAmount("");
    setCategory("Family Remittance");
    setDate("");
    setNote("");
  }

  return (
    <>
      <TopBar />
      <main className="flex-1 px-4 py-4 pb-20">
        <h1 className="text-sm font-semibold mb-3">Add Expense</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200 px-4 py-4 space-y-3"
        >
          <Input
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 500"
            required
          />

          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-muted">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-white dark:bg-slate-900"
            >
              <option>Family Remittance</option>
              <option>Food & Groceries</option>
              <option>Rent</option>
              <option>Transport</option>
              <option>Others</option>
            </select>
          </div>

          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <TextArea
            label="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add any details..."
          />

          <Button type="submit" fullWidth className="mt-2" variant="secondary">
            Save Expense
          </Button>

          {submitted && (
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
