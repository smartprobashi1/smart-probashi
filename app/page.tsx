import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col justify-between px-4 py-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Smart Probashi</h1>
        <p className="text-sm text-muted mb-6">
          Track your income, expenses, and goals as an overseas worker.
        </p>

        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="block w-full bg-primary text-white text-center py-3 rounded-xl text-sm font-semibold"
          >
            Go to Dashboard
          </Link>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Link
              href="/add-income"
              className="border border-slate-200 rounded-xl py-3 text-center"
            >
              Add Income
            </Link>
            <Link
              href="/add-expense"
              className="border border-slate-200 rounded-xl py-3 text-center"
            >
              Add Expense
            </Link>
            <Link
              href="/goals"
              className="border border-slate-200 rounded-xl py-3 text-center col-span-2"
            >
              View Goals
            </Link>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-center text-muted mt-8">
        Designed for mobile • Best viewed on a phone-sized screen
      </p>
    </main>
  );
}
