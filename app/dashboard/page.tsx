"use client";

import Link from "next/link";
import React from "react";
import { useTheme } from "../theme-provider";

type ActiveNav = "Overview" | "Settings";
type WorkspaceMode = "summary" | "quiz";
type QuizDifficulty = "Easy" | "Depth" | "Exam Level" | "Extreme";
type AiConnectionMode = "unknown" | "gemini" | "fallback";

type MCQQuestion = {
  id: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
};

type StudySummary = {
  title: string;
  overview: string;
  keyConcepts: string[];
  definitions: Array<{ term: string; meaning: string }>;
  simplified: string[];
  examFocus: string[];
  quickRecall: string[];
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M12 2l1.2 6.2L20 10l-6.8 1.8L12 18l-1.2-6.2L4 10l6.8-1.8L12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M19.5 14.5l.6 2.6 2.4.6-2.4.6-.6 2.4-.6-2.4-2.4-.6 2.4-.6.6-2.6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M12 16V4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 9l5-5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16.5c0 1.933 1.567 3.5 3.5 3.5h9c1.933 0 3.5-1.567 3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function QuizIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M7 4h10a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SummaryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M7 3h7l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 12h8M8 16h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("animate-spin", className)} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 9 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function LoadingDots({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)} aria-hidden="true">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-200 [animation-delay:-0.2s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-200 [animation-delay:-0.1s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-200" />
    </span>
  );
}

function SkeletonLine({ className }: { className?: string }) {
  return <div className={cn("h-3 w-full rounded-full bg-[var(--chip)] animate-pulse", className)} />;
}

function GlassCard({
  title,
  subtitle,
  icon,
  children,
  right,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="group relative overflow-hidden rounded-3xl bg-[var(--panel)] p-6 backdrop-blur-xl ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)] transition-all duration-300 hover:ring-blue-400/30">
      <div className="absolute -right-14 -top-14 h-32 w-32 rounded-full bg-blue-500/15 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {icon ? (
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-500/15 text-blue-700 ring-1 ring-blue-400/20 dark:text-blue-200">
                {icon}
              </div>
            ) : null}
            <div>
              <h2 className="text-base font-semibold tracking-tight">{title}</h2>
              {subtitle ? <p className="mt-0.5 text-xs text-[var(--muted)]">{subtitle}</p> : null}
            </div>
          </div>
          {right}
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </section>
  );
}

function NavItem({
  label,
  active,
  onClick,
  icon,
}: {
  label: ActiveNav;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition-all duration-200",
        active
          ? "bg-blue-500/10 text-[var(--foreground)] ring-1 ring-blue-400/25"
          : "text-[var(--muted-strong)] hover:bg-[var(--chip)] hover:text-[var(--foreground)] ring-1 ring-transparent"
      )}
    >
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-xl transition-colors",
          active ? "bg-blue-500/15 text-blue-700 dark:text-blue-200" : "bg-[var(--chip)] text-[var(--muted-strong)]"
        )}
      >
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function fakeSummaryFromText(input: string): StudySummary {
  const raw = input.trim();
  const cleaned = raw.replace(/\s+/g, " ");
  const words = cleaned.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter((w) => w.length >= 4);
  const freq = new Map<string, number>();
  for (const w of words) freq.set(w, (freq.get(w) ?? 0) + 1);
  const keyConcepts = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([w]) => w[0].toUpperCase() + w.slice(1));

  const definitions: Array<{ term: string; meaning: string }> = [];
  for (const line of raw.split(/\r?\n/)) {
    const m = line.trim().match(/^(.{2,50}?)\s*[:\-]\s+(.{8,})$/);
    if (m) definitions.push({ term: m[1].trim(), meaning: m[2].trim() });
    if (definitions.length >= 8) break;
  }

  return {
    title: keyConcepts[0] ? `Study Summary: ${keyConcepts[0]}` : "Study Summary",
    overview: cleaned.split(/(?<=[.!?])\s+/).filter(Boolean)[0] ?? "Upload your notes for a detailed summary.",
    keyConcepts,
    definitions,
    simplified: [
      "Identify the main idea first, then connect supporting details.",
      "Turn definitions into examples you can explain quickly.",
      "Use short recall loops to find and fix gaps.",
    ],
    examFocus: [
      "Know definitions and when to apply them in exam-style questions.",
      "Compare closely related concepts and explain differences clearly.",
      "Practice with timed quizzes and review mistakes.",
    ],
    quickRecall: [
      "Teach the concept in under a minute.",
      "Convert headings to questions and answer from memory.",
      "Track errors and revise weak points first.",
    ],
  };
}

function fakeQuizFromText(
  input: string,
  maxQuestions = 50,
  difficulty: QuizDifficulty = "Depth"
): MCQQuestion[] {
  const cleaned = input.trim().replace(/\s+/g, " ");
  const tokens = cleaned.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter((t) => t.length >= 4);
  const freq = new Map<string, number>();
  for (const t of tokens) freq.set(t, (freq.get(t) ?? 0) + 1);
  const keywords = [...freq.entries()].sort((a, b) => b[1] - a[1]).map(([w]) => w).slice(0, 30);
  const pool = keywords.length ? keywords : ["concept", "definition", "process"];
  const count = Math.max(5, Math.min(maxQuestions, 50));

  return Array.from({ length: count }, (_, i) => {
    const kw = pool[i % pool.length];
    const cap = kw[0].toUpperCase() + kw.slice(1);
    const correctIndex = (i % 4) as 0 | 1 | 2 | 3;
    const promptByDifficulty = {
      Easy: `Which option best describes "${cap}"?`,
      Depth: `Which option best explains the role of "${cap}" in context?`,
      "Exam Level": `In an exam setting, which interpretation of "${cap}" is most accurate?`,
      Extreme: `Which statement about "${cap}" remains valid under edge-case application?`,
    } satisfies Record<QuizDifficulty, string>;

    const optionsByDifficulty = {
      Easy: [
        `Simple meaning of ${cap}`,
        `Unrelated detail to ${cap}`,
        `Common confusion about ${cap}`,
        `Correct core definition of ${cap}`,
      ],
      Depth: [
        `Surface-level description of ${cap}`,
        `Context-aware explanation of ${cap}`,
        `Distractor that sounds plausible but incomplete`,
        `Definition without application context`,
      ],
      "Exam Level": [
        `Overly broad interpretation of ${cap}`,
        `Accurate analytical interpretation of ${cap}`,
        `Memorized line with no conceptual fit`,
        `Answer that ignores constraints`,
      ],
      Extreme: [
        `Looks correct but breaks under exceptions`,
        `Robust interpretation that handles constraints`,
        `Partly valid statement missing critical condition`,
        `Distractor with high lexical similarity`,
      ],
    } satisfies Record<QuizDifficulty, [string, string, string, string]>;

    const options = [...optionsByDifficulty[difficulty]] as [string, string, string, string];
    options[correctIndex] = `Best description of ${cap}`;
    return {
      id: `q_${i + 1}`,
      prompt: promptByDifficulty[difficulty],
      options,
      correctIndex,
    };
  });
}

export default function DashboardPage() {
  const { theme, setTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [active, setActive] = React.useState<ActiveNav>("Overview");
  const [notesText, setNotesText] = React.useState("");
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const [extracting, setExtracting] = React.useState(false);

  const pdfjsRef = React.useRef<unknown>(null);

  const [loading, setLoading] = React.useState<null | "summary" | "quiz">(null);
  const [summary, setSummary] = React.useState<StudySummary | null>(null);
  const [quiz, setQuiz] = React.useState<MCQQuestion[] | null>(null);
  const [quizAnswers, setQuizAnswers] = React.useState<Record<string, number>>({});
  const [quizIndex, setQuizIndex] = React.useState(0);
  const [quizReveal, setQuizReveal] = React.useState(false);
  const [workspaceMode, setWorkspaceMode] = React.useState<WorkspaceMode>("summary");
  const [quizDifficulty, setQuizDifficulty] = React.useState<QuizDifficulty>("Depth");
  const [quizCount, setQuizCount] = React.useState<10 | 20 | 30 | 40 | 50>(20);
  const [summaryError, setSummaryError] = React.useState<string | null>(null);
  const [quizError, setQuizError] = React.useState<string | null>(null);
  const [aiMode, setAiMode] = React.useState<AiConnectionMode>("unknown");

  const [summariesGenerated, setSummariesGenerated] = React.useState(0);
  const [quizzesCompleted, setQuizzesCompleted] = React.useState(0);
  const [uploadedFiles, setUploadedFiles] = React.useState(0);
  const [quizRunId, setQuizRunId] = React.useState(0);
  const lastCountedQuizRunIdRef = React.useRef<number | null>(null);

  const canGenerate = notesText.trim().length > 0 || Boolean(fileName);

  async function getPdfJs() {
    if (pdfjsRef.current) return pdfjsRef.current as any;
    const pdfjs = await import("pdfjs-dist");
    (pdfjs as any).GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
    pdfjsRef.current = pdfjs;
    return pdfjs;
  }

  function resetOutputs() {
    setSummary(null);
    setQuiz(null);
    setQuizAnswers({});
    setQuizIndex(0);
    setQuizReveal(false);
    setSummaryError(null);
    setQuizError(null);
  }

  async function extractTextFromPdf(file: File) {
    const pdfjsLib = await getPdfJs();
    const data = new Uint8Array(await file.arrayBuffer());
    const pdf = await pdfjsLib.getDocument({ data }).promise;
    const pageTexts: string[] = [];
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const strings = content.items.map((it: { str?: string }) => it.str ?? "").filter(Boolean);
      pageTexts.push(strings.join(" "));
    }
    return pageTexts.join("\n\n");
  }

  async function handleIncomingFile(file: File) {
    setUploadError(null);
    setExtracting(true);
    resetOutputs();
    try {
      const name = file.name || "uploaded-file";
      const ext = name.split(".").pop()?.toLowerCase();
      const type = file.type?.toLowerCase();
      if (ext === "txt" || type === "text/plain") {
        setNotesText(await file.text());
        setFileName(name);
        setUploadedFiles((v) => v + 1);
        return;
      }
      if (ext === "pdf" || type === "application/pdf") {
        setNotesText(await extractTextFromPdf(file));
        setFileName(name);
        setUploadedFiles((v) => v + 1);
        return;
      }
      setUploadError("Unsupported file. Please upload a PDF or TXT file.");
    } catch {
      setUploadError("Could not extract text from this file. Try another file.");
    } finally {
      setExtracting(false);
      setIsDragging(false);
    }
  }

  async function runSummary() {
    if (!canGenerate) return;
    resetOutputs();
    setLoading("summary");
    try {
      const res = await fetch("/api/ai-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: notesText || "Uploaded notes" }),
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      const data = await res.json();
      if (data?.summary) {
        setSummary(data.summary as StudySummary);
        setAiMode("gemini");
        setSummariesGenerated((v) => v + 1);
      } else {
        throw new Error("Missing summary field in AI response.");
      }
    } catch {
      setSummaryError("AI summary service unavailable. Showing local summary instead.");
      setSummary(fakeSummaryFromText(notesText || "Uploaded notes"));
      setAiMode("fallback");
      setSummariesGenerated((v) => v + 1);
    } finally {
      setLoading(null);
    }
  }

  async function runQuiz() {
    if (!canGenerate) return;
    resetOutputs();
    setLoading("quiz");
    try {
      const res = await fetch("/api/ai-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: notesText || "Uploaded notes",
          difficulty: quizDifficulty,
          count: quizCount,
        }),
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      const data = await res.json();
      if (Array.isArray(data?.questions) && data.questions.length) {
        setQuiz(
          data.questions.map((q: any, idx: number): MCQQuestion => ({
            id: q.id ?? `q_${idx + 1}`,
            prompt: q.prompt ?? "",
            options: q.options ?? ["Option A", "Option B", "Option C", "Option D"],
            correctIndex:
              q.correctIndex === 0 || q.correctIndex === 1 || q.correctIndex === 2 || q.correctIndex === 3
                ? q.correctIndex
                : 0,
          }))
        );
        setAiMode("gemini");
        setQuizRunId((v) => v + 1);
      } else {
        throw new Error("No questions returned from AI.");
      }
    } catch {
      setQuizError("AI quiz service unavailable. Using local quiz instead.");
      setQuiz(fakeQuizFromText(notesText || "Uploaded notes", quizCount, quizDifficulty));
      setAiMode("fallback");
      setQuizRunId((v) => v + 1);
    } finally {
      setLoading(null);
    }
  }

  const quizScore =
    quiz?.reduce((acc, q) => {
      const picked = quizAnswers[q.id];
      if (picked === undefined) return acc;
      return acc + (picked === q.correctIndex ? 1 : 0);
    }, 0) ?? 0;
  const quizAnsweredCount = quiz ? quiz.reduce((acc, q) => acc + (quizAnswers[q.id] === undefined ? 0 : 1), 0) : 0;
  const quizComplete = Boolean(quiz) && quizAnsweredCount === (quiz?.length ?? 0);
  const currentQuestion = quiz ? quiz[quizIndex] : null;

  React.useEffect(() => {
    if (!quizComplete) return;
    if (lastCountedQuizRunIdRef.current === quizRunId) return;
    lastCountedQuizRunIdRef.current = quizRunId;
    setQuizzesCompleted((v) => v + 1);
  }, [quizComplete, quizRunId]);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-260px] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute -left-24 top-40 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[130px]" />
        <div className="absolute -right-24 top-64 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-[280px] border-r border-[var(--panel-border)] bg-[var(--panel)] shadow-[var(--panel-shadow)] backdrop-blur-xl transition-transform duration-300 md:sticky md:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-col p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">AI Study Assistant</div>
              <button type="button" className="md:hidden" onClick={() => setSidebarOpen(false)}>x</button>
            </div>
            <div className="mt-6 space-y-2">
              <NavItem label="Overview" active={active === "Overview"} onClick={() => setActive("Overview")} icon={<SparkIcon className="h-5 w-5" />} />
              <NavItem label="Settings" active={active === "Settings"} onClick={() => setActive("Settings")} icon={<SparkIcon className="h-5 w-5" />} />
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-[var(--panel)] p-4 ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold tracking-widest text-[var(--muted-strong)]">
                    STUDY STATS
                  </div>
                  <div
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-semibold ring-1",
                      aiMode === "gemini"
                        ? "bg-emerald-500/10 text-emerald-200 ring-emerald-400/20"
                        : aiMode === "fallback"
                        ? "bg-amber-500/10 text-amber-200 ring-amber-400/20"
                        : "bg-[var(--chip)] text-[var(--muted-strong)] ring-[var(--panel-border)]"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        aiMode === "gemini"
                          ? "bg-emerald-300"
                          : aiMode === "fallback"
                          ? "bg-amber-300"
                          : "bg-slate-400"
                      )}
                    />
                    {aiMode === "gemini"
                      ? "Gemini Connected"
                      : aiMode === "fallback"
                      ? "Fallback Mode"
                      : "AI Idle"}
                  </div>
                </div>

                <div
                  key={workspaceMode}
                  className="mt-4 text-xs transition-all duration-300"
                >
                  {workspaceMode === "summary" ? (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-[var(--chip)] p-3 ring-1 ring-[var(--panel-border)]">
                        <div className="text-[var(--muted)]">Summaries</div>
                        <div className="mt-1 text-lg font-extrabold tracking-tight text-blue-700 dark:text-blue-200">
                          {summariesGenerated}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-[var(--chip)] p-3 ring-1 ring-[var(--panel-border)]">
                        <div className="text-[var(--muted)]">Uploads</div>
                        <div className="mt-1 text-lg font-extrabold tracking-tight text-blue-700 dark:text-blue-200">
                          {uploadedFiles}
                        </div>
                      </div>
                      <div className="col-span-2 rounded-2xl bg-blue-500/10 p-3 ring-1 ring-blue-400/15">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-[var(--muted-strong)]">
                            Current mode
                          </div>
                          <div className="text-xs font-semibold text-blue-700 dark:text-blue-200">
                            Summary
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-[var(--chip)] p-3 ring-1 ring-[var(--panel-border)]">
                        <div className="text-[var(--muted)]">Quizzes generated</div>
                        <div className="mt-1 text-lg font-extrabold tracking-tight text-blue-700 dark:text-blue-200">
                          {quizRunId}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-[var(--chip)] p-3 ring-1 ring-[var(--panel-border)]">
                        <div className="text-[var(--muted)]">Questions</div>
                        <div className="mt-1 text-lg font-extrabold tracking-tight text-blue-700 dark:text-blue-200">
                          {quizCount}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-[var(--chip)] p-3 ring-1 ring-[var(--panel-border)]">
                        <div className="text-[var(--muted)]">Difficulty</div>
                        <div className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                          {quizDifficulty}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-[var(--chip)] p-3 ring-1 ring-[var(--panel-border)]">
                        <div className="text-[var(--muted)]">Progress</div>
                        <div className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                          {quiz
                            ? quizComplete
                              ? `Score ${quizScore}/${quiz.length}`
                              : `${quizAnsweredCount}/${quiz.length}`
                            : "No quiz"}
                        </div>
                      </div>
                      <div className="col-span-2 h-2 overflow-hidden rounded-full bg-[var(--chip)] ring-1 ring-[var(--panel-border)]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-400/80 via-blue-500/80 to-cyan-300/80 transition-all duration-500"
                          style={{
                            width: quiz
                              ? `${Math.round((quizAnsweredCount / Math.max(quiz.length, 1)) * 100)}%`
                              : "0%",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-3xl bg-[var(--panel)] p-4 ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)]">
                <div className="text-xs font-semibold tracking-widest text-[var(--muted-strong)]">
                  QUICK ACTIONS
                </div>
                <div className="mt-3 grid gap-2">
                  <button
                    type="button"
                    disabled={loading !== null}
                    onClick={() => {
                      setNotesText("");
                      setFileName(null);
                      resetOutputs();
                      setLoading(null);
                    }}
                    className={cn(
                      "inline-flex items-center justify-center rounded-2xl px-3 py-2 text-xs font-semibold ring-1 transition-all",
                      loading !== null
                        ? "bg-[var(--chip)] text-[var(--muted)] ring-[var(--panel-border)] cursor-not-allowed"
                        : "bg-[var(--chip)] text-[var(--foreground)] ring-[var(--panel-border)] hover:ring-blue-400/30"
                    )}
                  >
                    Clear Workspace
                  </button>
                  <button
                    type="button"
                    disabled={loading !== null}
                    onClick={() => {
                      setNotesText("");
                      setFileName(null);
                      resetOutputs();
                      setLoading(null);
                      setAiMode("unknown");
                    }}
                    className={cn(
                      "inline-flex items-center justify-center rounded-2xl px-3 py-2 text-xs font-semibold ring-1 transition-all",
                      loading !== null
                        ? "bg-[var(--chip)] text-[var(--muted)] ring-[var(--panel-border)] cursor-not-allowed"
                        : "bg-blue-500 text-black ring-1 ring-blue-400/25 hover:bg-blue-400"
                    )}
                  >
                    New Session
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto px-4 pb-4 pt-6">
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
    <p className="text-sm font-semibold text-white/80">
      Nutronote AI
    </p>

    <p className="mt-1 text-xs text-white/40">
      Designed & developed by Tokavi
    </p>
  </div>
</div>
        </aside>

        <div className="relative flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-[var(--panel-border)] bg-[var(--panel)] shadow-[var(--panel-shadow)] backdrop-blur-xl">
            <div className="flex items-center justify-between px-5 py-4 md:px-8">
              <button type="button" className="md:hidden" onClick={() => setSidebarOpen(true)}>☰</button>
              <div className="text-sm font-semibold tracking-tight">{active}</div>
              <div className="flex items-center gap-2">
                <Link href="/" className="rounded-2xl border border-[var(--panel-border)] bg-[var(--panel)] px-3 py-2 text-xs font-semibold text-[var(--foreground)] shadow-[var(--panel-shadow)]">Home</Link>
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-500/15 text-blue-700 ring-1 ring-blue-400/25 dark:text-blue-200">
                  AI
                </div>
              </div>
            </div>
          </header>

          <div className="px-5 py-6 md:px-8 md:py-8 space-y-5">
            {active === "Overview" && (
              <>
                <GlassCard
                  title="Workspace"
                  subtitle="Choose a focused mode for better study flow."
                  icon={<SparkIcon className="h-5 w-5" />}
                >
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setWorkspaceMode("summary")}
                      disabled={loading !== null}
                      className={cn(
                        "rounded-2xl px-4 py-2 text-sm font-semibold ring-1 transition-all",
                        workspaceMode === "summary"
                          ? "bg-blue-500 text-black ring-blue-400/30"
                        : "bg-[var(--chip)] text-[var(--foreground)] ring-[var(--panel-border)] hover:ring-blue-400/30"
                      )}
                    >
                      Summary mode
                    </button>
                    <button
                      type="button"
                      onClick={() => setWorkspaceMode("quiz")}
                      disabled={loading !== null}
                      className={cn(
                        "rounded-2xl px-4 py-2 text-sm font-semibold ring-1 transition-all",
                        workspaceMode === "quiz"
                          ? "bg-blue-500 text-black ring-blue-400/30"
                          : "bg-[var(--chip)] text-[var(--foreground)] ring-[var(--panel-border)] hover:ring-blue-400/30"
                      )}
                    >
                      Quiz mode
                    </button>
                  </div>
                </GlassCard>

                {workspaceMode === "summary" ? (
                  <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                    <GlassCard
                      title="Summary input"
                      subtitle="Upload notes or paste text, then generate a structured summary."
                      icon={<UploadIcon className="h-5 w-5" />}
                    >
                      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-stretch">
                        <div
                          className={cn(
                            "relative overflow-hidden rounded-2xl bg-[var(--panel)] p-4 ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)] transition-all",
                            isDragging ? "ring-blue-400/35 bg-blue-500/10" : "hover:ring-blue-400/30"
                          )}
                          onDragEnter={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                          }}
                          onDragLeave={(e) => {
                            e.preventDefault();
                            setIsDragging(false);
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            const f = e.dataTransfer.files?.[0];
                            if (f) void handleIncomingFile(f);
                          }}
                        >
                          <input
                            type="file"
                            accept=".pdf,.txt,application/pdf,text/plain"
                            className="absolute inset-0 cursor-pointer opacity-0"
                            onChange={(e) => {
                              const f = e.currentTarget.files?.[0];
                              if (f) void handleIncomingFile(f);
                              e.currentTarget.value = "";
                            }}
                          />
                          <div className="text-sm font-semibold">
                            {fileName ?? (extracting ? "Extracting text..." : "Drag and drop a PDF/TXT, or click to browse")}
                          </div>
                          <div className="mt-1 text-xs text-[var(--muted)]">Extracted text auto-fills the notes editor.</div>
                          {uploadError ? <div className="mt-2 text-xs font-semibold text-rose-200">{uploadError}</div> : null}
                        </div>
                        <label
                          className={cn(
                            "relative overflow-hidden rounded-2xl px-5 py-4 text-sm font-semibold ring-1 transition-all sm:flex sm:items-center sm:justify-center",
                            extracting
                              ? "bg-[var(--chip)] text-[var(--muted)] ring-[var(--panel-border)]"
                              : "bg-blue-500 text-black ring-blue-400/25"
                          )}
                        >
                          <input
                            type="file"
                            accept=".pdf,.txt,application/pdf,text/plain"
                            className="absolute inset-0 cursor-pointer opacity-0"
                            onChange={(e) => {
                              const f = e.currentTarget.files?.[0];
                              if (f) void handleIncomingFile(f);
                              e.currentTarget.value = "";
                            }}
                            disabled={extracting}
                          />
                          {extracting ? "Uploading" : "Upload"}
                        </label>
                      </div>
                      <div className="mt-4">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="text-sm font-semibold">Notes editor</div>
                          <div className="text-xs text-[var(--muted)]">{notesText.trim().length} chars</div>
                        </div>
                        <textarea
                          value={notesText}
                          onChange={(e) => setNotesText(e.target.value)}
                          rows={14}
                          className="w-full resize-none rounded-2xl bg-[var(--panel)] p-4 text-sm text-[var(--foreground)] ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)] outline-none focus:ring-blue-400/30"
                        />
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={runSummary}
                          disabled={!canGenerate || loading !== null}
                          className={cn(
                            "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300",
                            !canGenerate || loading
                              ? "bg-[var(--chip)] text-[var(--muted)] ring-1 ring-[var(--panel-border)]"
                              : "bg-blue-500 text-black"
                          )}
                        >
                          {loading === "summary" ? (
                            <>
                              <Spinner className="h-5 w-5" />
                              <span>
                                Analyzing notes <LoadingDots className="ml-2" />
                              </span>
                            </>
                          ) : (
                            "Generate Summary"
                          )}
                        </button>
                      </div>
                    </GlassCard>

                    <GlassCard title="Summary output" subtitle="Detailed, study-ready summary sections." icon={<SummaryIcon className="h-5 w-5" />}>
                      {summaryError && (
                        <div className="mb-3 text-xs font-semibold text-amber-300">
                          {summaryError}
                        </div>
                      )}
                      {loading === "summary" ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-3 rounded-2xl bg-blue-500/10 p-4 ring-1 ring-blue-400/20">
                            <div className="flex items-center gap-3">
                              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-500/15 text-blue-700 ring-1 ring-blue-400/25 dark:text-blue-200">
                                <Spinner className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-blue-700 dark:text-blue-200">Generating summary...</div>
                                <div className="mt-0.5 text-xs text-[var(--muted)]">
                                  Preparing AI response <LoadingDots className="ml-2" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-2xl bg-[var(--panel)] p-4 ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)]">
                            <SkeletonLine className="w-2/3" />
                            <div className="mt-3 space-y-2">
                              <SkeletonLine />
                              <SkeletonLine />
                              <SkeletonLine className="w-5/6" />
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-2xl bg-[var(--panel)] p-4 ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)]">
                              <SkeletonLine className="w-1/2" />
                              <div className="mt-3 space-y-2">
                                <SkeletonLine />
                                <SkeletonLine className="w-5/6" />
                                <SkeletonLine className="w-2/3" />
                              </div>
                            </div>
                            <div className="rounded-2xl bg-[var(--panel)] p-4 ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)]">
                              <SkeletonLine className="w-1/2" />
                              <div className="mt-3 space-y-2">
                                <SkeletonLine />
                                <SkeletonLine className="w-4/5" />
                                <SkeletonLine className="w-2/3" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : summary ? (
                        <div className="space-y-5 text-sm text-[var(--muted-strong)]">
                          <div>
                            <div className="text-base font-semibold text-blue-700 dark:text-blue-200">{summary.title}</div>
                            <p className="mt-2 leading-relaxed">{summary.overview}</p>
                          </div>
                          <div className="rounded-2xl bg-blue-500/10 p-4 ring-1 ring-blue-400/20">
                            <div className="text-xs font-semibold tracking-widest text-blue-700 dark:text-blue-200">KEY CONCEPTS</div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {summary.keyConcepts.slice(0, 12).map((k) => (
                                <span key={k} className="rounded-full bg-[var(--chip)] px-3 py-1 text-xs ring-1 ring-[var(--panel-border)]">
                                  {k}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-2xl bg-[var(--panel)] p-4 ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)]">
                              <div className="text-xs font-semibold tracking-widest text-[var(--muted-strong)]">DEFINITIONS</div>
                              <ul className="mt-3 space-y-2">
                                {(summary.definitions.length ? summary.definitions : [{ term: "Tip", meaning: 'Use "Term: meaning" format in notes.' }]).map((d) => (
                                  <li key={d.term} className="text-sm">
                                    <span className="font-semibold text-blue-700 dark:text-blue-200">{d.term}:</span> <span>{d.meaning}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="rounded-2xl bg-[var(--panel)] p-4 ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)]">
                              <div className="text-xs font-semibold tracking-widest text-[var(--muted-strong)]">EXAM FOCUS</div>
                              <ul className="mt-3 space-y-2">
                                {summary.examFocus.map((p) => (
                                  <li key={p} className="flex items-start gap-2">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300/70" />
                                    <span>{p}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-[var(--muted)]">Generate a summary to see output.</div>
                      )}
                    </GlassCard>
                  </div>
                ) : (
                  <div className="grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                    <GlassCard title="Quiz setup" subtitle="Configure and generate your quiz." icon={<QuizIcon className="h-5 w-5" />}>
                      <div className="space-y-5">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-2xl bg-[var(--panel)] p-4 ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)]">
                            <div className="text-xs font-semibold tracking-widest text-[var(--muted-strong)]">DIFFICULTY</div>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                              {(["Easy", "Depth", "Exam Level", "Extreme"] as QuizDifficulty[]).map((d) => (
                                <button
                                  key={d}
                                  type="button"
                                  onClick={() => setQuizDifficulty(d)}
                                  disabled={loading !== null}
                                  className={cn(
                                    "rounded-xl px-3 py-2 text-xs font-semibold ring-1 transition-all",
                                    quizDifficulty === d
                                      ? "bg-blue-500 text-black ring-blue-400/30"
                                      : "bg-[var(--chip)] text-[var(--foreground)] ring-[var(--panel-border)] hover:ring-blue-400/30"
                                  )}
                                >
                                  {d}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="rounded-2xl bg-[var(--panel)] p-4 ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)]">
                            <div className="text-xs font-semibold tracking-widest text-[var(--muted-strong)]">QUESTIONS</div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {[10, 20, 30, 40, 50].map((n) => (
                                <button
                                  key={n}
                                  type="button"
                                  onClick={() => setQuizCount(n as 10 | 20 | 30 | 40 | 50)}
                                  disabled={loading !== null}
                                  className={cn(
                                    "rounded-xl px-3 py-2 text-xs font-semibold ring-1 transition-all",
                                    quizCount === n
                                      ? "bg-blue-500 text-black ring-blue-400/30"
                                      : "bg-[var(--chip)] text-[var(--foreground)] ring-[var(--panel-border)] hover:ring-blue-400/30"
                                  )}
                                >
                                  {n}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <div className="text-sm font-semibold">Quiz source notes</div>
                            <div className="text-xs text-gray-500">{notesText.trim().length} chars</div>
                          </div>
                          <textarea
                            value={notesText}
                            onChange={(e) => setNotesText(e.target.value)}
                            rows={10}
                            className="w-full resize-none rounded-2xl bg-white/5 p-4 text-sm text-gray-200 ring-1 ring-white/10 outline-none focus:ring-blue-400/30"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={runQuiz}
                          disabled={!canGenerate || loading !== null}
                          className={cn(
                            "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300",
                            !canGenerate || loading ? "bg-white/5 text-gray-500 ring-1 ring-white/10" : "bg-blue-500 text-black"
                          )}
                        >
                          {loading === "quiz" ? (
                            <>
                              <Spinner className="h-5 w-5" />
                              <span>
                                Building quiz <LoadingDots className="ml-2" />
                              </span>
                            </>
                          ) : (
                            `Generate ${quizCount} Question Quiz`
                          )}
                        </button>
                      </div>
                    </GlassCard>

                    <GlassCard title="Quiz runner" subtitle="One question at a time with live score." icon={<SparkIcon className="h-5 w-5" />}>
                      {quizError && (
                        <div className="mb-3 text-xs font-semibold text-amber-300">
                          {quizError}
                        </div>
                      )}
                      {loading === "quiz" ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-3 rounded-2xl bg-blue-500/10 p-4 ring-1 ring-blue-400/20">
                            <div className="flex items-center gap-3">
                              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-500/15 text-blue-700 ring-1 ring-blue-400/25 dark:text-blue-200">
                                <Spinner className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-blue-700 dark:text-blue-200">Building quiz...</div>
                                <div className="mt-0.5 text-xs text-[var(--muted)]">
                                  Preparing AI response <LoadingDots className="ml-2" />
                                </div>
                              </div>
                            </div>
                            <div className="hidden sm:block text-xs text-[var(--muted)]">
                              {quizDifficulty} · {quizCount} questions
                            </div>
                          </div>

                          <div className="rounded-2xl bg-[var(--panel)] p-4 ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)]">
                            <SkeletonLine className="w-2/3" />
                            <div className="mt-3 space-y-2">
                              <SkeletonLine />
                              <SkeletonLine className="w-5/6" />
                              <SkeletonLine className="w-4/5" />
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <div className="rounded-2xl bg-[var(--panel)] p-3 ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)]">
                              <SkeletonLine className="w-3/4" />
                            </div>
                            <div className="rounded-2xl bg-[var(--panel)] p-3 ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)]">
                              <SkeletonLine className="w-2/3" />
                            </div>
                            <div className="rounded-2xl bg-[var(--panel)] p-3 ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)]">
                              <SkeletonLine className="w-4/5" />
                            </div>
                            <div className="rounded-2xl bg-[var(--panel)] p-3 ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)]">
                              <SkeletonLine className="w-1/2" />
                            </div>
                          </div>
                        </div>
                      ) : quiz ? (
                        <div className="space-y-4">
                          <div className="text-xs text-gray-300">
                            Difficulty: <span className="font-semibold text-white">{quizDifficulty}</span> ·
                            Questions: <span className="font-semibold text-white"> {quiz.length}</span> ·
                            Score: <span className="font-semibold text-white"> {quizScore}</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-blue-400/80 via-blue-500/80 to-cyan-300/80 transition-all duration-500"
                              style={{ width: `${Math.round(((quizIndex + (quizReveal ? 1 : 0)) / quiz.length) * 100)}%` }}
                            />
                          </div>
                          {quizComplete ? (
                            <div className="rounded-2xl bg-blue-500/10 p-4 ring-1 ring-blue-400/20">
                              <div className="text-base font-semibold text-blue-200">Final Result</div>
                              <div className="mt-1 text-sm text-gray-300">
                                You scored <span className="font-bold text-white">{quizScore}/{quiz.length}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setQuizAnswers({});
                                  setQuizIndex(0);
                                  setQuizReveal(false);
                                }}
                                className="mt-3 rounded-2xl bg-blue-500 px-4 py-2 text-sm font-semibold text-black"
                              >
                                Restart Quiz
                              </button>
                            </div>
                          ) : currentQuestion ? (
                            <div className="space-y-3">
                              <div className="text-xs text-gray-400">
                                Question {Math.min(quizIndex + 1, quiz.length)} / {quiz.length}
                              </div>
                              <div className="rounded-2xl bg-white/5 p-4 text-sm font-semibold text-gray-200 ring-1 ring-white/10">
                                {currentQuestion.prompt}
                              </div>
                              <div className="grid gap-2">
                                {currentQuestion.options.map((opt, idx) => {
                                  const picked = quizAnswers[currentQuestion.id];
                                  const locked = picked !== undefined;
                                  const selected = picked === idx;
                                  const correct = idx === currentQuestion.correctIndex;
                                  const style = locked
                                    ? selected
                                      ? correct
                                        ? "bg-emerald-500/15 ring-emerald-400/30"
                                        : "bg-rose-500/15 ring-rose-400/30"
                                      : correct
                                      ? "bg-emerald-500/10 ring-emerald-400/20"
                                      : "bg-white/5 ring-white/10"
                                    : "bg-white/5 ring-white/10 hover:bg-white/10";
                                  return (
                                    <button
                                      key={`${currentQuestion.id}-${idx}`}
                                      type="button"
                                      disabled={locked}
                                      onClick={async () => {
                                        setQuizReveal(true);
                                        setQuizAnswers((prev) => ({ ...prev, [currentQuestion.id]: idx }));
                                        await new Promise((r) => setTimeout(r, 650));
                                        setQuizReveal(false);
                                        setQuizIndex((v) => Math.min(v + 1, quiz.length - 1));
                                      }}
                                      className={cn("rounded-2xl px-3 py-2.5 text-left text-sm ring-1 transition-all", style)}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-400">Generate a quiz to start the runner.</div>
                      )}
                    </GlassCard>
                  </div>
                )}
              </>
            )}

            {active === "Settings" && (
              <div className="grid gap-5 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-5">
                  <GlassCard
                    title="Theme"
                    subtitle="Toggle dark/light mode. Saved to this device."
                    icon={<SparkIcon className="h-5 w-5" />}
                    right={
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold ring-1 ring-white/10">
                        <span className="text-gray-300">Current</span>
                        <span className="text-blue-200">{theme === "dark" ? "Dark" : "Light"}</span>
                      </div>
                    }
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setTheme("dark")}
                        className={cn(
                          "group relative overflow-hidden rounded-3xl p-4 text-left ring-1 transition-all duration-300",
                          theme === "dark"
                            ? "bg-blue-500/10 ring-blue-400/25"
                            : "bg-white/5 ring-white/10 hover:bg-white/10 hover:ring-blue-400/20"
                        )}
                      >
                        <div className="text-sm font-semibold">Dark</div>
                        <div className="mt-1 text-xs text-gray-400">
                          Futuristic, high-contrast focus mode.
                        </div>
                        <div className="mt-4 h-10 rounded-2xl bg-black/60 ring-1 ring-white/10" />
                        <div className="mt-2 h-3 w-3/4 rounded-full bg-white/10" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setTheme("light")}
                        className={cn(
                          "group relative overflow-hidden rounded-3xl p-4 text-left ring-1 transition-all duration-300",
                          theme === "light"
                            ? "bg-blue-500/10 ring-blue-400/25"
                            : "bg-white/5 ring-white/10 hover:bg-white/10 hover:ring-blue-400/20"
                        )}
                      >
                        <div className="text-sm font-semibold">Light</div>
                        <div className="mt-1 text-xs text-gray-400">
                          Clean, spacious readability.
                        </div>
                        <div className="mt-4 h-10 rounded-2xl bg-white/70 ring-1 ring-white/10" />
                        <div className="mt-2 h-3 w-3/4 rounded-full bg-black/10" />
                      </button>
                    </div>

                    <div className="mt-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                      <div className="text-xs font-semibold tracking-widest text-gray-300">
                        Smooth transitions
                      </div>
                      <p className="mt-2 text-sm text-gray-300">
                        Theme changes animate subtly across the app for a premium feel.
                      </p>
                    </div>
                  </GlassCard>

                  <GlassCard
                    title="Session controls"
                    subtitle="Reset or clear without breaking your workflow."
                    icon={<UploadIcon className="h-5 w-5" />}
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        disabled={loading !== null}
                        onClick={() => {
                          setNotesText("");
                          setFileName(null);
                          resetOutputs();
                          setLoading(null);
                        }}
                        className={cn(
                          "inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold ring-1 transition-all duration-300",
                          loading !== null
                            ? "bg-white/5 text-gray-500 ring-white/10 cursor-not-allowed"
                            : "bg-white/5 text-gray-200 ring-white/10 hover:-translate-y-0.5 hover:bg-white/10"
                        )}
                      >
                        Clear Workspace
                      </button>
                      <button
                        type="button"
                        disabled={loading !== null}
                        onClick={() => {
                          setNotesText("");
                          setFileName(null);
                          resetOutputs();
                          setLoading(null);
                          setAiMode("unknown");
                        }}
                        className={cn(
                          "inline-flex items-center justify-center rounded-2xl bg-blue-500 px-4 py-3 text-sm font-semibold text-black ring-1 ring-blue-400/25 transition-all duration-300",
                          loading !== null
                            ? "opacity-60 cursor-not-allowed"
                            : "hover:-translate-y-0.5 hover:bg-blue-400"
                        )}
                      >
                        Reset Session
                      </button>
                    </div>
                    <p className="mt-3 text-xs text-gray-400">
                      Clear Workspace removes notes and outputs. Reset Session also resets AI status.
                    </p>
                  </GlassCard>
                </div>

                <div className="lg:col-span-5 space-y-5">
                  <GlassCard
                    title="AI status"
                    subtitle="Connection state for the last generation."
                    icon={<SparkIcon className="h-5 w-5" />}
                  >
                    <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                      <div>
                        <div className="text-sm font-semibold">Provider</div>
                        <div className="mt-1 text-xs text-gray-400">
                          {aiMode === "gemini"
                            ? "Gemini is responding normally."
                            : aiMode === "fallback"
                            ? "Fallback mode active (local generator)."
                            : "Idle (no recent generation)."}
                        </div>
                      </div>
                      <div
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1",
                          aiMode === "gemini"
                            ? "bg-emerald-500/10 text-emerald-200 ring-emerald-400/20"
                            : aiMode === "fallback"
                            ? "bg-amber-500/10 text-amber-200 ring-amber-400/20"
                            : "bg-white/5 text-gray-300 ring-white/10"
                        )}
                      >
                        <span
                          className={cn(
                            "h-2 w-2 rounded-full",
                            aiMode === "gemini"
                              ? "bg-emerald-300"
                              : aiMode === "fallback"
                              ? "bg-amber-300"
                              : "bg-gray-400"
                          )}
                        />
                        {aiMode === "gemini"
                          ? "Gemini Connected"
                          : aiMode === "fallback"
                          ? "Fallback"
                          : "Idle"}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-black/20 p-3 ring-1 ring-white/10">
                        <div className="text-xs text-gray-400">Summaries</div>
                        <div className="mt-1 text-lg font-extrabold tracking-tight text-blue-200">
                          {summariesGenerated}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-black/20 p-3 ring-1 ring-white/10">
                        <div className="text-xs text-gray-400">Quizzes</div>
                        <div className="mt-1 text-lg font-extrabold tracking-tight text-blue-200">
                          {quizzesCompleted}
                        </div>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard
                    title="App info"
                    subtitle="Production-ready learning platform UI."
                    icon={<SummaryIcon className="h-5 w-5" />}
                  >
                    <p className="text-sm leading-relaxed text-gray-300">
                      AI Study Assistant helps you upload notes, generate structured summaries, and practice with adaptive quizzes. Designed with a minimal futuristic interface for focused studying.
                    </p>
                    <div className="mt-4 rounded-2xl bg-blue-500/10 p-4 ring-1 ring-blue-400/15">
                      <div className="text-xs font-semibold tracking-widest text-blue-200">
                        Tip
                      </div>
                      <p className="mt-1 text-sm text-gray-300">
                        For best results, include clear headings and definition lines like "Term: meaning".
                      </p>
                    </div>
                  </GlassCard>
                </div>
              </div>
            )}

            <footer className="mt-10 border-t border-white/10 pt-6 text-xs text-gray-500">{new Date().getFullYear()} AI Study Assistant - Dashboard UI</footer>
          </div>
        </div>
      </div>
    </main>
  );
}

