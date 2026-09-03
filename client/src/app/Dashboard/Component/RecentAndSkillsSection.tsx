
"use client"

import { useState } from "react";
import Link from "next/link";

interface Interview {
  id: string;
  userId: string;

  role: string;
  jobDescription: string | null;
  focusAreas: string[];

  difficulty: "EASY" | "MEDIUM" | "HARD";
  numQuestions: number;

  status: "IN_PROGRESS" | "COMPLETED";

  overallScore: number | null;
  communicationScore: number | null;
  problemSolvingScore: number | null;
  technicalDepthScore: number | null;
  confidenceScore: number | null;

  summary: unknown | null;

  createdAt: string;
  finishedAt: string | null;
}
interface RecentAndSkillsProps {
  dark?: boolean;
  communication: number;
  confidence: number;
  problemSolving: number;
  technicalDepth: number,
  recentInterviews: Interview[]
}

export default function RecentAndSkills({ dark = false,
  communication,
  confidence,
  problemSolving,
  technicalDepth,
  recentInterviews
}: RecentAndSkillsProps) {
 

  const surface = dark ? 'bg-[#171719]' : 'bg-white';
  const surface2 = dark ? 'bg-[#1F1F22]' : 'bg-[#ECECEA]';
  const hoverBg = dark ? 'hover:bg-[#1F1F22]' : 'hover:bg-[#ECECEA]';
  const text = dark ? 'text-[#F5F5F4]' : 'text-[#141414]';
  const muted = dark ? 'text-[#9B9B98]' : 'text-[#6B6B68]';
  const line = dark ? 'border-[#2A2A2D]' : 'border-[#E0E0DD]';
  const barFill = dark ? 'bg-[#F5F5F4]' : 'bg-[#141414]';

  // const recent = [
  //   { title: 'Frontend Developer', meta: 'Yesterday · 10 questions', score: 82, variant: 'good' },
  //   { title: 'System Design Round', meta: 'Monday · 6 questions', score: 71, variant: 'mid' },
  //   { title: 'Behavioral · STAR format', meta: 'Last week · 8 questions', score: 58, variant: 'low' },
  //   { title: 'Backend Engineer', meta: 'Last week · 10 questions', score: 88, variant: 'good' },
  // ];

  const [skills, setSkills] = useState(
    [
      { name: 'Communication', value: communication, },
      { name: 'Problem solving', value: confidence },
      { name: 'Technical depth', value: problemSolving },
      { name: 'Confidence', value: technicalDepth },
    ]
  );

  const scoreClass = (score:number) => {
    if (score>=80) return dark ? 'bg-[#F5F5F4] text-[#0E0E10]' : 'bg-[#141414] text-[#F4F4F3]';
    if (score>=60) return dark ? 'bg-[#2C2413] text-[#D99A2B]' : 'bg-[#F8F0DE] text-[#D99A2B]';
    return dark ? 'bg-[#331815] text-[#E0716A]' : 'bg-[#F8E6E3] text-[#C75146]';
  };

   function getFinishedLabel(finishedDate: Date | string) {
    const date = new Date(finishedDate);

    if (!date || isNaN(date.getTime())) {
      return "";
    }

    const now = new Date();

    // Remove time part, compare only date
    const finishedOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const todayOnly = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const oneDay = 1000 * 60 * 60 * 24;
    const daysDiff = Math.round((todayOnly.getTime() - finishedOnly.getTime()) / oneDay);

    if (daysDiff < 0) {
      return finishedOnly.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }

    if (daysDiff === 0) {
      return "Today";
    }

    if (daysDiff === 1) {
      return "Yesterday";
    }

    if (daysDiff === 2) {
      return "Day Before Yesterday";
    }

    if (daysDiff <= 6) {
      return `${daysDiff} days ago`;
    }

    if (daysDiff <= 13) {
      return "Last Week";
    }

    // Check if date is in previous calendar month
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    if (
      date.getFullYear() === lastMonth.getFullYear() &&
      date.getMonth() === lastMonth.getMonth()
    ) {
      return "Last Month";
    }

    if (daysDiff <= 27) {
      const weeks = Math.floor(daysDiff / 7);
      return `${weeks} weeks ago`;
    }

    return finishedOnly.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }



  return (
    <section className="grid grid-cols-[1.08fr_0.92fr] gap-4 items-start max-[900px]:grid-cols-1">
      {/* Recent interviews */}
      <div className={`${surface} border ${line} rounded-[18px] p-6 transition-colors duration-300`}>
        <div className="flex items-baseline justify-between gap-3 mb-1.5 flex-wrap">
          <h2 className={`text-[19px] font-bold tracking-[-0.4px] font-['Bricolage_Grotesque'] ${text}`}>
            Recent interviews
          </h2>
         <Link href={"/Interviews"}  className={`text-[13px] ${muted} font-semibold underline underline-offset-[3px]`} >
            View all →
         </Link>
        </div>
         
         <div className={`mt-[10px]   one more thigns divide-y ${line}`}>
  {recentInterviews && recentInterviews.length > 0 ? (
    recentInterviews.map((item, idx) => (
     <Link href={`Chat/${item.id}`} key={item.id} >
      <div
        
        className={`group flex items-center gap-[14px] py-[13px] px-[10px] rounded-xl cursor-pointer transition-colors duration-200 ${hoverBg}`}
      >
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis ${text}`}>
            {item.role}
          </h4>
          <span className={`text-xs ${muted}`}>
            {getFinishedLabel(item.finishedAt || "not finished")} · {item.numQuestions} questions
          </span>
        </div>
        <span
          className={`font-['Bricolage_Grotesque'] font-bold text-[13px] py-[5px] px-3 rounded-[30px] shrink-0 ${scoreClass(item.overallScore || 0)}`}
        >
          {item.overallScore}
        </span>
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
    ))
  ) : (
    <div className="flex items-center gap-[14px] py-[13px] px-[10px]">
      <p className={`text-sm ${muted}`}>No interviews yet — start one to see it here.</p>
    </div>
  )}
</div>

      </div>

      {/* Skills overview */}
      <div className={`${surface} border ${line} rounded-[18px] p-6 transition-colors duration-300`}>
        <div className="flex items-baseline justify-between gap-3 mb-1.5 flex-wrap">
          <h2 className={`text-[19px] font-bold tracking-[-0.4px] font-['Bricolage_Grotesque'] ${text}`}>
            Skills overview
          </h2>
          <span className={`text-[13px] ${muted}`}>AI-scored average</span>
        </div>

        <div className="mt-[18px]">
          {skills.map((skill, idx) => (
            <div key={idx} className="mb-[17px] last:mb-0">
              <div className={`flex justify-between text-[13px] font-semibold mb-2 ${text}`}>
                {skill.name}
                <span className={`${muted} font-medium`}>{skill.value}%</span>
              </div>
              <div className={`h-2 ${surface2} rounded-[20px] overflow-hidden`}>
                <span
                  className={`block h-full rounded-[20px] ${barFill} transition-[width] duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]`}
                  style={{ width: `${skill.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// // components/RecentAndSkillsSection.jsx
// export default function RecentAndSkillsSection({ dark = false }) {
//   const interviews = [
//     { title: "Frontend Developer", meta: "Yesterday · 10 questions", score: 82, tone: "good" },
//     { title: "System Design Round", meta: "Monday · 6 questions", score: 71, tone: "mid" },
//     { title: "Behavioral · STAR format", meta: "Last week · 8 questions", score: 58, tone: "low" },
//     { title: "Backend Engineer", meta: "Last week · 10 questions", score: 88, tone: "good" },
//   ];

//   const skills = [
//     { label: "Communication", w: 82 },
//     { label: "Problem solving", w: 74 },
//     { label: "Technical depth", w: 68 },
//     { label: "Confidence", w: 61 },
//   ];

//   const surface = dark ? "bg-[#171719]" : "bg-white";
//   const surface2 = dark ? "bg-[#1F1F22]" : "bg-[#ECECEA]";
//   const line = dark ? "border-[#2A2A2D]" : "border-[#E0E0DD]";
//   const text = dark ? "text-[#F5F5F4]" : "text-[#141414]";
//   const muted = dark ? "text-[#9B9B98]" : "text-[#6B6B68]";

//   const scoreClasses = {
//     good: dark ? "bg-[#F5F5F4] text-[#0E0E10]" : "bg-[#141414] text-[#F4F4F3]",
//     mid: dark ? "bg-[#2C2413] text-[#D99A2B]" : "bg-[#F8F0DE] text-[#D99A2B]",
//     low: dark ? "bg-[#331815] text-[#E0716A]" : "bg-[#F8E6E3] text-[#C75146]",
//   };

//   return (
//     <section className="grid grid-cols-[1.08fr_.92fr] max-[900px]:grid-cols-1 gap-4 items-start">
//       {/* RECENT INTERVIEWS */}
//       <div className={`${surface} border ${line} rounded-[18px] p-6 transition-colors duration-300`}>
//         <div className="flex items-baseline justify-between gap-3 flex-wrap mb-1.5">
//           <h2 className={`font-['Bricolage_Grotesque'] text-[19px] font-bold tracking-[-.4px] ${text}`}>
//             Recent interviews
//           </h2>
//           <a
//             href="#"
//             className={`text-[13px] font-semibold underline underline-offset-[3px] ${muted}`}
//           >
//             View all →
//           </a>
//         </div>

//         <div className="mt-[10px]">
//           {interviews.map((item, i) => (
//             <div
//               key={item.title}
//               className={`flex items-center gap-[14px] px-[10px] py-[13px] rounded-xl cursor-pointer transition-colors duration-200 group ${
//                 i !== 0 ? `border-t ${line}` : ""
//               }`}
//             >
//               <div className="flex-1 min-w-0">
//                 <h4 className={`text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis ${text}`}>
//                   {item.title}
//                 </h4>
//                 <span className={`text-xs ${muted}`}>{item.meta}</span>
//               </div>
//               <span
//                 className={`font-['Bricolage_Grotesque'] font-bold text-[13px] px-3 py-[5px] rounded-full flex-shrink-0 ${scoreClasses[item.tone]}`}
//               >
//                 {item.score}
//               </span>
//               <span className={`flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${muted}`}>
//                 <svg
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2.2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="w-[15px] h-[15px] block"
//                 >
//                   <path d="M9 6l6 6-6 6" />
//                 </svg>
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* SKILLS OVERVIEW */}
//       <div className={`${surface} border ${line} rounded-[18px] p-6 transition-colors duration-300`}>
//         <div className="flex items-baseline justify-between gap-3 flex-wrap mb-1.5">
//           <h2 className={`font-['Bricolage_Grotesque'] text-[19px] font-bold tracking-[-.4px] ${text}`}>
//             Skills overview
//           </h2>
//           <span className={`text-[13px] ${muted}`}>AI-scored average</span>
//         </div>

//         <div className="mt-[18px]">
//           {skills.map((s) => (
//             <div key={s.label} className="mb-[17px] last:mb-0">
//               <div className={`flex justify-between text-sm font-semibold mb-2 ${text}`}>
//                 {s.label} <span className={`font-medium ${muted}`}>{s.w}%</span>
//               </div>
//               <div className={`h-2 rounded-[20px] overflow-hidden ${surface2}`}>
//                 <span
//                   className={`block h-full rounded-[20px] ${dark ? "bg-[#F5F5F4]" : "bg-[#141414]"}`}
//                   style={{ width: `${s.w}%` }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }