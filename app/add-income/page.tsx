"use client";

import { useState } from "react";
import TopBar from "../components/Header";
import BottomNav from "../components/BottomNavbar";
import { Input, TextArea } from "@/components/Input";
import { Button } from "@/components/Button";
import { useFinanceStore } from "@/store/financeStore";

export default function AddIncomePage() {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
   const addIncome = useFinanceStore((s) => s.addIncome);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = parseFloat(amount);
    if (Number.isNaN(value) || value <= 0) return;

    addIncome({
      amount: value,
      source,
      date: date || new Date().toISOString(),
      note,
    });

    setSubmitted(true);
    setAmount("");
    setSource("");
    setDate("");
    setNote("");
  }

  return (
    <>
      <TopBar />
      <main className="flex-1 px-4 py-4 pb-20">
        <h1 className="text-sm font-semibold mb-3">Add Income</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200 px-4 py-4 space-y-3"
        >
          <Input
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 3000"
            required
          />

          <Input
            label="Source"
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Salary, bonus, etc."
            required
          />

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

          <Button type="submit" fullWidth className="mt-2">
            Save Income
          </Button>

          {submitted && (
            <p className="text-[11px] text-green-600 mt-2 text-[11px]">
              Income saved locally.
            </p>
          )}
        </form>
      </main>
      <BottomNav />
    </>
  );
}
