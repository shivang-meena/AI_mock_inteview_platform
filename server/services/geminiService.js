import ai from "../config/gemini.js";
// ---------- Simple call ----------
export async function askGemini(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    return response.text ?? "No response generated.";
}
// ---------- Interview question generator ----------
export async function generateInterviewQuestion(topic, difficulty) {
    const prompt = `
    You are a senior technical interviewer.
    Ask me ONE ${difficulty} level interview question about ${topic}.
    Only return the question. No explanation. No numbering.
  `;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    return response.text ?? "Could not generate question.";
}
// ---------- Multi-turn conversation ----------
export async function chatWithGemini(messages) {
    const contents = messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
    }));
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
    });
    return response.text ?? "No response.";
}
export async function chatWithGeminitemp(prompt) {
    if (prompt === "") {
        return "no prompts ";
    }
    try {
        let data = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt
        });
        console.log();
        return data.text ?? "no resposne from model";
        //         const models = await ai.models.list();
        // for await (const model of models) {
        //   console.log(model.name);
        // }
    }
    catch (err) {
        console.log(err);
    }
}
//# sourceMappingURL=geminiService.js.map