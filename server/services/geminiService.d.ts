export declare function askGemini(prompt: string): Promise<string>;
export declare function generateInterviewQuestion(topic: string, difficulty: "easy" | "medium" | "hard"): Promise<string>;
export declare function chatWithGemini(messages: {
    role: "user" | "model";
    text: string;
}[]): Promise<string>;
export declare function chatWithGeminitemp(prompt: string): Promise<string | undefined>;
//# sourceMappingURL=geminiService.d.ts.map