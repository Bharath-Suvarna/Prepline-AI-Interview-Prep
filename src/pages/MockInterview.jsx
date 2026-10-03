import { useEffect, useRef, useState } from "react";
import { Send, RefreshCw, CheckCircle2, AlertCircle, Bot, User } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { generateQuestion, evaluateAnswer } from "../services/mockData";

const MODES = [
  { id: "technical", label: "Technical" },
  { id: "hr", label: "HR / Behavioral" },
];

export default function MockInterview() {
  const [mode, setMode] = useState("technical");
  const [messages, setMessages] = useState([]);
  const [askedIds, setAskedIds] = useState([]);
  const [answer, setAnswer] = useState("");
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    startSession(mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function startSession(newMode) {
    setMessages([]);
    setAskedIds([]);
    setCurrentQuestion(null);
    await askNextQuestion(newMode, []);
  }

  async function askNextQuestion(currentMode, asked) {
    setLoadingQuestion(true);
    const q = await generateQuestion(currentMode, asked);
    setCurrentQuestion(q);
    setAskedIds((prev) => [...prev, q.id]);
    setMessages((prev) => [
      ...prev,
      { role: "ai", type: "question", text: q.question, meta: `${q.topic} · ${q.difficulty}` },
    ]);
    setLoadingQuestion(false);
  }

  async function handleSubmitAnswer(e) {
    e.preventDefault();
    if (!answer.trim() || !currentQuestion) return;

    const userAnswer = answer.trim();
    setMessages((prev) => [...prev, { role: "user", type: "answer", text: userAnswer }]);
    setAnswer("");
    setEvaluating(true);

    const feedback = await evaluateAnswer(currentQuestion, userAnswer);
    setMessages((prev) => [...prev, { role: "ai", type: "feedback", feedback }]);
    setEvaluating(false);
  }

  async function handleNextQuestion() {
    await askNextQuestion(mode, askedIds);
  }

  return (
    <div className="flex flex-col h-screen">
      <PageHeader
        title="Mock Interview"
        subtitle="Answer as you would in a real interview — Prepline reviews each response."
        action={
          <div className="flex bg-white border border-[var(--color-line)] rounded-md p-1">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`px-3.5 py-1.5 rounded text-sm font-medium transition-colors ${
                  mode === m.id
                    ? "bg-[var(--color-indigo-950)] text-white"
                    : "text-[var(--color-ink)]/55 hover:text-[var(--color-ink)]"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        }
      />

      <div ref={scrollRef} className="flex-1 overflow-y-auto thin-scroll px-8 py-6">
        <div className="max-w-2xl mx-auto flex flex-col gap-5">
          {messages.map((m, i) => (
            <MessageBubble key={i} message={m} />
          ))}

          {(loadingQuestion || evaluating) && (
            <div className="flex items-center gap-2 text-sm text-[var(--color-ink)]/45 font-mono">
              <Bot className="w-4 h-4 animate-pulse" />
              {evaluating ? "Reviewing your answer…" : "Preparing the next question…"}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-[var(--color-line)] bg-white px-8 py-5">
        <div className="max-w-2xl mx-auto">
          {currentQuestion && !evaluating && messages[messages.length - 1]?.type === "feedback" && (
            <button
              onClick={handleNextQuestion}
              disabled={loadingQuestion}
              className="mb-4 flex items-center gap-2 text-sm font-medium text-[var(--color-indigo-600)] hover:underline"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Next question
            </button>
          )}
          <form onSubmit={handleSubmitAnswer} className="flex items-end gap-3">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitAnswer(e);
                }
              }}
              placeholder="Type your answer…"
              rows={2}
              disabled={evaluating || loadingQuestion}
              className="flex-1 resize-none rounded-md border border-[var(--color-line)] px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-indigo-500)]/40 focus:border-[var(--color-indigo-500)] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={evaluating || loadingQuestion || !answer.trim()}
              className="shrink-0 flex items-center justify-center w-10 h-10 rounded-md bg-[var(--color-indigo-950)] text-white hover:bg-[var(--color-indigo-900)] disabled:opacity-40 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }) {
  if (message.type === "question") {
    return (
      <div className="flex gap-3">
        <Avatar role="ai" />
        <div className="max-w-md">
          {message.meta && (
            <p className="text-xs font-mono text-[var(--color-ink)]/40 mb-1.5">{message.meta}</p>
          )}
          <div className="bg-white border border-[var(--color-line)] rounded-lg rounded-tl-sm px-4 py-3 text-sm text-[var(--color-ink)]">
            {message.text}
          </div>
        </div>
      </div>
    );
  }

  if (message.type === "answer") {
    return (
      <div className="flex gap-3 justify-end">
        <div className="max-w-md bg-[var(--color-indigo-950)] text-white rounded-lg rounded-tr-sm px-4 py-3 text-sm">
          {message.text}
        </div>
        <Avatar role="user" />
      </div>
    );
  }

  if (message.type === "feedback") {
    const { score, strengths, improvements, summary } = message.feedback;
    const color =
      score >= 80 ? "var(--color-teal-600)" : score >= 60 ? "var(--color-gold-500)" : "var(--color-coral-500)";
    return (
      <div className="flex gap-3">
        <Avatar role="ai" />
        <div className="max-w-md w-full bg-white border border-[var(--color-line)] rounded-lg rounded-tl-sm px-4 py-4 text-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wide text-[var(--color-ink)]/40">AI Feedback</span>
            <span className="font-display text-lg" style={{ color }}>{score}%</span>
          </div>
          <p className="text-[var(--color-ink)]/80 mb-3">{summary}</p>

          {strengths.length > 0 && (
            <div className="mb-2">
              {strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[var(--color-ink)]/70 py-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[var(--color-teal-600)]" />
                  {s}
                </div>
              ))}
            </div>
          )}
          {improvements.length > 0 && (
            <div>
              {improvements.map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[var(--color-ink)]/70 py-0.5">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[var(--color-gold-500)]" />
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}

function Avatar({ role }) {
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
        role === "ai" ? "bg-[var(--color-indigo-950)] text-[var(--color-gold-400)]" : "bg-[var(--color-ink)]/10 text-[var(--color-ink)]/60"
      }`}
    >
      {role === "ai" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
    </div>
  );
}
