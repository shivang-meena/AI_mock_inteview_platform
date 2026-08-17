// app/interviews/page.tsx
"use client";


import { useApiToken } from "@/hooks/useApiToken";
import { useApiData } from "@/hooks/Useapidata";
import { listInterviews } from "@/lib/Api";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";


interface InterviewListItem {
  id: string;
  role: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  numQuestions: number;
  status: "IN_PROGRESS" | "COMPLETED";
  overallScore: number | null;
  createdAt: string;
  finishedAt: string | null;
}

function getFinishedLabel(dateStr: string) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "In progress";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function scoreClass(score: number, dark: boolean) {
  if (score >= 75) return dark ? "bg-[#2E7D32]/20 text-[#66BB6A]" : "bg-[#2E7D32]/10 text-[#2E7D32]";
  if (score >= 50) return dark ? "bg-[#E8A33D]/20 text-[#E8A33D]" : "bg-[#B8720A]/10 text-[#B8720A]";
  return dark ? "bg-[#E5484D]/20 text-[#E5484D]" : "bg-[#CD2B31]/10 text-[#CD2B31]";
}

export default function InterviewsPage() {

  const { dark, setdark } = useTheme();
  const token = useApiToken();

  const { data: interviews, loading, error } = useApiData<InterviewListItem[]>(
    () => listInterviews(token),
    [token],
    !!token
  );

  // theme tokens — same palette as MainChatArea / InterviewNotFound
  const pageBg = dark ? "bg-[#0D0F14]" : "bg-[#F8F8F5]";
  const text = dark ? "text-[#ECEAE3]" : "text-[#141414]";
  const muted = dark ? "text-[#8A90A0]" : "text-[#6B6F7A]";
  const dim = dark ? "text-[#5C6270]" : "text-[#8A8F99]";
  const surface = dark ? "bg-[#171A21]" : "bg-white";
  const border = dark ? "border-[#262B36]" : "border-[#E4E4E0]";
  const hoverBg = dark ? "hover:bg-[#1D212A]" : "hover:bg-[#EDEDE9]";
  const line = dark ? "divide-[#262B36]" : "divide-[#E4E4E0]";
  const badgeText = dark ? "text-[#E8A33D]" : "text-[#B8720A]";
  const badgeBg = dark ? "bg-[#E8A33D]/15 border-[#E8A33D]/20" : "bg-[#B8720A]/10 border-[#B8720A]/20";

  return (
    <div className={`min-h-screen ${pageBg} ${text}`}>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold">All interviews</h1>
            <p className={`text-sm mt-1 ${muted}`}>Every mock interview you ve taken.</p>
          </div>
          <Link href={"/Dashboard"}>
            <button

              className={`text-sm px-4 py-2 rounded-lg font-medium ${dark ? "bg-[#E8A33D] text-[#0D0F14]" : "bg-[#B8720A] text-white"}`}
            >
              New interview
            </button>
          </Link>
        </div>

        <div className={`rounded-2xl border ${surface} ${border}`}>
          {loading && (
            <div className="px-5 py-10 flex flex-col items-center justify-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full animate-pulse ${dark ? "bg-[#E8A33D]" : "bg-[#B8720A]"}`} />
              <p className={`text-sm ${muted}`}>Loading interviews...</p>
            </div>
          )}

          {!loading && error && (
            <div className="px-5 py-10 flex flex-col items-center justify-center gap-1 text-center">
              <p className={`text-sm ${dark ? "text-[#E5484D]" : "text-[#CD2B31]"}`}>
                Couldn&apos;t load your interviews.
              </p>
              <p className={`text-xs ${dim}`}>{error}</p>
            </div>
          )}

          {!loading && !error && interviews && interviews.length === 0 && (
            <div className="px-5 py-12 flex flex-col items-center justify-center text-center gap-3">
              <p className={`text-sm ${muted}`}>No interviews yet.</p>
              <button

                className={`text-sm px-4 py-2 rounded-lg font-medium ${dark ? "bg-[#E8A33D] text-[#0D0F14]" : "bg-[#B8720A] text-white"}`}
              >
                Start your first interview
              </button>
            </div>
          )}

          {!loading && !error && interviews && interviews.length > 0 && (
            <div className={`divide-y ${line}`}>
              {interviews.map((item) => (

                <>
                  <Link href={`Chat/${item.id}`} >
                    <div
                      key={item.id}

                      className={`group flex items-center gap-[14px] py-[14px] px-5 cursor-pointer transition-colors duration-200 ${hoverBg}`}
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis ${text}`}>
                          {item.role}
                        </h4>
                        <span className={`text-xs ${muted}`}>
                          {getFinishedLabel(item.finishedAt || item.createdAt)} · {item.numQuestions} questions · {item.difficulty}
                        </span>
                      </div>

                      {item.status === "COMPLETED" && item.overallScore != null ? (
                        <span className={`font-bold text-[13px] py-[5px] px-3 rounded-[30px] shrink-0 ${scoreClass(item.overallScore, dark)}`}>
                          {item.overallScore}
                        </span>
                      ) : (
                        <span className={`text-xs px-2.5 py-1 rounded-full border shrink-0 ${badgeBg} ${badgeText}`}>
                          In progress
                        </span>
                      )}

                      <span className={`${muted} transition-transform duration-200 shrink-0 group-hover:translate-x-1`}>
                        <svg
                          className="w-[15px] h-[15px] block"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      </span>
                    </div>


                  </Link>
                </>

              ))}
            </div>

          )}
        </div>
      </div>
    </div>
  );
}