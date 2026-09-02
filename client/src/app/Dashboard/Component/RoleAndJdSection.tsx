
"use client"
import { useState } from "react";
import {  createInterview} from "@/lib/Api";
import { useRouter } from "next/navigation";
type RoleAndJDSectionprops={
  dark:boolean;
  token:string|null
}
// components/RoleAndJDSection.jsx
export default function RoleAndJDSection({ dark = false,token }:RoleAndJDSectionprops) {
  const router=useRouter();
  // const roles = [
  //   { code: "FE", role: "Frontend Developer", skills: "React · JS · CSS" },
  //   { code: "BE", role: "Backend Engineer", skills: "APIs · DB · Node" },
  //   { code: "DS", role: "Data Scientist", skills: "Python · ML · Stats" },
  //   { code: "DO", role: "DevOps Engineer", skills: "CI/CD · Cloud · K8s" },
  //   { code: "UI", role: "UI/UX Designer", skills: "Figma · Research" },
  //   { code: "PM", role: "Product Manager", skills: "Strategy · Metrics" },
  // ];
 const roles = [
  { code: "FE", role: "Frontend Developer", skills: "React · JS · CSS" },
  { code: "BE", role: "Backend Engineer", skills: "APIs · DB · Node" },
  { code: "DS", role: "Data Scientist", skills: "Python · ML · Stats" },
  { code: "DO", role: "DevOps Engineer", skills: "CI/CD · Cloud · K8s" },
  { code: "UI", role: "UI/UX Designer", skills: "Figma · Research" },
  { code: "PM", role: "Product Manager", skills: "Strategy · Metrics" },
  { code: "HR", role: "HR Manager", skills: "Recruitment · People · HR" },
  { code: "GAI", role: "Generative AI Developer", skills: "LLMs · RAG · AI Agents" },
  { code: "MLE", role: "AI/ML Engineer", skills: "Python · ML · Deep Learning" },
  { code: "FS", role: "Full Stack Developer", skills: "React · Node · DB" },
];
  const chips = [
    "JavaScript",
    "React",
    "System Design",
    "SQL",
    "Python",
    "DSA",
    "Communication",
    "Leadership",
  ];

  const surface = dark ? "bg-[#171719]" : "bg-white";
  const surface2 = dark ? "bg-[#1F1F22]" : "bg-[#ECECEA]";
  const line = dark ? "border-[#2A2A2D]" : "border-[#E0E0DD]";
  const text = dark ? "text-[#F5F5F4]" : "text-[#141414]";
  const muted = dark ? "text-[#9B9B98]" : "text-[#6B6B68]";

  const [selectedRole, setSelectedRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
const [difficulty, setDifficulty] = useState<"EASY" | "MEDIUM" | "HARD">("MEDIUM");
const [questionCount, setQuestionCount] = useState<number>(10);
async function  createinteview() {
  const interview = await createInterview(token, { role: selectedRole, jobDescription: jobDescription, focusAreas: selectedChips, difficulty,numQuestions:questionCount });
router.push(`/Chat/${interview.id}`);
}

  // 2. Add this helper function to handle clicking
  const toggleChip = (chip:string) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) // Remove if already selected
        : [...prev, chip]                // Add if not selected
    );
  }
  return (
    <section id="roleinterviewsection" className="grid grid-cols-[1.08fr_.92fr] max-[900px]:grid-cols-1 gap-4 items-start">
      {/* ROLE CARD */}
      <div className={`${surface} border ${line} rounded-[18px] p-6 transition-colors duration-300`}>
        <div className="flex items-baseline justify-between gap-3 flex-wrap mb-1.5">
          <h2 className={`font-['Bricolage_Grotesque'] text-[19px] font-bold tracking-[-.4px] ${text}`}>
            Choose your role
          </h2>
          <span className={`text-[13px] ${muted}`}>Pick one to tailor questions</span>
        </div>
        <p className={`text-[13.5px] ${muted} mb-[18px]`}>
          The AI adapts difficulty and topics to the role you select.
        </p>


        <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] max-[440px]:grid-cols-1 gap-[10px]">
          {roles.map((r) => {
            const isSelected = selectedRole === r.code; // Check if this card is the selected one

            return (
              <div
                key={r.code} // Best practice to use a unique ID for keys
                onClick={() => setSelectedRole(r.code)} // Update state on click
                className={`relative border-[1.5px] rounded-[14px] p-4 cursor-pointer transition-all duration-200
          ${isSelected
                    ? "border-blue-500 ring-2 ring-blue-500/20 bg-blue-50 dark:bg-blue-900/20" // 🎯 HIGHLIGHT STYLES
                    : `${line} ${surface}` // Normal styles
                  }
        `}
              >
                {/* Checkmark Circle */}
                <span
                  className={`absolute top-[13px] right-[13px] w-5 h-5 rounded-full border-[1.5px] grid place-items-center transition-all duration-200
            ${isSelected
                      ? "border-blue-500 bg-blue-500" // 🎯 Filled blue circle when selected
                      : `${line} bg-transparent`
                    }
          `}
                >
                  {/* SVG Checkmark */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`w-[11px] h-[11px] transition-all duration-200 
              ${isSelected
                        ? "opacity-100 scale-100 stroke-white" // 🎯 Show checkmark
                        : `opacity-0 scale-[.4] ${dark ? "stroke-[#0E0E10]" : "stroke-[#F4F4F3]"}` // Hidden state
                      }
            `}
                  >
                    <path d="M4 12.5 9.5 18 20 6.5" />
                  </svg>
                </span>

                {/* Code Badge */}
                <div
                  className={`w-9 h-9 rounded-[10px] grid place-items-center font-['Bricolage_Grotesque'] font-bold text-[13px] mb-[11px] ${surface2} ${text}`}
                >
                  {r.code}
                </div>

                {/* Role Title */}
                <h3 className={`text-[14.5px] font-semibold mb-[3px] ${text}`}>{r.role}</h3>

                {/* Skills */}
                <div className={`text-xs ${muted}`}>{r.skills}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* JD CARD */}
      <div className={`${surface} border ${line} rounded-[18px] p-6 transition-colors duration-300`}>
        <div className="flex items-baseline justify-between gap-3 flex-wrap mb-1.5">
          <h2 className={`font-['Bricolage_Grotesque'] text-[19px] font-bold tracking-[-.4px] ${text}`}>
            Job description
          </h2>
          <span className={`text-[13px] ${muted}`}>Optional but recommended</span>
        </div>
        <p className={`text-[13.5px] ${muted} mb-[18px]`}>
          Paste a real JD — questions will match its requirements.
        </p>

        <div className={`flex justify-between text-[12.5px] font-semibold mb-2 ${muted}`}>
          <span>Job description</span>
          <span>0 / 3000</span>
        </div>
        <textarea
          onChange={(e) => { setJobDescription(e.target.value) }}
          value={jobDescription}
          maxLength={3000}
          placeholder={`Paste the job description here, or describe the role you're preparing for… e.g. “Senior React developer, 4+ years, system design focus”`}
          className={`w-full min-h-[130px] resize-y border ${line} rounded-[14px] ${surface2} ${text} px-[15px] py-[13px] text-[13.5px] leading-[1.55] focus:outline-none placeholder:${muted}`}
        />

        <div className={`flex justify-between text-[12.5px] font-semibold mb-2 mt-4 ${muted}`}>
          <span>Focus areas</span>
          <span>up to 4</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 mb-1">
          {chips.map((c) => {
            const isSelected = selectedChips.includes(c);

            return (
              <button
                key={c}
                onClick={() => toggleChip(c)}
                className={`px-[13px] py-[6px] rounded-full text-[12.5px] font-medium transition-all duration-[180ms] border
          ${isSelected
                    // 🎯 SELECTED STYLES (Solid color, readable text)
                    ? "bg-blue-500 border-blue-500 text-white dark:bg-blue-600 dark:border-blue-600 shadow-sm"
                    // 🟢 NORMAL STYLES
                    : `${line} ${surface} ${muted} hover:bg-gray-100 dark:hover:bg-gray-800`
                  }
               `}
              >
                {c}
              </button>
            );
          })}
          </div>

            <div className="flex gap-[22px] flex-wrap my-5">
    {/* Difficulty */}
    <div>
      <div className={`text-xs font-bold tracking-[.06em] uppercase ${muted} mb-[9px]`}>
        Difficulty
      </div>

      <div className={`inline-flex ${surface2} rounded-[11px] p-[3px] gap-0.5`}>
        {(["EASY", "MEDIUM", "HARD"] as const).map((d) => {
          const isSelected = difficulty === d;

          return (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`border-0 bg-transparent px-4 py-[7px] rounded-[9px] text-[13px] font-semibold transition-all duration-200
                ${
                  isSelected
                    ? `${surface} ${text}`
                    : muted
                }
              `}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>

    {/* Questions */}
    <div>
      <div className={`text-xs font-bold tracking-[.06em] uppercase ${muted} mb-[9px]`}>
        Questions
      </div>

      <div className="flex gap-2">
        {[5, 10, 15].map((q) => {
          const isSelected = questionCount === q;

          return (
            <button
              key={q}
              onClick={() => setQuestionCount(q)}
              className={`min-w-[44px] px-3 py-[7px] rounded-[11px] border text-[13px] font-semibold transition-all duration-[180ms]
                ${
                  isSelected
                    ? `${text} border-current ${surface2}`
                    : `${line} ${surface} ${muted}`
                }
              `}
            >
              {q}
            </button>
          );
        })}
      </div>
    </div>
  </div>

        {!selectedRole && <div className={`text-[13px] ${muted} ${surface2} rounded-[11px] px-[15px] py-[11px] mb-[18px] leading-[1.5]`}>
          No role selected yet — pick one on the left to begin.
        </div>}


        <div className="flex gap-[10px] flex-wrap">
          <button
            
            onClick={()=>{
              createinteview();
            }}
            className={`inline-flex items-center gap-[9px] border border-transparent px-5 py-3 rounded-xl text-sm font-semibold 
            ${!selectedRole? 'opacity-35 cursor-not-allowed':""}
                ${dark ? "bg-[#F5F5F4] text-[#0E0E10]" : "bg-[#141414] text-[#F4F4F3]"
              }`}
          >
            Generate interview
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <button
            className={`inline-flex items-center gap-[9px] border ${line} ${surface} ${text} px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200`}
          >
            Save draft
          </button>
        </div>
      </div>
    </section>
  );
}