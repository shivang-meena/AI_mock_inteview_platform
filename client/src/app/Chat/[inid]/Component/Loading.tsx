"use client"

import { useState } from "react";
import { useEffect } from "react";
type LoadingSpinnerProps = {
  dark: boolean;
  label?: string;
};


export default function LoadingSpinner({ dark, label = "Loading..." }: LoadingSpinnerProps) {
       const[labelin,setlabelin]=useState(label||"loading...");
       setInterval(() => {
         setlabelin("Loading Messeages...");
       }, 500);


       useEffect(() => {
  let count = 0;

  const interval = setInterval(() => {
    count++;

    if (count === 1) {
   setlabelin("Messegest received ");
    } 
    else if (count === 2) {
     setlabelin("Dispalying Messeages");
    } 
    else if (count === 3) {
      setlabelin("almost ready");
      clearInterval(interval);
    }
  }, 2000);

  return () => clearInterval(interval);
}, []);

  const bg = dark ? 'bg-[#0E0E10]' : 'bg-[#F4F4F3]';
  const spinnerTrack = dark ? 'border-[#2A2A2D]' : 'border-[#E0E0DD]';
  const spinnerHead = dark ? 'border-t-[#F5F5F4]' : 'border-t-[#141414]';
  const text = dark ? 'text-[#9B9B98]' : 'text-[#737373]';

  return (
    <main className={`min-h-screen flex items-center justify-center ${bg} transition-colors duration-300`}>
      <div className="flex flex-col items-center gap-4">
        <div className={`w-7 h-7 rounded-full border-[3px] ${spinnerTrack} ${spinnerHead} animate-spin`} />
        <p className={`text-[12.5px] font-semibold ${text}`}>
          {labelin}
        </p>
      </div>
    </main>
  );
}