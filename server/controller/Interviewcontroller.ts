import { Request, Response } from "express";
import {prisma} from "../lib/prisma";
import { generateInterviewSummary } from "../services/groqService";

export async function createInterview(req: Request, res: Response) {
  try {
    const { role, jobDescription, focusAreas, difficulty, numQuestions } = req.body;

    if (!role) {
      return res.status(400).json({ error: "Role is required" });
    }

    const interview = await prisma.interview.create({
      data: {
        userId: req.user!.userId,
        role,
        jobDescription,
        focusAreas: focusAreas || [],
        difficulty: difficulty || "MEDIUM",
        numQuestions: numQuestions || 10,
      },
    });

    res.status(201).json(interview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create interview" });
  }
}

export async function listInterviews(req: Request, res: Response) {
  try {
    const interviews = await prisma.interview.findMany({
      where: { userId: req.user!.userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        role: true,
        difficulty: true,
        status: true,
        overallScore: true,
        numQuestions: true,
        createdAt: true,
        finishedAt: true,
      },
    });

    res.json(interviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch interviews" });
  }
}

export async function getInterview(req: Request, res: Response) {
  try {
    const interview = await prisma.interview.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.userId, // ownership check
      },
      include: {
        messages: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }

    res.json(interview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch interview" });
  }
}

export async function finishInterview(req: Request, res: Response) {
  try {
 
    const interview = await prisma.interview.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.userId, // ownership check
      },
      include: {
        messages: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }

    const result = await generateInterviewSummary(interview, interview.messages);
     
    const updated = await prisma.interview.update({
      where: { id: interview.id },
      data: {
        status: "COMPLETED",
        finishedAt: new Date(),
        overallScore: result.overallScore,
        communicationScore: result.communicationScore,
        problemSolvingScore: result.problemSolvingScore,
        technicalDepthScore: result.technicalDepthScore,
        confidenceScore: result.confidenceScore,
        summary: {
          strengths: result.strengths,
          weaknesses: result.weaknesses,
          suggestions: result.suggestions,
        },
      },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to finish interview" });
  }
}

// import prisma from "../lib/prisma.js";
// import { generateInterviewSummary } from "../services/aiService.js";
// import type { Request, Response } from "express";
// type AuthenticatedRequest = Request & { user: { userId: string } };
// export async function createInterview(req: AuthenticatedRequest, res: Response) {
//   try {
//     const { role, jobDescription, focusAreas, difficulty, numQuestions } = req.body;

//     if (!role) {
//       return res.status(400).json({ error: "Role is required" });
//     }

//     const interview = await prisma.interview.create({
//       data: {
//         userId: req.user.userId,
//         role,
//         jobDescription,
//         focusAreas: focusAreas || [],
//         difficulty: difficulty || "MEDIUM",
//         numQuestions: numQuestions || 10,
//       },
//     });

//     res.status(201).json(interview);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to create interview" });
//   }
// }

// export async function listInterviews(req: AuthenticatedRequest, res: Response) {
//   try {
//     const interviews = await prisma.interview.findMany({
//       where: { userId: req.user.userId },
//       orderBy: { createdAt: "desc" },
//       select: {
//         id: true,
//         role: true,
//         difficulty: true,
//         status: true,
//         overallScore: true,
//         numQuestions: true,
//         createdAt: true,
//         finishedAt: true,
//       },
//     });

//     res.json(interviews);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch interviews" });
//   }
// }

// export async function getInterview(req: AuthenticatedRequest, res: Response) {
//   try {
//     const interview = await prisma.interview.findFirst({
//       where: {
//         id: req.params.id,
//         userId: req.user.userId, // ownership check
//       },
//       include: {
//         messages: { orderBy: { createdAt: "asc" } },
//       },
//     });

//     if (!interview) {
//       return res.status(404).json({ error: "Interview not found" });
//     }

//     res.json(interview);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch interview" });
//   }
// }

// export async function finishInterview(req: AuthenticatedRequest, res: Response) {
//   try {
//     const interview = await prisma.interview.findFirst({
//       where: {
//         id: req.params.id,
//         userId: req.user.userId, // ownership check
//       },
//       include: {
//         messages: { orderBy: { createdAt: "asc" } },
//       },
//     });

//     if (!interview) {
//       return res.status(404).json({ error: "Interview not found" });
//     }

//     const result = await generateInterviewSummary(interview, interview.messages);

//     const updated = await prisma.interview.update({
//       where: { id: interview.id },
//       data: {
//         status: "COMPLETED",
//         finishedAt: new Date(),
//         overallScore: result.overallScore,
//         communicationScore: result.communicationScore,
//         problemSolvingScore: result.problemSolvingScore,
//         technicalDepthScore: result.technicalDepthScore,
//         confidenceScore: result.confidenceScore,
//         summary: {
//           strengths: result.strengths,
//           weaknesses: result.weaknesses,
//           suggestions: result.suggestions,
//         },
//       },
//     });

//     res.json(updated);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to finish interview" });
//   }
// }