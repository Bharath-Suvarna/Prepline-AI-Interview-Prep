import { GoogleGenerativeAI } from "@google/generative-ai";

const QUESTION_BANK = {
  technical: [
    {
      id: "t1",
      topic: "Data Structures",
      difficulty: "Easy",
      question: "What is the difference between an array and a linked list, and when would you choose one over the other?",
    },
    {
      id: "t2",
      topic: "JavaScript",
      difficulty: "Medium",
      question: "Explain closures in JavaScript with an example of a practical use case.",
    },
    {
      id: "t3",
      topic: "Databases",
      difficulty: "Medium",
      question: "What is the difference between SQL and NoSQL databases? When would you pick MongoDB over MySQL?",
    },
    {
      id: "t4",
      topic: "System Design",
      difficulty: "Hard",
      question: "How would you design a URL shortening service like bit.ly? Walk through your approach.",
    },
    {
      id: "t5",
      topic: "React",
      difficulty: "Medium",
      question: "What is the Virtual DOM and how does React use it to optimize rendering?",
    },
  ],
  hr: [
    {
      id: "h1",
      topic: "Behavioral",
      difficulty: "Easy",
      question: "Tell me about yourself and why you're interested in this role.",
    },
    {
      id: "h2",
      topic: "Behavioral",
      difficulty: "Medium",
      question: "Describe a time you disagreed with a teammate. How did you handle it?",
    },
    {
      id: "h3",
      topic: "Career",
      difficulty: "Easy",
      question: "Where do you see yourself in the next three to five years?",
    },
    {
      id: "h4",
      topic: "Behavioral",
      difficulty: "Medium",
      question: "Tell me about a project you're most proud of and the impact it had.",
    },
  ],
};

function heuristicEvaluate(question, answer) {
  const text = typeof question === "string" ? question : question?.question || "";
  const trimmed = (answer || "").trim();
  const length = trimmed.split(/\s+/).filter(Boolean).length;
  const score = Math.max(35, Math.min(95, 40 + length * 3 + Math.floor(Math.random() * 15)));

  const strengths = [];
  const improvements = [];

  if (length > 40) strengths.push("Good depth — you elaborated well on the core idea.");
  else improvements.push("Try to elaborate further; add a concrete example to support your answer.");

  if (/example|for instance|e\.g\./i.test(trimmed)) strengths.push("Nice use of a concrete example to ground your explanation.");
  else improvements.push("Including a real example would make your answer more convincing.");

  if (length < 15) improvements.push("Your answer is quite short for this question — interviewers expect more structure.");
  else strengths.push("Clear structure that's easy for an interviewer to follow.");

  if (!strengths.length) strengths.push("You addressed the core of the question.");

  return {
    score,
    strengths,
    improvements,
    summary:
      score >= 80
        ? "Strong answer — confident, structured, and relevant."
        : score >= 60
        ? "Solid attempt with room to add more depth and specific examples."
        : "This needs more structure and detail. Try the STAR method for behavioral questions.",
  };
}

export async function generateQuestion(mode = "technical", askedIds = []) {
  const isMock = process.env.MOCK_AI === "true" || !process.env.GEMINI_API_KEY;

  if (isMock) {
    const pool = (QUESTION_BANK[mode] || QUESTION_BANK.technical).filter((q) => !askedIds.includes(q.id));
    const list = pool.length ? pool : QUESTION_BANK[mode] || QUESTION_BANK.technical;
    return list[Math.floor(Math.random() * list.length)];
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate a single ${mode} interview question suitable for a software engineering interview. 
Return ONLY valid JSON matching this exact structure:
{
  "id": "ai_${Date.now()}",
  "topic": "<short topic name>",
  "difficulty": "Easy" | "Medium" | "Hard",
  "question": "<the question text>"
}
Do not ask questions similar to these asked question IDs: ${askedIds.join(", ")}.`;

    const response = await model.generateContent(prompt);
    const text = response.response.text() || "";
    const cleanJson = text.replace(/```json\n?|\n?```/g, "").trim();
    const parsed = JSON.parse(cleanJson);
    return {
      id: parsed.id || `q_${Date.now()}`,
      topic: parsed.topic || (mode === "hr" ? "Behavioral" : "Technical"),
      difficulty: parsed.difficulty || "Medium",
      question: parsed.question,
    };
  } catch (err) {
    console.warn("AI Question generation failed, falling back to mock:", err.message);
    const pool = (QUESTION_BANK[mode] || QUESTION_BANK.technical).filter((q) => !askedIds.includes(q.id));
    const list = pool.length ? pool : QUESTION_BANK[mode] || QUESTION_BANK.technical;
    return list[Math.floor(Math.random() * list.length)];
  }
}

export async function evaluateAnswer(question, answer) {
  const isMock = process.env.MOCK_AI === "true" || !process.env.GEMINI_API_KEY;

  if (isMock) {
    return heuristicEvaluate(question, answer);
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const questionText = typeof question === "string" ? question : question?.question || "";
    const prompt = `Evaluate the candidate's interview answer.
Question: "${questionText}"
Answer: "${answer}"

Return ONLY valid JSON matching this exact structure:
{
  "score": <number 0-100>,
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<improvement 1>", "<improvement 2>"],
  "summary": "<overall concise summary of performance>"
}`;

    const response = await model.generateContent(prompt);
    const text = response.response.text() || "";
    const cleanJson = text.replace(/```json\n?|\n?```/g, "").trim();
    const parsed = JSON.parse(cleanJson);
    return {
      score: typeof parsed.score === "number" ? parsed.score : 70,
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : ["Good effort on answering."],
      improvements: Array.isArray(parsed.improvements) ? parsed.improvements : ["Add more details."],
      summary: parsed.summary || "Solid attempt.",
    };
  } catch (err) {
    console.warn("AI Evaluation failed, falling back to heuristic:", err.message);
    return heuristicEvaluate(question, answer);
  }
}
