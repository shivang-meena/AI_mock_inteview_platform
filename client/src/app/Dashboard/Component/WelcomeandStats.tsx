interface WelcomeStatsProps {
  dark?: boolean;
  lastSession: {
    role: string;
    overallScore: number | null;
    finishedAt: string | Date;
  } | null;
  mocksCompletedOverall:number;
  averageScoreThisWeek:number;
  averageScoreOverall:number;
  averageScoreThisMonth:number
}

export default function WelcomeStats({ dark = false,
   lastSession, mocksCompletedOverall,
  averageScoreThisWeek,
  averageScoreOverall,
  averageScoreThisMonth
 }: WelcomeStatsProps) {
  const bg = dark ? 'bg-[#0E0E10]' : 'bg-[#F4F4F3]';
  const surface = dark ? 'bg-[#171719]' : 'bg-white';
  const text = dark ? 'text-[#F5F5F4]' : 'text-[#141414]';
  const muted = dark ? 'text-[#9B9B98]' : 'text-[#6B6B68]';
  const line = dark ? 'border-[#2A2A2D]' : 'border-[#E0E0DD]';
  const h = new Date().getHours();
  const part = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  const nowdate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) + ' ';


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
    <>
      {/* Welcome Section */}
      <section className={`flex items-end justify-between gap-5 flex-wrap transition-colors duration-[350ms] ${bg} ${text}`}>
        <div>
          <h1 className="text-[clamp(26px,3.4vw,36px)] font-[750] tracking-[-0.8px] leading-[1.1] font-['Bricolage_Grotesque']">
            Good day, Alex
          </h1>
          <p className={`${muted} text-[14.5px] mt-[7px]`}>{nowdate} {part} Ready to sharpen your answers?</p>
          {lastSession &&
            (<span className={`inline-flex items-center gap-[7px] mt-[13px] text-[12.5px] font-semibold ${surface} border ${line} py-[7px] px-[14px] rounded-[30px] ${muted}`}>
              Last session · {lastSession?.role} · <b className={text}>Score {lastSession?.overallScore}</b> · {getFinishedLabel(lastSession.finishedAt)}
            </span>)
            
          }
        </div>

        <div className="flex gap-2.5 flex-wrap max-[720px]:w-full">
          <button className={`inline-flex items-center gap-[9px] border ${line} py-3 px-5 rounded-xl text-sm font-semibold cursor-pointer transition-all ${surface} ${text} hover:border-current max-[720px]:flex-1 max-[720px]:justify-center`}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 5.5v13l11-6.5z" />
            </svg>
            Start mock interview 
          </button>
          <button className={`inline-flex items-center gap-[9px] border ${line} py-3 px-5 rounded-xl text-sm font-semibold cursor-pointer transition-all ${surface} ${text} hover:border-current max-[720px]:flex-1 max-[720px]:justify-center`}>
            Browse roles
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 gap-3.5 max-[560px]:grid-cols-1">
        <div className={`${surface} border ${line} rounded-[14px] py-5 px-6`}>
          <div className={`text-[11.5px] font-bold tracking-[0.07em] uppercase ${muted}`}>
            Mocks completed
          </div>
          <div className={`font-['Bricolage_Grotesque'] text-[38px] font-[750] tracking-[-1px] my-[10px] mb-1 ${text}`}>
            {mocksCompletedOverall}
          </div>
          <div className={`text-[12.5px] font-semibold ${muted}`}>
            {/* ▲ 12% */}
            {(averageScoreThisWeek>0)?<>📈</>:<>📉</>} {" "}
            {averageScoreThisWeek}%
            this week
          </div>
        </div>

        <div className={`${surface} border ${line} rounded-[14px] py-5 px-6`}>
          <div className={`text-[11.5px] font-bold tracking-[0.07em] uppercase ${muted}`}>
            Average score
          </div>
          <div className={`font-['Bricolage_Grotesque'] text-[38px] font-[750] tracking-[-1px] my-[10px] mb-1 ${text}`}>
            {averageScoreOverall||0}
          </div>
          <div className={`text-[12.5px] font-semibold ${muted}`}>
            
            {(averageScoreThisMonth>0)?<>📈</>:<>📉</>} {" "}
            {averageScoreThisMonth}% 
            this month
          </div>
        </div>
      </section>
    </>
  );
}