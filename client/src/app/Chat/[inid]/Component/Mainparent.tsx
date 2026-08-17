"use client"
import { useEffect, useState } from "react";
import MainChatArea from "./MainChatArea"
import {useTheme} from "../../../../context/ThemeContext"
import { finishInterview, getInterview } from "@/lib/Api";
import { useApiToken } from "@/hooks/useApiToken";
import { useApiData } from "@/hooks/Useapidata";
import InterviewNotFound from './InterviewNotFound';
import Loading from "./Loading"
type Difficulty = "EASY" | "MEDIUM" | "HARD";
type InterviewStatus = "IN_PROGRESS" | "COMPLETED";
 type MessageRole = "USER" | "ASSISTANT";

interface InterviewSummary {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}
interface Message {
  id: string;
  interviewId: string;
  role: MessageRole;
  content: string;
  createdAt: string;
}

interface Interview {
  id: string;
  userId: string;
  role: string;
  jobDescription: string | null;
  focusAreas: string[];
  difficulty: Difficulty;
  numQuestions: number;
  status: InterviewStatus;
  overallScore: number | null;
  communicationScore: number | null;
  problemSolvingScore: number | null;
  technicalDepthScore: number | null;
  confidenceScore: number | null;
  summary: InterviewSummary | null;
  messages: Message[];
  createdAt: string;
  finishedAt: string | null;
}
export default function Mainparent({inid}:{inid:string}) {
    const token=useApiToken();
    const {dark,setdark }=useTheme();
        // const [isOpen, setIsOpen] = useState(true);
        // const [dark, setDark] = useState(true);
       
        const bg = dark ? 'bg-[#0D0F14]' : 'bg-[#F7F7F5]';
        const text = dark ? 'text-[#ECEAE3]' : 'text-[#141414]';

    const [finishing, setFinishing] = useState(false);
    const [finishError, setFinishError] = useState<string | null>(null);
    
    const { data: interview, loading, error } = useApiData(
        () => getInterview(token, inid),
        [token, inid], // Dependencies: re-fetches if token or ID changes
        !!token && !!inid // Only fetch if both exist
    );
    const [inteviewDetails,setInterviewDetails]=useState<Interview|null>(interview);
    console.log(inteviewDetails);
  
  useEffect(()=>{
      setInterviewDetails(interview);

  },[interview]);
  if (loading) return <><Loading dark={dark} label="Inteview loading "/></>;
  if (finishError) {
    return <>{finishError}</>
  }
  if (error) return <>{(!loading)?<InterviewNotFound dark={dark}/>:<div></div>}</>;
  if (!interview) return <> {(!loading)?<InterviewNotFound dark={dark}/>:<div></div>} </>;
  if (!inteviewDetails) {
    return <>some went wrong {inteviewDetails}</>
  }
// console.log(typeof interview.status);
const handleFinishInterview = async () => {
  if (finishing) return;
  setFinishing(true);
  setFinishError(null);

  try {
    const updated = await finishInterview(token, inid);
    // updated should be the full Interview row — status COMPLETED + scores + summary
    // setInterview(updated);
    setInterviewDetails(updated);
  } catch (err) {
    setFinishError(err instanceof Error ? err.message : "Failed to finish interview.");
  } finally {
    setFinishing(false);
  }
};

    return <>
       <div className={`flex h-screen w-full overflow-hidden transition-colors duration-300 ${bg} ${text}`} >
       
             {/* <Sidebar isOpen={isOpen} dark={dark}></Sidebar> */}
             <MainChatArea inteviewid={inid} token={token} dark={dark} setDark={setdark}  meesage={inteviewDetails.messages} status={inteviewDetails.status} 
    
  overallScore={inteviewDetails.overallScore}
  communicationScore={inteviewDetails.communicationScore}
  problemSolvingScore={inteviewDetails.problemSolvingScore}
  technicalDepthScore={inteviewDetails.technicalDepthScore}
  confidenceScore={inteviewDetails.confidenceScore}
  summary={inteviewDetails.summary}
  onFinishInterview={handleFinishInterview}
  finishing={finishing}
             ></MainChatArea>
       </div>
    </>
}