// export default function Loading() {
//   return (
//     <main className="min-h-screen flex items-center justify-center bg-[#F4F4F3]">
//       <div className="flex flex-col items-center gap-4">
//         <div className="w-7 h-7 rounded-full border-[3px] border-[#E0E0DD] border-t-[#141414] animate-spin" />
//         <p className="text-[12.5px] font-semibold text-[#737373]">Loading Dashbaord...</p>
//       </div>
//     </main>
//   );
// }


export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F4F4F3] [@media(prefers-color-scheme:dark)]:bg-[#0E0E10] transition-colors duration-300">
      <div className="flex flex-col items-center gap-4">

        

        <div className="w-7 h-7 rounded-full border-[3px] border-[#E0E0DD] [@media(prefers-color-scheme:dark)]:border-[#2A2A2D] border-t-[#141414] [@media(prefers-color-scheme:dark)]:border-t-[#F5F5F4] animate-spin" />

        <p className="text-[12.5px] font-semibold text-[#737373] [@media(prefers-color-scheme:dark)]:text-[#9B9B98]">
          Loading...
        </p>
      </div>
    </main>
  );
}