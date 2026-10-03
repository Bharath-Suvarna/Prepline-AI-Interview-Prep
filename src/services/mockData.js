import api from "./api";

export const QUESTION_BANK = {
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
  coding: [
    {
      id: "c1",
      title: "Two Sum",
      difficulty: "Easy",
      prompt:
        "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nExample:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]",
      starter: "function twoSum(nums, target) {\n  // your code here\n}",
    },
    {
      id: "c2",
      title: "Reverse a String",
      difficulty: "Easy",
      prompt: "Write a function that reverses a string in place without using the built-in reverse method.",
      starter: "function reverseString(str) {\n  // your code here\n}",
    },
    {
      id: "c3",
      title: "Valid Palindrome",
      difficulty: "Medium",
      prompt: "Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring case.",
      starter: "function isPalindrome(s) {\n  // your code here\n}",
    },
  ],
};

// GET /api/dashboard/summary
export async function fetchDashboardSummary() {
  try {
    const { data } = await api.get("/dashboard/summary");
    return data;
  } catch (err) {
    console.warn("Failed to fetch dashboard summary from backend, using fallback:", err.message);
    return {
      totalInterviews: 0,
      avgScore: 0,
      hoursPracticed: 0,
      streakDays: 0,
      recentSessions: [],
    };
  }
}

// GET /api/performance
export async function fetchPerformanceHistory() {
  try {
    const { data } = await api.get("/performance");
    return data;
  } catch (err) {
    console.warn("Failed to fetch performance history from backend, using fallback:", err.message);
    return [
      { session: "Aug 20", technical: 55, hr: 60, coding: 50 },
      { session: "Aug 24", technical: 62, hr: 65, coding: 58 },
      { session: "Aug 28", technical: 58, hr: 70, coding: 66 },
      { session: "Sep 01", technical: 70, hr: 68, coding: 74 },
      { session: "Sep 04", technical: 75, hr: 72, coding: 80 },
      { session: "Sep 06", technical: 82, hr: 78, coding: 88 },
    ];
  }
}

// POST /api/interview/question
export async function generateQuestion(mode, askedIds = []) {
  try {
    const { data } = await api.post("/interview/question", { mode, askedIds });
    return data;
  } catch (err) {
    console.warn("Failed to generate question from backend, using local pool fallback:", err.message);
    const pool = (QUESTION_BANK[mode] || QUESTION_BANK.technical).filter((q) => !askedIds.includes(q.id));
    const list = pool.length ? pool : QUESTION_BANK[mode] || QUESTION_BANK.technical;
    return list[Math.floor(Math.random() * list.length)];
  }
}

// POST /api/interview/evaluate
export async function evaluateAnswer(question, answer) {
  try {
    const { data } = await api.post("/interview/evaluate", { question, answer });
    return data;
  } catch (err) {
    console.warn("Failed to evaluate answer via backend, using heuristic fallback:", err.message);
    const length = answer.trim().split(/\s+/).filter(Boolean).length;
    const score = Math.max(35, Math.min(95, 40 + length * 3 + Math.floor(Math.random() * 15)));
    return {
      score,
      strengths: ["You addressed the core idea."],
      improvements: ["Elaborate further with a concrete example."],
      summary: "Solid attempt with room for improvement.",
    };
  }
}

// POST /api/code/run
export async function runCode(code, testCases = [], problemId = "c1", language = "javascript") {
  try {
    const { data } = await api.post("/code/run", { problemId, code, language });
    return data;
  } catch (err) {
    console.warn("Failed to execute code via backend, using local fallback:", err.message);
    return {
      passed: false,
      output: "Error connecting to backend execution service.",
      testsPassed: 0,
      testsTotal: testCases.length || 3,
    };
  }
}

// GET /api/code/problems
export async function fetchCodingProblems() {
  try {
    const { data } = await api.get("/code/problems");
    return data;
  } catch (err) {
    return QUESTION_BANK.coding;
  }
}
