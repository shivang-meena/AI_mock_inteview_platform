"use client"
import { useEffect } from "react";
import { useSession,signOut } from "next-auth/react";
interface ServerErrorProps {
  dark: boolean;
  label?: string;
  onRetry?: () => void;
}

function ServerError({ dark, label = "We couldn't load your data right now.", onRetry }: ServerErrorProps) {
  const bg = dark ? 'bg-[#0E0E10]' : 'bg-[#F4F4F3]';
  const cardBg = dark ? 'bg-[#18181B]' : 'bg-white';
  const border = dark ? 'border-[#27272A]' : 'border-[#E4E4E7]';
  const textPrimary = dark ? 'text-white' : 'text-black';
  const textSecondary = dark ? 'text-gray-400' : 'text-gray-500';
  const iconBg = dark ? 'bg-[#2A1215]' : 'bg-red-50';
  const iconColor = dark ? 'text-red-400' : 'text-red-500';
  const btnBg = dark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800';


  return (
    <div className={`${bg} min-h-screen w-full flex items-center justify-center transition-colors duration-[350ms] px-4`}>
      <div className={`${cardBg} ${border} border rounded-2xl px-8 py-10 max-w-[420px] w-full flex flex-col items-center text-center gap-4 transition-colors duration-[350ms]`}>
        <div className={`${iconBg} w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-[350ms]`}>
          <svg
            className={`${iconColor} w-7 h-7`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className={`${textPrimary} text-[17px] font-semibold`}>
            Server Error
          </h2>
          <p className={`${textSecondary} text-sm leading-relaxed`}>
            {label}
          </p>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className={`${btnBg} mt-1 px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200`}
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ServerError;