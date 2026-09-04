"use client"
import Navbar from "./Navbar";
import { useState,useEffect } from "react";
import WelcomeAndStats from "./WelcomeandStats";
import RoleAndJDSection from "./RoleAndJdSection";
import RecentAndSkillsSection from "./RecentAndSkillsSection";
import { useTheme } from "../../../context/ThemeContext"
import { useApiToken } from "@/hooks/useApiToken";
import { getDashboardStats } from "../../../lib/Api";
import { useApiData } from "@/hooks/Useapidata";
import Loading from "./Loading";
import ServerError from "./ServerError";
import { useSession } from "next-auth/react";



function Dashboardpage() {
  const { dark, setdark } = useTheme();
  const { data:session} = useSession();
  
  //  const { data: session, status } = useSession();
  const token = useApiToken();
  //  const[dark,setdark]=useState<boolean>(false);
  const bg = dark ? 'bg-[#0E0E10]' : 'bg-[#F4F4F3]';

  const { data: stats, loading, error } = useApiData(
    () => getDashboardStats(token),
    [token],
    !!token
  );


  if (loading) return <>
    <Loading
    dark={dark}
    label="Fething user data"
    ></Loading>
  </>;

  // if (error) return <p>Something went wrong: {error}</p>;
  if (error) return (
  <ServerError
    dark={dark}
    label={error}
    onRetry={() => window.location.reload()}
  />
);
  if (!stats) return null;


  return <>
    <div className={`${bg} transition-colors duration-[350ms]`}>
      <Navbar dark={dark} setdark={setdark}></Navbar>
      <div className={` ${bg}   max-w-[1040px]  w-full mx-auto px-6 pt-8 pb-[60px] flex flex-col gap-[22px] max-[720px]:px-4 max-[720px]:pt-6 max-[720px]:pb-[50px] transition-colors duration-[350ms]`}  >
        <WelcomeAndStats
          lastSession={stats.lastSession}
          mocksCompletedOverall={stats.mocksCompletedOverall}
          averageScoreThisWeek={Number(stats.averageScoreThisWeek?._avg?.overallScore?.toFixed(2))}
          averageScoreOverall={Number(stats.averageScoreOverall?._avg?.overallScore?.toFixed(2))}
          averageScoreThisMonth={Number(stats.averageScoreThisMonth?._avg?.overallScore?.toFixed(2))}
          dark={dark}
          username={session?.user?.name?.split(" ")[0] ?? ""}
        ></WelcomeAndStats>

        <RoleAndJDSection
          token={token}
          dark={dark}></RoleAndJDSection>

        <RecentAndSkillsSection
          communication={Number(stats.skills.communication?.toFixed(2)) }
          confidence={Number(stats.skills.confidence?.toFixed(2))}
          problemSolving={Number(stats.skills.problemSolving?.toFixed(2))}
          technicalDepth={ Number(stats.skills.technicalDepth?.toFixed(2))}
          recentInterviews={stats.recentInterviews}
          dark={dark}></RecentAndSkillsSection>
      </div>
    </div>
  </>

}
export default Dashboardpage;