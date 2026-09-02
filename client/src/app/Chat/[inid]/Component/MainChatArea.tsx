// components/MainChatArea.jsx
'use client';
import { sendMessage } from '@/lib/Api';
import { useState, useRef } from 'react';
 type MessageRole = "USER" | "ASSISTANT";

interface Message {
  id: string;
  interviewId: string;
  role: MessageRole;
  content: string;
  createdAt: string;
}

interface InterviewSummary {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}
interface MainChatAreaProps {
  inteviewid: string
  token: string | null;
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  meesage: Message[];
  status: string;

  overallScore?: number | null;
  communicationScore?: number | null;
  problemSolvingScore?: number | null;
  technicalDepthScore?: number | null;
  confidenceScore?: number | null;
  summary?: InterviewSummary | null;
  onFinishInterview: () => void;
  finishing: boolean;
}

import { useEffect, KeyboardEvent, ChangeEvent } from "react";
// interface message{

// }
// interface Message {
//   role: "user" | "assistant";
//   content: string;
//   messages:[]
// }



export default function MainChatArea({ inteviewid, token, dark, setDark, meesage = [], status = "",

  overallScore, communicationScore, problemSolvingScore, technicalDepthScore, confidenceScore, summary,
  onFinishInterview, finishing
}: MainChatAreaProps) {

  // const textareaRef = useRef<HTMLTextAreaElement>(null);

  // theme tokens
  const border = dark ? 'border-[#262B36]' : 'border-[#E4E4E0]';
  const titleText = dark ? 'text-[#ECEAE3]' : 'text-[#141414]';
  const iconBtn = dark
    ? 'text-[#8A90A0] hover:bg-[#1D212A] hover:text-[#ECEAE3]'
    : 'text-[#6B6F7A] hover:bg-[#EDEDE9] hover:text-[#141414]';
  const badgeText = dark ? 'text-[#E8A33D]' : 'text-[#B8720A]';
  // Add these theme tokens for the chat area
  const chatBg = dark ? 'bg-[#0D0F14]' : 'bg-[#F8F8F5]';
  const chatText = dark ? 'text-[#ECEAE3]' : 'text-[#141414]';
  const chatBubble = dark ? 'bg-[#232833]' : 'bg-[#E8E8E3]';
  const chatAccentBorder = dark ? 'border-[#E8A33D]' : 'border-[#B8720A]';
  const chatAccentBg = dark ? 'bg-[#E8A33D]' : 'bg-[#B8720A]';
  const chatBorder = dark ? 'border-[#262B36]' : 'border-[#E4E4E0]';
  const chatMuted = dark ? 'text-[#8A90A0]' : 'text-[#6B6F7A]';
  const chatSurface = dark ? 'bg-[#171A21]' : 'bg-white';
  const chatDim = dark ? 'text-[#5C6270]' : 'text-[#8A8F99]';
  const chatErrorText = dark ? 'text-[#E5484D]' : 'text-[#CD2B31]';
  const chatErrorBg = dark ? 'bg-[#E5484D]/10' : 'bg-[#CD2B31]/10';
  const chatErrorBorder = dark ? 'border-[#E5484D]/30' : 'border-[#CD2B31]/30';
  const chatActiveBtnText = dark ? 'text-[#0D0F14]' : 'text-[#F8F8F5]';
  const chatInactiveBtnBg = dark ? 'bg-[#262B36]' : 'bg-[#E4E4E0]';


  // const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   setInput(e.target.value);
  //   const el = textareaRef.current;
  //   if (el) {
  //     el.style.height = 'auto';
  //     el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  //   }
  // };

  // const handleSend = () => {
  //   if (!hasInput) return;
  //   console.log('sending:', input);
  //   setInput('');
  //   if (textareaRef.current) textareaRef.current.style.height = 'auto';
  // };


  const [messages, setMessages] = useState<Message[]>(meesage);
  console.log(messages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sending, setSending] = useState(false);
  const messagesAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [summaryExpanded, setSummaryExpanded] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (messagesAreaRef.current) {
        messagesAreaRef.current.scrollTop = messagesAreaRef.current.scrollHeight;
      }
    });
  }, [messages, sending, error]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height =
        Math.min(inputRef.current.scrollHeight, 200) + "px";
    }
  }, [input]);

  //this is the funtion is callidn the send message 
  const handleSend = async (overrideText?: string) => {
    const content = (overrideText ?? input).trim();
    if (!content || sending) return;

    setError(null);
    setInput("");


    const optimisticMsg: Message = {
      id: "123",
      interviewId: inteviewid,
      role: "USER",
      content,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMsg]);
    setSending(true);

    try {
      const result = await sendMessage(token, inteviewid, content);
      // assumes backend returns both saved messages — confirm shape below
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== "123"),
        result.userMessage,
        result.aiMessage,
      ]);
    } catch (err) {
      // roll back — the optimistic message never actually saved
      setMessages((prev) => prev.filter((m) => m.id !== "123"));
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const hasInput = input.trim().length > 0 && !sending;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };



  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Topbar */}
      <div className={`flex items-center gap-3 px-4 py-3 border-b transition-colors duration-300 ${border}`}>
        <button
          // onClick={() => { onToggleSidebar((prev: boolean) => { return !prev }) }}
          className={`flex items-center justify-center p-1.5 rounded-lg bg-transparent border-none cursor-pointer transition-colors ${iconBtn}`}
        >
          <svg
            className="w-[18px] h-[18px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
        </button>

        <div className={`flex-1 min-w-0 text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap ${titleText}`}>
          {"this is temp chat for cahektestign "}
        </div>

        {/* <span className={`text-xs px-2 py-1 rounded-full bg-[#E8A33D]/15 border border-[#E8A33D]/20 ${badgeText}`}>
          Claude Sonnet
        </span> */}
        {status !== "COMPLETED" && (
          <button
            onClick={onFinishInterview}
            disabled={finishing || sending}
            className={`text-xs px-3 py-1 rounded-full border cursor-pointer disabled:cursor-default disabled:opacity-60 ${chatBorder} ${badgeText}`}
          >
            {finishing ? "Finishing..." : "Finish Interview"}
          </button>
        )}

        <button
          onClick={() => setDark((prev) => !prev)}
          aria-label="Toggle theme"
          className={`flex items-center justify-center p-1.5 rounded-lg bg-transparent border-none cursor-pointer transition-colors ${iconBtn}`}
        >
          {dark ? (
            <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="4.5" />
              <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M19.4 4.6l-1.8 1.8M6.4 17.6l-1.8 1.8" />
            </svg>
          ) : (
            <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 13.5A8 8 0 0 1 10.5 4 8 8 0 1 0 20 13.5z" />
            </svg>
          )}
        </button>
      </div>






      {/* Messages area */}
      <div className="  flex-1 min-h-0 overflow-hidden">
        {/* messages will render here */}

        <div className={`flex flex-col h-full min-w-0 font-chat ${chatBg} ${chatText} `}>

          {/* Messages */}
          <div
            ref={messagesAreaRef}
            className="flex-1 min-h-0 overflow-y-auto scrollbar-thin"
          >
            {messages.length === 0 ? (
              <div className="max-w-[760px] mx-auto px-4 py-6 flex flex-col gap-6 items-center justify-center h-full">
                <p className={`text-sm ${chatMuted}`}>
                  Send a message to start the conversation
                </p>
              </div>
            ) : (
              <div className="max-w-[760px] mx-auto px-4 py-6 flex flex-col gap-6">
                {messages.map((m, index) => (
                  <div
                    key={index}
                    className={`flex flex-col animate-fade-up ${m.role === "USER" ? "items-end" : "items-start"
                      }`}
                  >
                    {m.role === "USER" ? (
                      <div className={`rounded-2xl px-4 py-2.5 text-sm max-w-[70%] whitespace-pre-wrap leading-relaxed ${chatBubble}`}>
                        {m.content}
                      </div>
                    ) : (
                      <div className={`pl-4 text-sm border-l-2 max-w-[80%] whitespace-pre-wrap leading-relaxed ${chatAccentBorder}`}>
                        {m.content}
                      </div>
                    )}
                  </div>
                ))}

                {sending && (
                  <div className={`flex items-center gap-2 pl-4 border-l-2 ${chatBorder}`}>
                    <span className={`inline-block w-2 h-2 rounded-full animate-breathe ${chatAccentBg}`} />
                    <span className={`text-xs ${chatMuted}`}>Thinking</span>
                  </div>
                )}

                {error && (
                  <div className={`text-sm px-4 py-2 rounded-xl border ${chatErrorText} ${chatErrorBg} ${chatErrorBorder}`}>
                    {error}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-4 pt-2 pb-4">


            {(status === "COMPLETED") ? (
            
              <>
                {summaryExpanded ? (
                  <div className={`max-w-[760px] mx-auto rounded-2xl px-5 py-5 border transition-colors duration-300 ${chatSurface} ${chatBorder}`}>
                    {/* Header — always visible */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`shrink-0 flex items-center justify-center w-9 h-9 rounded-full ${chatAccentBg}`}>
                          <svg className={`w-5 h-5 ${dark ? 'text-[#0D0F14]' : 'text-white'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${chatText}`}>Mock interview completed</p>
                          <p className={`text-xs mt-0.5 ${chatDim}`}>
                            {summaryExpanded ? "Here's how you did" : "You can review the conversation above."}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSummaryExpanded((prev) => !prev)}
                        className={`shrink-0 text-xs px-3 py-1.5 rounded-full border cursor-pointer transition-colors duration-200 ${chatSurface} ${chatBorder} ${chatMuted}`}
                      >
                        {summaryExpanded ? "Show less" : "Show full results"}
                      </button>
                    </div>

                    {/* Expandable section — animates open/closed */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${summaryExpanded ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0 mt-0"
                        }`}
                    >
                      <div className="overflow-hidden">
                        {/* Scores */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                          {overallScore != null && (
                            <div className={`rounded-xl px-3 py-2 border ${chatBorder}`}>
                              <p className={`text-xs ${chatMuted}`}>Overall</p>
                              <p className={`text-lg font-semibold ${chatText}`}>{overallScore}</p>
                            </div>
                          )}
                          {communicationScore != null && (
                            <div className={`rounded-xl px-3 py-2 border ${chatBorder}`}>
                              <p className={`text-xs ${chatMuted}`}>Communication</p>
                              <p className={`text-lg font-semibold ${chatText}`}>{communicationScore}</p>
                            </div>
                          )}
                          {problemSolvingScore != null && (
                            <div className={`rounded-xl px-3 py-2 border ${chatBorder}`}>
                              <p className={`text-xs ${chatMuted}`}>Problem Solving</p>
                              <p className={`text-lg font-semibold ${chatText}`}>{problemSolvingScore}</p>
                            </div>
                          )}
                          {technicalDepthScore != null && (
                            <div className={`rounded-xl px-3 py-2 border ${chatBorder}`}>
                              <p className={`text-xs ${chatMuted}`}>Technical Depth</p>
                              <p className={`text-lg font-semibold ${chatText}`}>{technicalDepthScore}</p>
                            </div>
                          )}
                          {confidenceScore != null && (
                            <div className={`rounded-xl px-3 py-2 border ${chatBorder}`}>
                              <p className={`text-xs ${chatMuted}`}>Confidence</p>
                              <p className={`text-lg font-semibold ${chatText}`}>{confidenceScore}</p>
                            </div>
                          )}
                        </div>

                        {/* Summary lists */}
                        {summary && (
                          <div className="flex flex-col gap-4">
                            {summary.strengths?.length > 0 && (
                              <div>
                                <p className={`text-xs font-medium mb-1.5 ${chatText}`}>Strengths</p>
                                <ul className="flex flex-col gap-1">
                                  {summary.strengths.map((s, i) => (
                                    <li key={i} className={`text-sm pl-3 border-l-2 whitespace-pre-wrap break-words ${chatAccentBorder} ${chatMuted}`}>{s}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {summary.weaknesses?.length > 0 && (
                              <div>
                                <p className={`text-xs font-medium mb-1.5 ${chatText}`}>Weaknesses</p>
                                <ul className="flex flex-col gap-1">
                                  {summary.weaknesses.map((w, i) => (
                                    <li key={i} className={`text-sm pl-3 border-l-2 whitespace-pre-wrap break-words ${chatErrorBorder} ${chatMuted}`}>{w}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {summary.suggestions?.length > 0 && (
                              <div>
                                <p className={`text-xs font-medium mb-1.5 ${chatText}`}>Suggestions</p>
                                <ul className="flex flex-col gap-1">
                                  {summary.suggestions.map((s, i) => (
                                    <li key={i} className={`text-sm pl-3 border-l-2 whitespace-pre-wrap break-words ${chatBorder} ${chatMuted}`}>{s}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`max-w-[760px] mx-auto rounded-2xl px-5 py-4 border flex items-center justify-between gap-3 transition-all ease-in-out delay-100 ${chatSurface} ${chatBorder}`}>
                    <div className="flex items-center gap-3">
                      <div className={`shrink-0 flex items-center justify-center w-9 h-9 rounded-full ${chatAccentBg}`}>
                        <svg className={`w-5 h-5 ${dark ? 'text-[#0D0F14]' : 'text-white'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${chatText}`}>Mock interview completed</p>
                        <p className={`text-xs mt-0.5 ${chatDim}`}>You can review the conversation above.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSummaryExpanded(true)}
                      className={`shrink-0 text-xs px-3 py-1.5 rounded-full border cursor-pointer ${chatSurface} ${chatBorder} ${chatMuted}`}
                    >
                      Show full results
                    </button>
                  </div>
                )}
              </>



            ) : (
              <>
                <div className={`max-w-[760px] mx-auto flex items-end gap-2 rounded-2xl px-3 py-2 border ${chatSurface} ${chatBorder}`}>
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message..."
                    rows={1}
                    className={`flex-1 resize-none bg-transparent outline-none text-sm py-2 max-h-[200px] ${dark ? 'placeholder:text-[#5C6270]' : 'placeholder:text-[#8A8F99]'
                      }`}
                  />
                  <button
                    className={`shrink-0 flex items-center justify-center rounded-xl w-9 h-9 transition-colors ${hasInput
                      ? `${chatAccentBg} ${chatActiveBtnText} cursor-pointer`
                      : `${chatInactiveBtnBg} ${chatDim} cursor-default`
                      }`}
                    onClick={() => handleSend()}
                    disabled={!hasInput}
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
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>
                <div className={`text-center text-xs mt-2 ${chatDim}`}>
                  AI can make mistakes. Consider checking important information.
                </div>

              </>
            )}





          </div>


        </div>


      </div>


    </div>
  );
}
