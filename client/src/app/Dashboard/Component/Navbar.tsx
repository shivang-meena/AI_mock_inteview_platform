"use client"
import { Bricolage_Grotesque } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export default function Topbar({dark,setdark}:{dark:boolean,setdark:React.Dispatch<React.SetStateAction<boolean>>}) {
        const router=useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const bg = dark ? ' bg-[#0E0E10]' : 'bg-[#F4F4F3]';
  const surface = dark ? 'bg-[#171719]' : 'bg-white';
  const text = dark ? 'text-[#F5F5F4]' : 'text-[#141414]';
  const subtext = dark ? 'text-[#8B8B8E]' : 'text-[#6B6B68]';
  const line = dark ? 'border-[#2A2A2D]' : 'border-[#E0E0DD]';
  const hover = dark ? 'hover:bg-[#202023]' : 'hover:bg-[#F4F4F3]';

  const markBg = dark ? 'bg-[#F5F5F4]' : 'bg-[#141414]';
  const markText = dark ? 'text-[#0E0E10]' : 'text-[#F4F4F3]';
//   const dotBg = dark ? 'bg-[#55a51c]' : 'bg-[#55a51c]'
  const dotBorder = dark ? 'border-[#F5F5F4]' : 'border-[#141414]';

async function handleLogout() {
  await signOut({ redirect: false });
  router.push("/sign-in");
  router.refresh(); 
}

function DevHireLogo({ darklogo }: { darklogo: boolean }) {
  const accent = darklogo ? '#E8A33D' : '#B8720A';
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 7 4 12 8 17" />
      <polyline points="16 7 20 12 16 17" />
      <polyline points="10.2 12.3 11.4 13.6 13.8 10.6" />
    </svg>
  );
}
  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={` ${bricolage.className} sticky    top-0 z-30 flex items-center gap-[14px] py-3.5 px-7 max-[720px]:py-3 max-[720px]:px-4 border-b transition-colors duration-300 ${bg} ${line}`}>
      <div className="flex items-center gap-[11px]">
        <div className={`rounded-[10px] w-9 h-9 flex items-center justify-center
          flex-1 min-w-0 flex items-center gap-2 text-sm font-medium
          ${markBg}`}>
          {DevHireLogo(dark)}
        </div>
        <div className={`font-['Bricolage_Grotesque'] font-bold text-lg tracking-[-0.3px] ${text}`}>  Inteview Platform</div>
      </div>

      <div className="ml-auto flex items-center gap-3 ">
        <div className={`flex items-center gap-[7px] border-white text-xs font-semibold border rounded-full whitespace-nowrap transition-colors ${surface} ${line} ${text} px-3.5 py-1.5 max-[720px]:px-[11px] max-[720px]:py-[9px]`}>
          <span className={`w-[7px] h-[7px] rounded-full relative  bg-[#55a51c]`}>
            <span className={`absolute -inset-[3px] rounded-full border-2 animate-ping ${dotBorder}`}></span>
          </span>
          <span className="max-[720px]:hidden">AI ready</span>
        </div>

        {/* Profile with dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            className={`w-[38px] h-[38px] rounded-full grid place-items-center font-['Bricolage_Grotesque'] font-bold text-sm cursor-pointer flex-shrink-0 transition-transform active:scale-95 ${markBg} ${markText}`}
            title="Alex R."
            aria-label="Open profile menu"
            aria-expanded={profileOpen}
            onClick={() => setProfileOpen(prev => !prev)}
          >
            AR
          </button>

          {profileOpen && (
            <div
              className={`absolute right-0 mt-2 w-64 rounded-[14px] border shadow-lg overflow-hidden z-40 transition-colors duration-300 ${surface} ${line}`}
            >
              {/* User info */}
              <div className={`flex items-center gap-3 px-4 py-3.5 border-b ${line}`}>
                <div className={`w-9 h-9 rounded-full grid place-items-center font-['Bricolage_Grotesque'] font-bold text-sm flex-shrink-0 ${markBg} ${markText}`}>
                  AR
                </div>
                <div className="min-w-0">
                  <div className={`text-sm font-semibold truncate ${text}`}>Alex R.</div>
                  <div className={`text-xs truncate ${subtext}`}>alex.r@example.com</div>
                </div>
              </div>

              {/* Dark mode toggle */}
              <div className={`flex items-center justify-between px-4 py-3 ${text}`}>
                <span className="text-sm font-medium">Dark Mode</span>
                <button
                  role="switch"
                  aria-checked={dark}
                  aria-label="Toggle dark mode"
                  onClick={() => setdark(prev => !prev)}
                  className={`relative w-[42px] h-[24px] rounded-full transition-colors duration-200 cursor-pointer border ${line} ${dark ? 'bg-[#55a51c]' : 'bg-[#E0E0DD]'}`}
                >
                  <span
                    className={`absolute top-[2px] left-[2px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-transform duration-200 ${dark ? 'translate-x-[18px]' : 'translate-x-0'}`}
                  />
                </button>
              </div>

              <div className={`border-t ${line}`} />

              {/* Logout */}
              <button
                className={`w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-left cursor-pointer transition-colors text-[#E5484D] ${hover}`}
                onClick={() => {
                  setProfileOpen(false);
                  handleLogout();
                  console.log("logout clicked");
                }}
              >
                <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}




// "use client"
// import { Bricolage_Grotesque } from "next/font/google";

// const bricolage = Bricolage_Grotesque({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });


// export default function Topbar({dark,setdark}:{dark:boolean,setdark:React.Dispatch<React.SetStateAction<boolean>>}) {
//         //   const[dark,setdark]=useState<boolean>(false);
//   const bg = dark ? ' bg-[#0E0E10]' : 'bg-[#F4F4F3]';
//   const surface = dark ? 'bg-[#171719]' : 'bg-white';
//   const text = dark ? 'text-[#F5F5F4]' : 'text-[#141414]';
//   const line = dark ? 'border-[#2A2A2D]' : 'border-[#E0E0DD]';
  
//   const markBg = dark ? 'bg-[#F5F5F4]' : 'bg-[#141414]';
//   const markText = dark ? 'text-[#0E0E10]' : 'text-[#F4F4F3]';
// //   const dotBg = dark ? 'bg-[#55a51c]' : 'bg-[#55a51c]';
// const border=dark?'border-[#F5F5F4]':'border-[#1b1b1a]'
//   const dotBorder = dark ? 'border-[#F5F5F4]' : 'border-[#141414]';

//   return (
//     <header className={` ${bricolage.className} sticky    top-0 z-30 flex items-center gap-[14px] py-3.5 px-7 max-[720px]:py-3 max-[720px]:px-4 border-b transition-colors duration-300 ${bg} ${line}`}>
//       <div className="flex items-center gap-[11px]">
//         <div className={`w-9 h-9 rounded-[10px] grid pt-1 place-items-center ${markBg}`}>
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
//             <defs>
//               <linearGradient id="waveGrad" x1="86" y1="96" x2="426" y2="430" gradientUnits="userSpaceOnUse">
//                 <stop offset="0%" stopColor="#10B981"/>
//                 <stop offset="100%" stopColor="#0EA5E9"/>
//               </linearGradient>
//             </defs>
//             <path fill="url(#waveGrad)" d="M150 96 H362 A64 64 0 0 1 426 160 V292 A64 64 0 0 1 362 356 H0 L0 356 L150 356 A64 64 0 0 1 86 292 V160 A64 64 0 0 1 150 96 Z"/>
//             <g stroke="#FFFFFF" strokeWidth="22" strokeLinecap="round">
//               <line x1="176" y1="202" x2="176" y2="250"/>
//               <line x1="216" y1="178" x2="216" y2="274"/>
//               <line x1="256" y1="156" x2="256" y2="296"/>
//               <line x1="296" y1="178" x2="296" y2="274"/>
//               <line x1="336" y1="202" x2="336" y2="250"/>
//             </g>
//           </svg>
//         </div>
//         <div className={`font-['Bricolage_Grotesque'] font-bold text-lg tracking-[-0.3px] ${text}`}>  Inteview Platform</div>
//       </div>

//       <div className="ml-auto flex items-center gap-3 ">
//         <div className={`flex items-center gap-[7px] border-white text-xs font-semibold border rounded-full whitespace-nowrap transition-colors ${surface} ${line} ${text} px-3.5 py-1.5 max-[720px]:px-[11px] max-[720px]:py-[9px]`}>
//           <span className={`w-[7px] h-[7px] rounded-full relative  bg-[#55a51c]`}>
//             <span className={`absolute -inset-[3px] rounded-full border-2 animate-ping ${dotBorder}`}></span>
//           </span>
//           <span className="max-[720px]:hidden">AI ready</span>
//         </div>

//         <button className={`w-[38px] h-[38px] rounded-[11px] border grid place-items-center transition-colors border-1  flex-shrink-0 cursor-pointer ${border} ${line} ${surface} ${text}`} aria-label="Toggle theme"
//         onClick={()=>{
//             setdark(prev=>!prev);
//         }}
//         >
//           {dark ? (
//             <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M19.4 4.6l-1.8 1.8M6.4 17.6l-1.8 1.8"/></svg>
//           ) : (
//             <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13.5A8 8 0 0 1 10.5 4 8 8 0 1 0 20 13.5z"/></svg>
//           )}
//         </button>

//         <div className={`w-[38px] h-[38px] rounded-full grid place-items-center font-['Bricolage_Grotesque'] font-bold text-sm cursor-pointer flex-shrink-0 ${markBg} ${markText}`} title="Alex R.">
//           AR
//         </div>
//       </div>
//     </header>
//   );
// }

// import { Bricolage_Grotesque } from "next/font/google";

// const bricolage = Bricolage_Grotesque({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });
// function Navbar() {
//     return <><div className={`${bricolage.className} h-16 border-[1px] border-[#E0E0DD] border-b-1 flex items-center justify-between px-4 pl-1`}>
//           <div className=" box flex  font-extrabold text-lg justify-center items-center  ">

// <div className=" flex items-center justify-center   mt-2">

//      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="75" height="100">
//   <defs>
//     <linearGradient id="waveGrad" x1="86" y1="96" x2="426" y2="430" gradientUnits="userSpaceOnUse">
//       <stop offset="0%" stop-color="#10B981"/>
//       <stop offset="100%" stop-color="#0EA5E9"/>
//     </linearGradient>
//   </defs>
//   <path fill="url(#waveGrad)" d="M150 96 H362 A64 64 0 0 1 426 160 V292 A64 64 0 0 1 362 356 H0 L0 356 L150 356 A64 64 0 0 1 86 292 V160 A64 64 0 0 1 150 96 Z"/>
//   <g stroke="#FFFFFF" stroke-width="22" stroke-linecap="round">
//     <line x1="176" y1="202" x2="176" y2="250"/>
//     <line x1="216" y1="178" x2="216" y2="274"/>
//     <line x1="256" y1="156" x2="256" y2="296"/>
//     <line x1="296" y1="178" x2="296" y2="274"/>
//     <line x1="336" y1="202" x2="336" y2="250"/>
//   </g>
// </svg>
// </div>

//      Inteview Platform
//           </div>

//           <div className="dark-name-profile flex items-center gap-3 ">
//                <div className="darkmode  border-[1px] border-[#E0E0DD] rounded-xl h-10 w-10 flex items-center justify-center">
//                     <div className="h-4 w-4 " >
//                         <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M19.4 4.6l-1.8 1.8M6.4 17.6l-1.8 1.8"/></svg>
//                     </div>
//                </div>
//                <div className="profilelogo border rounded-3xl font-bold bg-black text-white h-10 text-sm w-10 flex items-center justify-center ">
//                   AR
//                </div>
//           </div>
//         </div></>
// }
// export default Navbar;