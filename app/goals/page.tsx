"use client";

import { useState } from "react";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import GoalCard from "../components/GoalCard";

export default function GoalsPage() {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");
  const [goals, setGoals] = useState<
    { title: string; target: string; saved: string; progress: number }[]
  >([
    {
      title: "Family Savings",
      target: "10,000 SAR",
      saved: "3,500 SAR",
      progress: 0.35
    },
    {
      title: "Return Ticket",
      target: "2,000 SAR",
      saved: "800 SAR",
      progress: 0.4
    }
  ]);

  function handleAddGoal(e: React.FormEvent) {
    e.preventDefault();
    const t = parseFloat(target || "0");
    const s = parseFloat(saved || "0");
    const progress = t > 0 ? Math.min(1, s / t) : 0;
    setGoals((prev) => [
      ...prev,
      {
        title: title || "New Goal",
        target: `${t} SAR`,
        saved: `${s} SAR`,
        progress
      }
    ]);
    setTitle("");
    setTarget("");
    setSaved("");
  }

  return (
    <>
      <TopBar />
      <main className="flex-1 px-4 py-4 flex flex-col gap-4">
        <section>
          <h1 className="text-sm font-semibold mb-2">Your goals</h1>
          {goals.map((g, idx) => (
            <GoalCard key={idx} {...g} />
          ))}
        </section>

        <section className="mt-2">
          <h2 className="text-sm font-semibold mb-2">Create new goal</h2>
          <form
            onSubmit={handleAddGoal}
            className="bg-white rounded-2xl border border-slate-200 px-4 py-4 space-y-3"
          >
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-muted">Goal title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. Family savings"
                required
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[11px] text-muted">Target (SAR)</label>
                <input
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-[11px] text-muted">Saved (SAR)</label>
                <input
                  type="number"
                  value={saved}
                  onChange={(e) => setSaved(e.target.value)}
                  className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white text-sm font-semibold py-2.5 rounded-xl mt-2"
            >
              Save Goal
            </button>
          </form>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
