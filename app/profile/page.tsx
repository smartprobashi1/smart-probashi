"use client";

import TopBar from "../components/Header";
import BottomNav from "../components/BottomNavbar";
import ProfileCard from "../components/ProfileCard";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useFinanceStore } from "@/store/financeStore";

export default function ProfilePage() {
  const profile = useFinanceStore((s) => s.profile);
  const updateProfile = useFinanceStore((s) => s.updateProfile);
  const currency = useFinanceStore((s) => s.currency);

  return (
    <>
      <TopBar />
      <main className="flex-1 px-4 py-4 flex flex-col gap-4 pb-20">
        <ProfileCard />

        <section className="bg-white rounded-2xl border border-slate-200 px-4 py-4">
          <h2 className="text-sm font-semibold mb-3">Account</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted text-[12px]">Country of work</span>
              <span className="font-medium text-[12px]">{profile.country}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted text-[12px]">Currency</span>
              <span className="font-medium text-[12px]">{currency}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted text-[12px]">Language</span>
              <span className="font-medium text-[12px]">{profile.language}</span>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 px-4 py-4">
          <h2 className="text-sm font-semibold mb-3">Settings</h2>
          <div className="space-y-3 text-sm">
            <Input
              label="Name"
              value={profile.name}
              onChange={(e) => updateProfile({ name: e.target.value })}
            />
            <Input
              label="Country"
              value={profile.country}
              onChange={(e) => updateProfile({ country: e.target.value })}
            />
            <Input
              label="Language"
              value={profile.language}
              onChange={(e) => updateProfile({ language: e.target.value })}
            />

            <div className="pt-1">
              <Button type="button" variant="secondary" fullWidth>
                Export data (coming soon)
              </Button>
            </div>
          </div>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
