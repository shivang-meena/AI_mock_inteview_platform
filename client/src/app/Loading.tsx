export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F4F4F3] [@media(prefers-color-scheme:dark)]:bg-[#0E0E10] transition-colors duration-300">
      <div className="flex flex-col items-center gap-4">

        <div className="w-10 h-10 rounded-[10px] grid place-items-center bg-[#141414] [@media(prefers-color-scheme:dark)]:bg-[#F5F5F4]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
            <defs>
              <linearGradient id="waveGrad" x1="86" y1="96" x2="426" y2="430" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#10B981"/>
                <stop offset="100%" stopColor="#0EA5E9"/>
              </linearGradient>
            </defs>
            <path fill="url(#waveGrad)" d="M150 96 H362 A64 64 0 0 1 426 160 V292 A64 64 0 0 1 362 356 H0 L0 356 L150 356 A64 64 0 0 1 86 292 V160 A64 64 0 0 1 150 96 Z"/>
            <g stroke="#FFFFFF" strokeWidth="22" strokeLinecap="round">
              <line x1="176" y1="202" x2="176" y2="250"/>
              <line x1="216" y1="178" x2="216" y2="274"/>
              <line x1="256" y1="156" x2="256" y2="296"/>
              <line x1="296" y1="178" x2="296" y2="274"/>
              <line x1="336" y1="202" x2="336" y2="250"/>
            </g>
          </svg>
        </div>

        <div className="w-7 h-7 rounded-full border-[3px] border-[#E0E0DD] [@media(prefers-color-scheme:dark)]:border-[#2A2A2D] border-t-[#141414] [@media(prefers-color-scheme:dark)]:border-t-[#F5F5F4] animate-spin" />

        <p className="text-[12.5px] font-semibold text-[#737373] [@media(prefers-color-scheme:dark)]:text-[#9B9B98]">
          Loading...
        </p>
      </div>
    </main>
  );
}