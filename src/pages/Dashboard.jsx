import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessagesSquare, Code2, TrendingUp, Flame, Clock, ArrowUpRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { fetchDashboardSummary } from "../services/mockData";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchDashboardSummary().then(setSummary);
  }, []);

  return (
    <div>
      <PageHeader
        title={`Hey ${user?.name || "there"}, ready to prep?`}
        subtitle="Pick up where you left off, or start a fresh mock interview."
      />

      <div className="px-8 py-6 max-w-6xl">
        {user?.targetRole && (
          <div className="mb-6 p-4 rounded-lg bg-white border border-[var(--color-line)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded font-mono text-xs font-semibold bg-[var(--color-indigo-950)] text-[var(--color-gold-400)]">
                Target Role: {user.targetRole}
              </span>
              {user.skills && (
                <span className="text-xs text-[var(--color-ink)]/70 font-sans">
                  <strong className="text-[var(--color-ink)]">Skills:</strong> {user.skills}
                </span>
              )}
            </div>
            {user.githubUrl && (
              <a
                href={user.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[var(--color-indigo-600)] hover:underline font-mono"
              >
                GitHub Profile ↗
              </a>
            )}
          </div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard icon={MessagesSquare} label="Interviews taken" value={summary?.totalInterviews ?? "—"} />
          <StatCard icon={TrendingUp} label="Average score" value={summary ? `${summary.avgScore}%` : "—"} accent="teal" />
          <StatCard icon={Clock} label="Hours practiced" value={summary?.hoursPracticed ?? "—"} />
          <StatCard icon={Flame} label="Day streak" value={summary?.streakDays ?? "—"} accent="gold" />
        </div>

        {/* Quick actions */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <ActionCard
            to="/interview"
            icon={MessagesSquare}
            title="Start a mock interview"
            description="Practice technical or HR questions in a text-based interview and get instant AI feedback."
          />
          <ActionCard
            to="/code"
            icon={Code2}
            title="Solve a coding problem"
            description="Work through DSA-style problems in the code editor and check your approach."
          />
        </div>

        {/* Recent sessions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl text-[var(--color-ink)]">Recent sessions</h2>
            <Link to="/performance" className="text-sm text-[var(--color-indigo-600)] font-medium hover:underline flex items-center gap-1">
              View performance <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="border border-[var(--color-line)] rounded-lg overflow-hidden bg-white">
            {summary?.recentSessions.map((s, i) => (
              <div
                key={s.id}
                className={`flex items-center justify-between px-5 py-4 text-sm ${
                  i !== summary.recentSessions.length - 1 ? "border-b border-[var(--color-line)]" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="w-20 text-[var(--color-ink)]/50 font-mono text-xs">{s.date}</span>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-[var(--color-indigo-950)]/5 text-[var(--color-indigo-900)]">
                    {s.type}
                  </span>
                  <span className="text-[var(--color-ink)]">{s.topic}</span>
                </div>
                <ScorePill score={s.score} />
              </div>
            ))}
            {!summary && <div className="px-5 py-8 text-center text-sm text-[var(--color-ink)]/40">Loading sessions…</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent }) {
  const accentColor =
    accent === "teal" ? "var(--color-teal-600)" : accent === "gold" ? "var(--color-gold-500)" : "var(--color-indigo-700)";
  return (
    <div className="bg-white border border-[var(--color-line)] rounded-lg p-5">
      <Icon className="w-4.5 h-4.5 mb-3" style={{ color: accentColor }} strokeWidth={1.75} />
      <p className="font-display text-2xl text-[var(--color-ink)]">{value}</p>
      <p className="text-xs text-[var(--color-ink)]/50 mt-1">{label}</p>
    </div>
  );
}

function ActionCard({ to, icon: Icon, title, description }) {
  return (
    <Link
      to={to}
      className="group flex flex-col justify-between bg-[var(--color-indigo-950)] text-white rounded-lg p-6 hover:bg-[var(--color-indigo-900)] transition-colors"
    >
      <Icon className="w-6 h-6 text-[var(--color-gold-400)] mb-6" strokeWidth={1.75} />
      <div>
        <h3 className="font-display text-lg mb-1.5 flex items-center gap-2">
          {title}
          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
        </h3>
        <p className="text-sm text-white/55 leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}

function ScorePill({ score }) {
  const color =
    score >= 80 ? "var(--color-teal-600)" : score >= 60 ? "var(--color-gold-500)" : "var(--color-coral-500)";
  return (
    <span className="font-mono text-sm font-medium" style={{ color }}>
      {score}%
    </span>
  );
}
