import { Request, Response } from "express";
import {prisma} from "../lib/prisma";

export async function getStats(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;
    const now = new Date();

    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - 7);
    const startOfLastWeek = new Date(now);
    startOfLastWeek.setDate(now.getDate() - 14);

    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [
      mocksThisWeek,
      mocksLastWeek,
      avgThisMonth,
      avgLastMonth,
      skillAverages,
      lastSession,
    ] = await Promise.all([
      prisma.interview.count({
        where: { userId, status: "COMPLETED", finishedAt: { gte: startOfThisWeek } },
      }),
      prisma.interview.count({
        where: {
          userId,
          status: "COMPLETED",
          finishedAt: { gte: startOfLastWeek, lt: startOfThisWeek },
        },
      }),
      prisma.interview.aggregate({
        where: { userId, status: "COMPLETED", finishedAt: { gte: startOfThisMonth } },
        _avg: { overallScore: true },
      }),
      prisma.interview.aggregate({
        where: {
          userId,
          status: "COMPLETED",
          finishedAt: { gte: startOfLastMonth, lt: startOfThisMonth },
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
    ]);

    res.json({
      mocksCompletedThisWeek: mocksThisWeek,
      mocksCompletedLastWeek: mocksLastWeek,
      averageScoreThisMonth: avgThisMonth._avg.overallScore || 0,
      averageScoreLastMonth: avgLastMonth._avg.overallScore || 0,
      skills: {
        communication: skillAverages._avg.communicationScore || 0,
        problemSolving: skillAverages._avg.problemSolvingScore || 0,
        technicalDepth: skillAverages._avg.technicalDepthScore || 0,
        confidence: skillAverages._avg.confidenceScore || 0,
      },
      lastSession,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
}