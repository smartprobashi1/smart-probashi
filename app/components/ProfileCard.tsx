export default function ProfileCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 px-4 py-4 flex items-center gap-3">
      <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-200">
        <img
          src="/placeholder-avatar.png"
          alt="User"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold">Md Smart Probashi</span>
        <span className="text-[11px] text-muted">Overseas worker</span>
      </div>
    </div>
  );
}
