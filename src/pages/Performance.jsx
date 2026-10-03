import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PageHeader from "../components/PageHeader";
import { fetchPerformanceHistory } from "../services/mockData";

export default function Performance() {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    fetchPerformanceHistory().then(setHistory);
  }, []);

  const latest = history?.[history.length - 1];
  const first = history?.[0];

  return (
    <div>
      <PageHeader
        title="Performance"
        subtitle="Track how your scores are trending across categories over time."
      />

      <div className="px-8 py-8 max-w-6xl">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <TrendCard label="Technical" current={latest?.technical} previous={first?.technical} color="var(--color-indigo-600)" />
          <TrendCard label="HR / Behavioral" current={latest?.hr} previous={first?.hr} color="var(--color-gold-500)" />
          <TrendCard label="Coding" current={latest?.coding} previous={first?.coding} color="var(--color-teal-600)" />
        </div>

        <div className="bg-white border border-[var(--color-line)] rounded-lg p-6">
          <h2 className="font-display text-lg text-[var(--color-ink)] mb-1">Score trend</h2>
          <p className="text-sm text-[var(--color-ink)]/50 mb-6">Last {history?.length ?? 0} sessions</p>

          <div className="h-80">
            {history && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-line)" vertical={false} />
                  <XAxis dataKey="session" tick={{ fontSize: 12, fill: "#8A8677" }} axisLine={{ stroke: "var(--color-line)" }} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#8A8677" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid var(--color-line)",
                      fontSize: 13,
                      fontFamily: "Inter, sans-serif",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 13, paddingTop: 12 }} />
                  <Line type="monotone" dataKey="technical" name="Technical" stroke="var(--color-indigo-600)" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="hr" name="HR" stroke="var(--color-gold-500)" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="coding" name="Coding" stroke="var(--color-teal-600)" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TrendCard({ label, current, previous, color }) {
  const delta = current != null && previous != null ? current - previous : null;
  return (
    <div className="bg-white border border-[var(--color-line)] rounded-lg p-5">
      <p className="text-xs text-[var(--color-ink)]/50 mb-2">{label}</p>
      <div className="flex items-end gap-2">
        <span className="font-display text-3xl text-[var(--color-ink)]">{current ?? "—"}%</span>
        {delta != null && (
          <span
            className="text-xs font-mono font-medium mb-1"
            style={{ color: delta >= 0 ? "var(--color-teal-600)" : "var(--color-coral-500)" }}
          >
            {delta >= 0 ? "+" : ""}
            {delta} pts
          </span>
        )}
      </div>
      <div className="h-1 rounded-full bg-[var(--color-line)] mt-3 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${current ?? 0}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
