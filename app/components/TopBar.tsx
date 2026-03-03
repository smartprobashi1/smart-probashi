"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopBar() {
  const pathname = usePathname();

  const titleMap: Record<string, string> = {
    "/": "Smart Probashi",
    "/dashboard": "Dashboard",
    "/add-income": "Add Income",
    "/add-expense": "Add Expense",
    "/goals": "Goals",
    "/profile": "Profile"
  };

  const title = titleMap[pathname] ?? "Smart Probashi";

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primarySoft flex items-center justify-center text-primary font-bold text-sm">
          SP
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted">Welcome back</span>
          <span className="text-sm font-semibold">{title}</span>
        </div>
      </div>
      <Link
        href="/profile"
        className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden"
      >
        <img
          src="/placeholder-avatar.png"
          alt="Profile"
          className="h-full w-full object-cover"
        />
      </Link>
    </header>
  );
}
