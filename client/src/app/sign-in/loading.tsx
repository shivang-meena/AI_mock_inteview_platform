export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F4F4F3]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-7 h-7 rounded-full border-[3px] border-[#E0E0DD] border-t-[#141414] animate-spin" />
        <p className="text-[12.5px] font-semibold text-[#737373]">Loading sign in...</p>
      </div>
    </main>
  );
}