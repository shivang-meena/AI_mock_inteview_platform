const API_URL = process.env.git  || " https://ai-mock-inteview-platform.onrender.com";
console.log(API_URL);

interface ApiOptions {
  method?: string;
  body?: unknown;
  token: string | null;
}

async function apiFetch(path: string, { method = "GET", body, token }: ApiOptions) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch((err) => ({ error: err }));
    throw new Error(error.error || `Request failed with status ${res.status}`);
  }

  return res.json();
}

// ---- Interviews ----

export interface CreateInterviewInput {
  role: string;
  jobDescription?: string;
  focusAreas?: string[];
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  numQuestions?: number;
}

export function createInterview(token: string | null, data: CreateInterviewInput) {
  return apiFetch("/interviews", { method: "POST", body: data, token });
}

export function listInterviews(token: string | null) {
  return apiFetch("/interviews", { token });
}

export function getInterview(token: string | null, id: string) {
  return apiFetch(`/interviews/${id}`, { token });
}

export function finishInterview(token: string | null, id: string) {
  return apiFetch(`/interviews/${id}/finish`, { method: "PATCH", token });
}

// ---- Messages ----

export function sendMessage(token: string | null, interviewId: string, content: string) {
  return apiFetch(`/interviews/${interviewId}/messages`, {
    method: "POST",
    body: { content },
    token,
  });
}

// ---- Dashboard ----

export function getDashboardStats(token: string | null) {
  return apiFetch("/dashboard/stats", { token });
}