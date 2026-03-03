"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Home" },
  { href: "/add-income", label: "Income" },
  { href: "/add-expense", label: "Expense" },
  { href: "/goals", label: "Goals" },
  { href: "/profile", label: "Profile" }
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="border-t border-slate-200 bg-white px-2 py-1">
      <div className="flex justify-between text-xs">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center py-2 rounded-md ${
                active ? "text-primary font-semibold" : "text-muted"
              }`}
            >
              <span
                className={`mb-1 h-1 w-6 rounded-full ${
                  active ? "bg-primary" : "bg-transparent"
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
