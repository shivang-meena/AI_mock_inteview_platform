import { Interview, Message } from "../generated/prisma/client";
import groq from "../config/groq"; // Import your pre-configured Groq client

const MODEL = "openai/gpt-oss-120b";

export interface InterviewSummaryResult {
  overallScore: number;
  communicationScore: number;
  problemSolvingScore: number;
  technicalDepthScore: number;
  confidenceScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

function buildInterviewSystemPrompt(interview: Interview): string {
  return `You are an interviewer conducting a mock interview for the role of ${interview.role}.
Difficulty: ${interview.difficulty}.
${interview.jobDescription ? `Job description: ${interview.jobDescription}` : ""}
${interview.focusAreas?.length ? `Focus areas: ${interview.focusAreas.join(", ")}` : ""}
Ask one question at a time. Keep responses concise. After the candidate answers, briefly acknowledge and ask the next question.`;
}

export async function generateAIReply(
  interview: Interview,
  messageHistory: Message[]
): Promise<string> {
  try {
    // 1. Build the messages array (System prompt first, then history)
    const messages = [
      { role: "system", content: buildInterviewSystemPrompt(interview) },
      ...messageHistory.map((m) => ({
        role: m.role === "USER" ? "user" : "assistant",
        content: m.content,
      })),
    ];

    // 2. Call Groq SDK
    const response = await groq.chat.completions.create({
      model: MODEL,
      // SDK message param types are a union that includes function messages requiring
      // a `name` property. Cast to `any` to satisfy the overload when using simple
      // role/content objects.
      messages: messages as any,
      max_tokens: 500,
      temperature: 0.7,
    });

    // 3. Return the content
    return response.choices[0]?.message?.content || "";
    
  } catch (err) {
    console.error("Error generating AI reply:", err);
    return "";
  }
}

export async function generateInterviewSummary(
  interview: Interview,
  messages: Message[]
): Promise<InterviewSummaryResult> {
  const transcript = messages.map((m) => `${m.role}: ${m.content}`).join("\n");

  const prompt = `You are scoring a mock interview for the role of ${interview.role}.
Return ONLY valid JSON, no other text, in this exact shape:
{
  "overallScore": number (0-100),
  "communicationScore": number (0-100),
  "problemSolvingScore": number (0-100),
  "technicalDepthScore": number (0-100),
  "confidenceScore": number (0-100),
  "strengths": [string],
  "weaknesses": [string],
  "suggestions": [string]
}

Transcript:
${transcript}`;

  try {
    // 1. Call Groq SDK with JSON mode enabled
    const response = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: "You are an expert interview evaluator. You only output valid JSON." },
        { role: "user", content: prompt }
      ] as any,
      max_tokens: 1000,
      temperature: 0.2, // Lower temperature for more consistent scoring
      response_format: { type: "json_object" }, // Forces Groq to output strict JSON
    });

    // 2. Parse and return
    const text = response.choices[0]?.message?.content || "{}";
    return JSON.parse(text) as InterviewSummaryResult;
    
  } catch (err) {
    console.error("Error generating interview summary:", err);
    return {
      overallScore: 0,
      communicationScore: 0,
      problemSolvingScore: 0,
      technicalDepthScore: 0,
      confidenceScore: 0,
      strengths: [],
      weaknesses: [],
      suggestions: ["Could not generate feedback — please try finishing again."],
    };
  }
}

// import groq from "../config/groq.js"


// async function groqchat(messege:[]) {
    
//     try {
//       let response =await groq.chat.completions.create({
//             model:"llama-3.3-70b-versatile",
//             messages:messege
//         })
//         return response.choices[0]?.message.content;
//     } catch (err) {
//         console.log(err);
//     }
// }
// export default groqchat;

// import { Interview, Message } from "@prisma/client";

// const AI_API_KEY = process.env.AI_API_KEY;

// export interface InterviewSummaryResult {
//   overallScore: number;
//   communicationScore: number;
//   problemSolvingScore: number;
//   technicalDepthScore: number;
//   confidenceScore: number;
//   strengths: string[];
//   weaknesses: string[];
//   suggestions: string[];
// }

// function buildInterviewSystemPrompt(interview: Interview): string {
//   return `You are an interviewer conducting a mock interview for the role of ${interview.role}.
// Difficulty: ${interview.difficulty}.
// ${interview.jobDescription ? `Job description: ${interview.jobDescription}` : ""}
// ${interview.focusAreas?.length ? `Focus areas: ${interview.focusAreas.join(", ")}` : ""}
// Ask one question at a time. Keep responses concise. After the candidate answers, briefly acknowledge and ask the next question.`;
// }

// export async function generateAIReply(
//   interview: Interview,
//   messageHistory: Message[]
// ): Promise<string> {
//   const response = await fetch("https://api.anthropic.com/v1/messages", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "x-api-key": AI_API_KEY as string,
//       "anthropic-version": "2023-06-01",
//     },
//     body: JSON.stringify({
//       model: "claude-sonnet-4-6",
//       max_tokens: 500,
//       system: buildInterviewSystemPrompt(interview),
//       messages: messageHistory.map((m) => ({
//         role: m.role === "USER" ? "user" : "assistant",
//         content: m.content,
//       })),
//     }),
//   });

//   const data = await response.json();
//   return data.content?.[0]?.text || "";
// }

// export async function generateInterviewSummary(
//   interview: Interview,
//   messages: Message[]
// ): Promise<InterviewSummaryResult> {
//   const transcript = messages.map((m) => `${m.role}: ${m.content}`).join("\n");

//   const prompt = `You are scoring a mock interview for the role of ${interview.role}.
// Return ONLY valid JSON, no other text, in this exact shape:
// {
//   "overallScore": number (0-100),
//   "communicationScore": number (0-100),
//   "problemSolvingScore": number (0-100),
//   "technicalDepthScore": number (0-100),
//   "confidenceScore": number (0-100),
//   "strengths": [string],
//   "weaknesses": [string],
//   "suggestions": [string]
// }

// Transcript:
// ${transcript}`;

//   const response = await fetch("https://api.anthropic.com/v1/messages", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "x-api-key": AI_API_KEY as string,
//       "anthropic-version": "2023-06-01",
//     },
//     body: JSON.stringify({
//       model: "claude-sonnet-4-6",
//       max_tokens: 1000,
//       messages: [{ role: "user", content: prompt }],
//     }),
//   });

//   const data = await response.json();
//   const text = data.content?.[0]?.text || "{}";

//   try {
//     return JSON.parse(text) as InterviewSummaryResult;
//   } catch {
//     return {
//       overallScore: 0,
//       communicationScore: 0,
//       problemSolvingScore: 0,
//       technicalDepthScore: 0,
//       confidenceScore: 0,
//       strengths: [],
//       weaknesses: [],
//       suggestions: ["Could not generate feedback — please try finishing again."],
//     };
//   }
// }