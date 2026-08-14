import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function getStats(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;
    const now = new Date();
    console.log(userId);
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - 7);
    const startOfLastWeek = new Date(now);
    startOfLastWeek.setDate(now.getDate() - 14);

    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    // const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [
      totalMocksDone,
      thisWeekAvgScore,
      overallAvgScore,
      thisMonthAvgScore,
      skillAverages,
      lastSession,
      recentInterviews
    ] = await Promise.all([
      // 1. TOTAL MOCKS DONE (From the very beginning until now)
      // We removed the `finishedAt` date filter so it counts EVERYTHING.
      prisma.interview.count({
        where: {
          userId,
          status: "COMPLETED"
        },
      }),

      // 2. AVERAGE SCORE OF this  WEEK
      prisma.interview.aggregate({
        where: {
          userId,
          status: "COMPLETED",
          finishedAt: { gte: startOfThisWeek },
        },
        _avg: { overallScore: true },
      }),

      // 3. OVERALL AVERAGE SCORE (From the very beginning until now)
      // Again, no date filter, just the average of all completed interviews.
      prisma.interview.aggregate({
        where: {
          userId,
          status: "COMPLETED"
        },
        _avg: { overallScore: true },
      }),

      // 4. AVERAGE SCORE OF this  MONTH
      prisma.interview.aggregate({
        where: {
          userId,
          status: "COMPLETED",
          finishedAt: { gte: startOfThisMonth },
        },
        _avg: { overallScore: true },
      }),
      prisma.interview.aggregate({
        where: { userId, status: "COMPLETED" },
        _avg: {
          communicationScore: true,
          problemSolvingScore: true,
          technicalDepthScore: true,
          confidenceScore: true,
        },
      }),
      prisma.interview.findFirst({
        where: { userId, status: "COMPLETED" },
        orderBy: { finishedAt: "desc" },
        select: { role: true, overallScore: true, finishedAt: true },
      }),
      prisma.interview.findMany({
        where: {
          userId: userId, // Replace 'userId' with the actual logged-in user's ID
           status: "COMPLETED", // Uncomment this line if you ONLY want to show finished interviews
        },
        orderBy: {
          createdAt: "desc", // Sorts by newest first (Most Recent)
        },
        take: 4, // This sets the MAXIMUM limit to 4.
      })
    ]);

    res.json({
      mocksCompletedOverall: totalMocksDone,
      averageScoreThisWeek: thisWeekAvgScore,
      averageScoreOverall: overallAvgScore || 0,
      averageScoreThisMonth: thisMonthAvgScore || 0,
      skills: {
        communication: skillAverages._avg.communicationScore || 0,
        problemSolving: skillAverages._avg.problemSolvingScore || 0,
        technicalDepth: skillAverages._avg.technicalDepthScore || 0,
        confidence: skillAverages._avg.confidenceScore || 0,
      },
      lastSession,
      recentInterviews: recentInterviews
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
}