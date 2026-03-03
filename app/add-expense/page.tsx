"use client";

import { useState } from "react";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";

export default function AddExpensePage() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Family Remittance");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <TopBar />
      <main className="flex-1 px-4 py-4">
        <h1 className="text-sm font-semibold mb-3">Add Expense</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200 px-4 py-4 space-y-3"
        >
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-muted">Amount (SAR)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="e.g. 500"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-muted">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary bg-white"
            >
              <option>Family Remittance</option>
              <option>Food & Groceries</option>
              <option>Rent</option>
              <option>Transport</option>
              <option>Others</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-muted">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-muted">Note (optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary min-h-[70px]"
              placeholder="Add any details..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white text-sm font-semibold py-2.5 rounded-xl mt-2"
          >
            Save Expense
          </button>

          {submitted && (
            <p className="text-[11px] text-green-600 mt-2">
              Expense saved (placeholder). Connect backend later.
            </p>
          )}
        </form>
      </main>
      <BottomNav />
    </>
  );
}
