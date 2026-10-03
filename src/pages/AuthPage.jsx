import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Upload,
  CheckCircle2,
  Briefcase,
  Globe,
  Phone,
  User,
  Mail,
  Lock,
  Code2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const TARGET_ROLES = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Engineer",
  "DevOps & Cloud Engineer",
  "Data Scientist / AI Engineer",
  "Mobile App Developer",
  "System Architect",
  "QA / Test Automation Engineer"
];

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [regStep, setRegStep] = useState(1); // 1 | 2 for registration wizard
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    targetRole: "Full Stack Developer",
    skills: "",
    githubUrl: "",
    resumeUrl: ""
  });
  const [resumeName, setResumeName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (file) {
      setResumeName(file.name);
      // Storing filename/mock URL representation
      update("resumeUrl", `uploaded://${file.name}`);
    }
  }

  function handleNextStep(e) {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.password.trim() || !form.phone.trim()) {
      setError("Please fill in all Step 1 fields (Full name, Email, Password, and Phone number).");
      return;
    }
    setRegStep(2);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        await register(form);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[var(--color-paper)]">
      {/* Left: brand / hero panel */}
      <div className="hidden lg:flex flex-col justify-between bg-[var(--color-indigo-950)] text-white p-12 relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[var(--color-indigo-700)]/40 blur-3xl" />
        <div className="absolute -left-16 bottom-0 w-72 h-72 rounded-full bg-[var(--color-gold-500)]/10 blur-3xl" />

        <div className="relative flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-[var(--color-gold-400)]" strokeWidth={2} />
          <span className="font-display text-2xl">Prepline</span>
        </div>

        <div className="relative max-w-md">
          <p className="text-sm uppercase tracking-wide text-white/40 mb-4 font-mono">Mock interview, real practice</p>
          <h1 className="font-display text-5xl leading-[1.1] mb-6">
            Walk into your next interview already having done it once.
          </h1>
          <p className="text-white/60 leading-relaxed">
            Prepline runs you through technical and HR questions tailored to your target role, reviews your answers like a mentor, and tracks your progress over time.
          </p>
        </div>

        <div className="relative flex items-center gap-3 text-sm text-white/50">
          <Sparkles className="w-4 h-4 text-[var(--color-gold-400)]" />
          AI-generated questions tuned to your skills & career goals.
        </div>
      </div>

      {/* Right: form panel */}
      <div className="flex items-center justify-center p-8 overflow-y-auto thin-scroll">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <GraduationCap className="w-6 h-6 text-[var(--color-indigo-700)]" strokeWidth={2} />
            <span className="font-display text-xl text-[var(--color-ink)]">Prepline</span>
          </div>

          <h2 className="font-display text-3xl text-[var(--color-ink)] mb-1">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>

          <p className="text-sm text-[var(--color-ink)]/55 mb-6">
            {mode === "login"
              ? "Log in to continue your interview preparation."
              : regStep === 1
              ? "Step 1 of 2: Basic Account Details"
              : "Step 2 of 2: Career Profile & Resume"}
          </p>

          {/* Registration Step Indicator */}
          {mode === "register" && (
            <div className="flex items-center gap-2 mb-6">
              <div className={`flex-1 h-1.5 rounded-full ${regStep >= 1 ? "bg-[var(--color-indigo-950)]" : "bg-[var(--color-line)]"}`} />
              <div className={`flex-1 h-1.5 rounded-full ${regStep >= 2 ? "bg-[var(--color-indigo-950)]" : "bg-[var(--color-line)]"}`} />
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === "login" && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Field label="Email" icon={Mail}>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@college.edu"
                  className={inputClass}
                />
              </Field>

              <Field label="Password" icon={Lock}>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="••••••••"
                  className={inputClass}
                />
              </Field>

              {error && <ErrorBox message={error} />}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 flex items-center justify-center gap-2 bg-[var(--color-indigo-950)] text-white rounded-md py-2.5 text-sm font-medium hover:bg-[var(--color-indigo-900)] transition-colors disabled:opacity-60 cursor-pointer"
              >
                {submitting ? "Please wait..." : "Log in"}
                {!submitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}

          {/* REGISTER FORM: STEP 1 */}
          {mode === "register" && regStep === 1 && (
            <form onSubmit={handleNextStep} className="flex flex-col gap-4">
              <Field label="Full name" icon={User}>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Asha Menon"
                  className={inputClass}
                />
              </Field>

              <Field label="Email address" icon={Mail}>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="asha.menon@example.com"
                  className={inputClass}
                />
              </Field>

              <Field label="Phone number" icon={Phone}>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className={inputClass}
                />
              </Field>

              <Field label="Password" icon={Lock}>
                <input
                  type="password"
                  required
                  minLength={4}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="••••••••"
                  className={inputClass}
                />
              </Field>

              {error && <ErrorBox message={error} />}

              <button
                type="submit"
                className="mt-2 flex items-center justify-center gap-2 bg-[var(--color-indigo-950)] text-white rounded-md py-2.5 text-sm font-medium hover:bg-[var(--color-indigo-900)] transition-colors cursor-pointer"
              >
                Next Step: Career Profile
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* REGISTER FORM: STEP 2 */}
          {mode === "register" && regStep === 2 && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Field label="Choose position / job role to prepare for" icon={Briefcase}>
                <select
                  value={form.targetRole}
                  onChange={(e) => update("targetRole", e.target.value)}
                  className={inputClass}
                >
                  {TARGET_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Skill set (Comma separated)" icon={Code2}>
                <input
                  type="text"
                  value={form.skills}
                  onChange={(e) => update("skills", e.target.value)}
                  placeholder="e.g. React, Node.js, Python, SQL, Docker"
                  className={inputClass}
                />
              </Field>

              <Field label="GitHub Profile link" icon={Globe}>
                <input
                  type="url"
                  value={form.githubUrl}
                  onChange={(e) => update("githubUrl", e.target.value)}
                  placeholder="https://github.com/username"
                  className={inputClass}
                />
              </Field>

              <Field label="Upload Resume (PDF / DOCX)">
                <div className="relative border-2 border-dashed border-[var(--color-line)] hover:border-[var(--color-indigo-500)] rounded-md p-4 bg-white transition text-center cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex flex-col items-center gap-1.5 pointer-events-none">
                    {resumeName ? (
                      <div className="flex items-center gap-2 text-[var(--color-teal-600)] font-medium text-xs">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span className="truncate max-w-[200px]">{resumeName}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-[var(--color-ink)]/40" />
                        <span className="text-xs text-[var(--color-ink)]/60 font-medium">
                          Click or drag to upload resume
                        </span>
                        <span className="text-[10px] text-[var(--color-ink)]/40 font-mono">
                          PDF, DOCX up to 5MB
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </Field>

              {error && <ErrorBox message={error} />}

              <div className="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setRegStep(1);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-[var(--color-line)] bg-white text-[var(--color-ink)] rounded-md py-2.5 text-sm font-medium hover:bg-[var(--color-paper)] transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-[2] flex items-center justify-center gap-2 bg-[var(--color-indigo-950)] text-white rounded-md py-2.5 text-sm font-medium hover:bg-[var(--color-indigo-900)] transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? "Creating profile..." : "Complete Registration"}
                  {!submitting && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </form>
          )}

          <p className="text-sm text-[var(--color-ink)]/55 mt-6 text-center">
            {mode === "login" ? "New to Prepline?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setRegStep(1);
                setError("");
              }}
              className="text-[var(--color-indigo-600)] font-medium hover:underline cursor-pointer"
            >
              {mode === "login" ? "Create an account" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-[var(--color-line)] bg-white px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-indigo-500)]/40 focus:border-[var(--color-indigo-500)] transition";

function Field({ label, icon: Icon, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        {Icon && <Icon className="w-3.5 h-3.5 text-[var(--color-indigo-700)] shrink-0" />}
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-ink)]/70">{label}</span>
      </div>
      {children}
    </label>
  );
}

function ErrorBox({ message }) {
  return (
    <p className="text-xs text-[var(--color-coral-500)] bg-[var(--color-coral-500)]/10 rounded-md px-3 py-2 border border-[var(--color-coral-500)]/20">
      {message}
    </p>
  );
}
