// // components/Sidebar.jsx





// components/Sidebar.jsx
'use client';

import { useState } from 'react';
interface SidebarProps {
  isOpen: boolean;
  dark: boolean;
}
export default function Sidebar({ isOpen, dark }: SidebarProps) {

  const [conversations, setConversations] = useState([
    { id: '1', title: 'New chat' },
    { id: '2', title: 'Explain quantum computing simply' },
    { id: '3', title: 'Draft a polite email declining a meeting' },
  ]);

  const [activeId, setActiveId] = useState('1');

  // theme tokens
  const asideBg = dark ? 'bg-[#171A21]' : 'bg-[#F1F1EE]';
  const asideBorder = dark ? 'border-[#262B36]' : 'border-[#E4E4E0]';
  const newChatBtn = dark
    ? 'border-[#262B36] text-[#ECEAE3] hover:bg-[#1D212A] hover:border-[#E8A33D88]'
    : 'border-[#E4E4E0] text-[#141414] hover:bg-[#EDEDE9] hover:border-[#E8A33D88]';
  const itemActive = dark ? 'bg-[#1D212A] text-[#ECEAE3]' : 'bg-[#EDEDE9] text-[#141414]';
  const itemInactive = dark
    ? 'text-[#8A90A0] hover:bg-[#1D212A] hover:text-[#ECEAE3]'
    : 'text-[#6B6F7A] hover:bg-[#EDEDE9] hover:text-[#141414]';
  const deleteBtn = dark ? 'text-[#5C6270]' : 'text-[#9A9FA8]';

  const onNewChat = () => {
    const id = Date.now().toString();
    setConversations((prev) => [{ id, title: 'New chat' }, ...prev]);
    setActiveId(id);
  };

  const onSelectChat = (id) => {
    setActiveId(id);
  };

  const onDeleteChat = (id) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <aside
      className={`flex flex-col flex-shrink-0 overflow-hidden transition-[width,background-color,border-color] duration-300 ${asideBg} ${
        isOpen ? `w-[272px] border-r ${asideBorder}` : 'w-0 border-r-0'
      }`}
    >
      <div className="p-3">
        <button
          onClick={onNewChat}
          className={`flex items-center gap-2 w-full rounded-xl px-3 py-2.5 text-sm font-medium bg-transparent border cursor-pointer transition-colors ${newChatBtn}`}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2 flex flex-col gap-0.5">
        {conversations.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelectChat(c.id)}
            className={`group flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
              c.id === activeId ? itemActive : itemInactive
            }`}
          >
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {c.title}
            </span>
            <button
              title="Delete"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(c.id);
              }}
              className={`flex items-center flex-shrink-0 p-1 rounded-md bg-transparent border-none opacity-0 group-hover:opacity-100 cursor-pointer hover:text-[#E5484D] hover:bg-[#E5484D]/10 transition-colors ${deleteBtn}`}
            >
              <svg
                className="w-[13px] h-[13px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}




// 'use client';

// import { useState } from 'react';
// interface SidebarProps{
//     isOpen:boolean;
// }
// export default function Sidebar({isOpen}:SidebarProps) {


//   const [conversations, setConversations] = useState([
//     { id: '1', title: 'New chat' },
//     { id: '2', title: 'Explain quantum computing simply' },
//     { id: '3', title: 'Draft a polite email declining a meeting' },
//   ]);

//   const [activeId, setActiveId] = useState('1');

//   const onNewChat = () => {
//     const id = Date.now().toString();
//     setConversations((prev) => [{ id, title: 'New chat' }, ...prev]);
//     setActiveId(id);
//   };

//   const onSelectChat = (id) => {
//     setActiveId(id);
//   };

//   const onDeleteChat = (id) => {
//     setConversations((prev) => prev.filter((c) => c.id !== id));
//   };

//   return (
//     <aside
//       className={`flex flex-col flex-shrink-0 overflow-hidden transition-[width] duration-300 bg-[#171A21] ${
//         isOpen ? 'w-[272px] border-r border-[#262B36]' : 'w-0 border-r-0'
//       }`}
//     >
//       <div className="p-3">
//         <button
//           onClick={onNewChat}
//           className="flex items-center gap-2 w-full rounded-xl px-3 py-2.5 text-sm font-medium bg-transparent border border-[#262B36] text-[#ECEAE3] cursor-pointer hover:bg-[#1D212A] hover:border-[#E8A33D88] transition-colors"
//         >
//           <svg
//             className="w-4 h-4"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <line x1="12" y1="5" x2="12" y2="19" />
//             <line x1="5" y1="12" x2="19" y2="12" />
//           </svg>
//           New chat
//         </button>
//       </div>

//       <div className="flex-1 overflow-y-auto px-2 pb-2 flex flex-col gap-0.5">
//         {conversations.map((c) => (
//           <div
//             key={c.id}
//             onClick={() => onSelectChat(c.id)}
//             className={`group flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer ${
//               c.id === activeId
//                 ? 'bg-[#1D212A] text-[#ECEAE3]'
//                 : 'text-[#8A90A0] hover:bg-[#1D212A] hover:text-[#ECEAE3]'
//             }`}
//           >
//             <span className="overflow-hidden text-ellipsis whitespace-nowrap">
//               {c.title}
//             </span>
//             <button
//               title="Delete"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onDeleteChat(c.id);
//               }}
//               className="flex items-center flex-shrink-0 p-1 rounded-md bg-transparent border-none text-[#5C6270] opacity-0 group-hover:opacity-100 cursor-pointer hover:text-[#E5484D] hover:bg-[#E5484D]/10 transition-colors"
//             >
//               <svg
//                 className="w-[13px] h-[13px]"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <polyline points="3 6 5 6 21 6" />
//                 <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
//                 <path d="M10 11v6" />
//                 <path d="M14 11v6" />
//                 <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
//               </svg>
//             </button>
//           </div>
//         ))}
//       </div>
//     </aside>
//   );
// }

// 'use client';

// // import { Conversation } from '@/types';

// // interface SidebarProps {
// //   conversations: Conversation[];
// //   activeId: string;
// //   isOpen: boolean;
// //   onNewChat: () => void;
// //   onSelectChat: (id: string) => void;
// //   onDeleteChat: (id: string) => void;
// // }

// export default function Sidebar({
// //   conversations,
// //   activeId,
//   isOpen=true,
// //   onNewChat,
// //   onSelectChat,
// //   onDeleteChat,
// }) {

//     const  conversations=[{id:1,title:"hello i am shviang meena "}];

//   return (
//     <aside className={`sidebar ${isOpen ? '' : 'closed'}`}>
//       <div className="sidebar-top">
//         <button className="new-chat-btn" 
//         // onClick={onNewChat}
//         >
//           <svg
//             className="icon"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <line x1="12" y1="5" x2="12" y2="19" />
//             <line x1="5" y1="12" x2="19" y2="12" />
//           </svg>
//           New chat
//         </button>
//       </div>
//       <div className="conversations">
//         {conversations.map((conversation) => (
//           <div
//             key={conversation.id}
//             // className={`conv-item ${conversation.id === activeId ? 'active' : ''}`}
//             // onClick={() => onSelectChat(conversation.id)}
//           >
//             <span className="title">{conversation.title}</span>
//             <button
//               className="del-btn"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 // onDeleteChat(conversation.id);
//               }}
//               title="Delete"
//             >
//               <svg
//                 className="icon-sm"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <polyline points="3 6 5 6 21 6" />
//                 <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
//                 <path d="M10 11v6" />
//                 <path d="M14 11v6" />
//                 <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
//               </svg>
//             </button>
//           </div>
//         ))}
//       </div>
//     </aside>
//   );
// }