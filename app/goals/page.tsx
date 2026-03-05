"use client";

import { useState } from "react";
import TopBar from "../components/Header";
import BottomNav from "../components/BottomNavbar";
import { GoalCard } from "@/components/GoalCard";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useFinanceStore } from "@/store/financeStore";
import type { Goal } from "@/types/finance";

export default function GoalsPage() {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");
  const [deadline, setDeadline] = useState("");

  const goals = useFinanceStore((s) => s.goals);
  const addGoal = useFinanceStore((s) => s.addGoal);
  const currency = useFinanceStore((s) => s.currency);

  function handleAddGoal(e: React.FormEvent) {
    e.preventDefault();
    const t = parseFloat(target || "0");
    const s = parseFloat(saved || "0");
    if (Number.isNaN(t) || t <= 0) return;

    const goalInput: Omit<Goal, "id" | "currency"> = {
      name: title || "New Goal",
      targetAmount: t,
      savedAmount: Number.isNaN(s) ? 0 : s,
      deadline: deadline || undefined,
    };

    addGoal(goalInput);
    setTitle("");
    setTarget("");
    setSaved("");
    setDeadline("");
  }

  return (
    <>
      <TopBar />
      <main className="flex-1 px-4 py-4 flex flex-col gap-4 pb-20">
        <section>
          <h1 className="text-sm font-semibold mb-2">Your goals</h1>
          {goals.map((g, idx) => (
            <GoalCard key={g.id ?? idx} goal={g} />
          ))}
          {goals.length === 0 && (
            <p className="text-[11px] text-muted">
              No goals yet. Create your first savings goal below.
            </p>
          )}
        </section>

        <section className="mt-2">
          <h2 className="text-sm font-semibold mb-2">Create new goal</h2>
          <form
            onSubmit={handleAddGoal}
            className="bg-white rounded-2xl border border-slate-200 px-4 py-4 space-y-3"
          >
            <Input
              label="Goal title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Family savings"
              required
            />

            <div className="flex gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <Input
                  label={`Target (${currency})`}
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <Input
                  label={`Saved (${currency})`}
                  type="number"
                  value={saved}
                  onChange={(e) => setSaved(e.target.value)}
                  required
                />
              </div>
            </div>

            <Input
              label="Deadline (optional)"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />

            <Button type="submit" fullWidth className="mt-2">
              Save Goal
            </Button>
          </form>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
