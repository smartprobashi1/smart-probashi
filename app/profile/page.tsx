"use client";

import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import ProfileCard from "../components/ProfileCard";

export default function ProfilePage() {
  return (
    <>
      <TopBar />
      <main className="flex-1 px-4 py-4 flex flex-col gap-4">
        <ProfileCard />

        <section className="bg-white rounded-2xl border border-slate-200 px-4 py-4">
          <h2 className="text-sm font-semibold mb-3">Account</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted text-[12px]">Country of work</span>
              <span className="font-medium text-[12px]">Saudi Arabia</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted text-[12px]">Currency</span>
              <span className="font-medium text-[12px]">SAR</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted text-[12px]">Language</span>
              <span className="font-medium text-[12px]">English</span>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 px-4 py-4">
          <h2 className="text-sm font-semibold mb-3">Settings</h2>
          <div className="space-y-2 text-sm">
            <button className="w-full text-left text-[12px] text-primary">
              Manage notifications
            </button>
            <button className="w-full text-left text-[12px] text-primary">
              Export data
            </button>
            <button className="w-full text-left text-[12px] text-red-500">
              Log out (placeholder)
            </button>
          </div>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
