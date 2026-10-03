import { useEffect, useState } from "react";
import { Play, ChevronDown, CheckCircle2, XCircle, Loader2, Code2, Sparkles, Filter } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { QUESTION_BANK, runCode, fetchCodingProblems } from "../services/mockData";

const LANGUAGES = [
  { id: "javascript", label: "JavaScript (Node.js)", ext: "solution.js" },
  { id: "python", label: "Python 3", ext: "solution.py" },
  { id: "java", label: "Java (JDK 21)", ext: "Solution.java" },
  { id: "cpp", label: "C++ (GCC 13)", ext: "solution.cpp" }
];

const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];

export default function CodeEditor() {
  const [problems, setProblems] = useState(QUESTION_BANK.coding);
  const [problem, setProblem] = useState(QUESTION_BANK.coding[0]);
  const [language, setLanguage] = useState("javascript");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  // Load problems from backend database
  useEffect(() => {
    fetchCodingProblems().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setProblems(data);
        setProblem(data[0]);
      }
    });
  }, []);

  // Update starter code whenever selected problem or language changes
  useEffect(() => {
    if (!problem) return;
    const starterObj = problem.starters || {};
    const langStarter = starterObj[language] || problem.starter || `// Write your ${language} solution here`;
    setCode(langStarter);
    setResult(null);
  }, [problem, language]);

  const filteredProblems = problems.filter(
    (p) => difficultyFilter === "All" || p.difficulty === difficultyFilter
  );

  async function handleRun() {
    setRunning(true);
    setResult(null);
    const res = await runCode(code, problem.testCases || [], problem.id, language);
    setResult(res);
    setRunning(false);
  }

  const currentLangObj = LANGUAGES.find((l) => l.id === language) || LANGUAGES[0];

  return (
    <div className="flex flex-col h-screen">
      <PageHeader
        title="Code Editor"
        subtitle="Practice algorithm problems in your preferred language with automated test evaluations."
        action={
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-white border border-[var(--color-line)] rounded-md px-3 py-1.5 text-xs font-medium">
              <Code2 className="w-3.5 h-3.5 text-[var(--color-indigo-600)]" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-[var(--color-ink)] focus:outline-none cursor-pointer font-sans"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Problem Picker Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPickerOpen((o) => !o)}
                className="flex items-center gap-2 bg-white border border-[var(--color-line)] rounded-md px-3.5 py-2 text-sm font-medium hover:bg-[var(--color-paper)] transition cursor-pointer"
              >
                <span className="truncate max-w-[180px]">{problem.title}</span>
                <DifficultyTag level={problem.difficulty} />
                <ChevronDown className="w-4 h-4 text-[var(--color-ink)]/40" />
              </button>

              {pickerOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-[var(--color-line)] rounded-lg shadow-xl z-20 overflow-hidden">
                  {/* Difficulty Filter Tabs */}
                  <div className="flex items-center border-b border-[var(--color-line)] bg-[var(--color-paper)]/50 p-1.5">
                    {DIFFICULTIES.map((diff) => (
                      <button
                        key={diff}
                        onClick={() => setDifficultyFilter(diff)}
                        className={`flex-1 py-1 text-xs font-medium rounded transition ${
                          difficultyFilter === diff
                            ? "bg-[var(--color-indigo-950)] text-white shadow-xs"
                            : "text-[var(--color-ink)]/60 hover:text-[var(--color-ink)]"
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>

                  {/* Problem List */}
                  <div className="max-h-64 overflow-y-auto thin-scroll py-1">
                    {filteredProblems.length === 0 ? (
                      <div className="px-4 py-3 text-xs text-[var(--color-ink)]/40 text-center">
                        No problems found for this difficulty.
                      </div>
                    ) : (
                      filteredProblems.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setProblem(p);
                            setPickerOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[var(--color-paper)] flex items-center justify-between border-b border-[var(--color-line)]/40 last:border-0 ${
                            problem.id === p.id ? "bg-[var(--color-indigo-950)]/5 font-medium" : ""
                          }`}
                        >
                          <span className="text-xs text-[var(--color-ink)] truncate max-w-[180px]">{p.title}</span>
                          <DifficultyTag level={p.difficulty} />
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        }
      />

      <div className="flex-1 grid grid-cols-2 min-h-0">
        {/* Left Column: Problem statement */}
        <div className="overflow-y-auto thin-scroll border-r border-[var(--color-line)] px-8 py-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-display text-xl text-[var(--color-ink)]">{problem.title}</h2>
            <DifficultyTag level={problem.difficulty} />
          </div>

          <pre className="whitespace-pre-wrap font-sans text-sm text-[var(--color-ink)]/80 leading-relaxed">
            {problem.prompt}
          </pre>

          {/* Test Case Execution Feedback */}
          {result && (
            <div
              className={`mt-8 rounded-lg border px-4 py-4 text-sm transition-all ${
                result.passed
                  ? "bg-[var(--color-teal-600)]/5 border-[var(--color-teal-600)]/30"
                  : "bg-[var(--color-coral-500)]/5 border-[var(--color-coral-500)]/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2 font-medium">
                <div className="flex items-center gap-2">
                  {result.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-teal-600)]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[var(--color-coral-500)]" />
                  )}
                  <span>{result.passed ? "All Test Cases Passed!" : "Execution Failed / Partial Test Pass"}</span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/60 border border-current">
                  {result.testsPassed}/{result.testsTotal} Passed
                </span>
              </div>
              <pre className="text-[var(--color-ink)]/70 text-xs font-mono whitespace-pre-wrap bg-white/50 p-2.5 rounded border border-[var(--color-line)]/50 mt-2">
                {result.output}
              </pre>
            </div>
          )}
        </div>

        {/* Right Column: Code Editor */}
        <div className="flex flex-col min-h-0 bg-[var(--color-indigo-950)]">
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[var(--color-gold-400)]">{currentLangObj.ext}</span>
              <span className="text-[10px] text-white/30 uppercase font-mono">({language})</span>
            </div>

            <button
              onClick={handleRun}
              disabled={running}
              className="flex items-center gap-1.5 bg-[var(--color-gold-500)] text-[var(--color-indigo-950)] rounded-md px-3.5 py-1.5 text-sm font-medium hover:bg-[var(--color-gold-400)] transition-colors disabled:opacity-60 cursor-pointer"
            >
              {running ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
              {running ? "Running tests…" : "Run code"}
            </button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 resize-none bg-transparent text-[#E7E5DE] font-mono text-sm leading-relaxed px-5 py-4 focus:outline-none thin-scroll"
          />
        </div>
      </div>
    </div>
  );
}

function DifficultyTag({ level }) {
  const color =
    level === "Easy" ? "var(--color-teal-600)" : level === "Medium" ? "var(--color-gold-500)" : "var(--color-coral-500)";
  return (
    <span className="text-[10px] font-medium px-2 py-0.5 rounded font-mono" style={{ color, backgroundColor: `${color}1A` }}>
      {level}
    </span>
  );
}
