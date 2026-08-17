// components/InterviewNotFound.tsx


import { useRouter } from "next/navigation";
import Link from "next/link";
interface InterviewNotFoundProps {
  dark: boolean;
}

export default function InterviewNotFound({ dark }: InterviewNotFoundProps) {
  const router = useRouter();

  // same theme tokens as MainChatArea, kept consistent
  const chatBg = dark ? "bg-[#0D0F14]" : "bg-[#F8F8F5]";
  const chatText = dark ? "text-[#ECEAE3]" : "text-[#141414]";
  const chatMuted = dark ? "text-[#8A90A0]" : "text-[#6B6F7A]";
  const chatSurface = dark ? "bg-[#171A21]" : "bg-white";
  const chatBorder = dark ? "border-[#262B36]" : "border-[#E4E4E0]";
  const chatDim = dark ? "text-[#5C6270]" : "text-[#8A8F99]";
  const chatAccentBg = dark ? "bg-[#E8A33D]" : "bg-[#B8720A]";
  const chatAccentText = dark ? "text-[#0D0F14]" : "text-white";
  const chatErrorBorder = dark ? "border-[#E5484D]/30" : "border-[#CD2B31]/30";
  const chatErrorBg = dark ? "bg-[#E5484D]/10" : "bg-[#CD2B31]/10";
  const chatErrorText = dark ? "text-[#E5484D]" : "text-[#CD2B31]";

  return (
    <div className={`flex flex-col items-center justify-center h-screen px-4 ${chatBg} ${chatText}`}>
      <div className={`max-w-sm w-full rounded-2xl border px-6 py-8 flex flex-col items-center text-center ${chatSurface} ${chatBorder}`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${chatErrorBg} border ${chatErrorBorder}`}>
          <svg
            className={`w-6 h-6 ${chatErrorText}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h2 className="text-base font-semibold mb-1.5">Interview not found</h2>
        <p className={`text-sm mb-6 ${chatMuted}`}>
          This interview doesn't exist, or you don't have access to it.
        </p>
        <Link className={`max-w-sm w-full rounded-2xl border px-6 py-8 flex flex-col items-center text-center ${chatSurface} ${chatBorder}`} href={`/Dashboard`}>
        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={() => router.push("/interview/new")}
            className={`w-full py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 ${chatAccentBg} ${chatAccentText}`}
          >
            Start a new interview
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className={`w-full py-2.5 rounded-lg text-sm font-medium border transition-colors ${chatBorder} ${chatMuted}`}
          >
            Go to dashboard
          </button>
        </div>
        </Link>
      </div>

      <p className={`text-xs mt-6 ${chatDim}`}>
        If you think this is a mistake, try refreshing the page.
      </p>
    </div>
  );
}