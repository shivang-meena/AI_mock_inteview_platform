import { Request, Response } from "express";
import {prisma} from "../lib/prisma";
import { generateAIReply } from "../services/groqService";

export async function sendMessage(req: Request, res: Response) {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Message content is required" });
    }

    const interviewId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const interview = await prisma.interview.findFirst({
      where: {
        id: interviewId,
        userId: req.user!.userId, // ownership check
      },
      include: {
        messages: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }

    const userMessage = await prisma.message.create({
      data: {
        interviewId: interview.id,
        role: "USER",
        content,
      },
    });

    const fullHistory = [...interview.messages, userMessage];
    const aiReplyText = await generateAIReply(interview, fullHistory);

    const aiMessage = await prisma.message.create({
      data: {
        interviewId: interview.id,
        role: "ASSISTANT",
        content: aiReplyText,
      },
    });

    res.status(201).json({ userMessage, aiMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
}