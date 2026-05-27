"use client";

import React from "react";

type ActiveNav = "Dashboard" | "Notes" | "Summaries" | "Quizzes" | "Settings";
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
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2l1.2 6.2L20 10l-6.8 1.8L12 18l-1.2-6.2L4 10l6.8-1.8L12 2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 14.5l.6 2.6 2.4.6-2.4.6-.6 2.4-.6-2.4-2.4-.6 2.4-.6.6-2.6z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 16V4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7 9l5-5 5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 16.5c0 1.933 1.567 3.5 3.5 3.5h9c1.933 0 3.5-1.567 3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function QuizIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M7 4h10a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8 8h8M8 12h8M8 16h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SummaryIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M7 3h7l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M14 3v5h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8 12h8M8 16h7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("animate-spin", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 3a9 9 0 1 0 9 9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
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
    <section className="group relative overflow-hidden rounded-3xl bg-white/5 p-6 backdrop-blur-xl ring-1 ring-white/10 transition-all duration-300 hover:bg-white/10 hover:ring-blue-400/30">
      <div className="absolute -right-14 -top-14 h-32 w-32 rounded-full bg-blue-500/15 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {icon ? (
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-500/15 text-blue-200 ring-1 ring-blue-400/20">
                {icon}
              </div>
            ) : null}
            <div>
              <h2 className="text-base font-semibold tracking-tight">{title}</h2>
              {subtitle ? (
                <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>
              ) : null}
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
          ? "bg-blue-500/10 text-white ring-1 ring-blue-400/25"
          : "text-gray-300 hover:bg-white/5 hover:text-white ring-1 ring-transparent"
      )}
    >
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-xl transition-colors",
          active ? "bg-blue-500/15 text-blue-200" : "bg-white/5 text-gray-200"
        )}
      >
        {icon}
      </span>
      <span className="font-medium">{label}</span>
      <span className="ml-auto h-2 w-2 rounded-full bg-blue-400/0 transition-all duration-200 group-hover:bg-blue-400/40" />
    </button>
  );
}

function fakeSummaryFromText(input: string) {
  const raw = input.trim();
  const cleaned = raw.replace(/\s+/g, " ");

  const stop = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "to",
    "of",
    "in",
    "on",
    "for",
    "with",
    "is",
    "are",
    "was",
    "were",
    "be",
    "as",
    "by",
    "from",
    "that",
    "this",
    "it",
    "at",
    "into",
    "we",
    "you",
    "your",
  ]);

  const words = cleaned
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 4 && !stop.has(w));

  const freq = new Map<string, number>();
  for (const w of words) freq.set(w, (freq.get(w) ?? 0) + 1);
  const keyConcepts = [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([w]) => w)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1));

  const defLines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const definitions: Array<{ term: string; meaning: string }> = [];
  for (const line of defLines) {
    const m = line.match(/^(.{2,50}?)\s*[:\-]\s+(.{8,})$/);
    if (!m) continue;
    const term = m[1].trim();
    const meaning = m[2].trim();
    if (term && meaning) definitions.push({ term, meaning });
    if (definitions.length >= 8) break;
  }

  const sentences = cleaned
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const overview =
    sentences[0] ??
    "Upload your notes to generate study-ready summaries, definitions, and exam-focused takeaways.";

  const simplified = [
    "First, identify the core idea and the supporting details.",
    "Then, connect definitions to examples so you can explain the concept in your own words.",
    "Finally, test yourself using short questions and fix gaps immediately.",
  ];

  const examFocus = [
    "Know the definitions and how to apply them in typical exam questions.",
    "Be able to compare closely related concepts and state the difference clearly.",
    "Memorize the minimum set of formulas/rules and practice using them.",
  ];

  const quickRecall = [
    "If you can teach it in 60 seconds, you understand it.",
    "Turn headings into questions and answer without looking.",
    "Review mistakes: correct answer + why your choice was wrong.",
  ];

  return {
    title: keyConcepts[0] ? `Study Summary: ${keyConcepts[0]}` : "Study Summary",
    overview,
    keyConcepts,
    definitions,
    simplified,
    examFocus,
    quickRecall,
  } satisfies StudySummary;
}

function fakeQuizFromText(input: string, maxQuestions = 50): MCQQuestion[] {
  const cleaned = input.trim().replace(/\s+/g, " ");
  const tokens = cleaned
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 4);

  const stop = new Set([
    "the",
    "that",
    "this",
    "with",
    "from",
    "into",
    "your",
    "have",
    "will",
    "what",
    "when",
    "where",
    "which",
    "their",
    "there",
    "about",
    "because",
    "these",
    "those",
    "they",
    "them",
    "then",
    "than",
    "also",
  ]);

  const freq = new Map<string, number>();
  for (const t of tokens) {
    if (stop.has(t)) continue;
    freq.set(t, (freq.get(t) ?? 0) + 1);
  }

  const keywords = [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([w]) => w)
    .slice(0, 30);

  const pool = keywords.length ? keywords : ["concept", "definition", "process"];

  const make = (i: number): MCQQuestion => {
    const kw = pool[i % pool.length];
    const cap = kw.charAt(0).toUpperCase() + kw.slice(1);

    // Deterministic-but-varied correct choice placement.
    const correctIndex = (i % 4) as 0 | 1 | 2 | 3;
    const correct = `Best description of ${cap} based on your notes`;
    const distractors: [string, string, string] = [
      `A detail that is not central to ${cap}`,
      `An unrelated idea often confused with ${cap}`,
      `A statement that sounds right but misses the key condition`,
    ];

    const optionsAll = [correct, ...distractors] as const;
    const reordered: [string, string, string, string] = [
      optionsAll[(4 - correctIndex) % 4] ?? correct,
      optionsAll[(5 - correctIndex) % 4] ?? distractors[0],
      optionsAll[(6 - correctIndex) % 4] ?? distractors[1],
      optionsAll[(7 - correctIndex) % 4] ?? distractors[2],
    ];

    // In rare cases (if modulo mapping repeats), ensure the correct text is present.
    reordered[correctIndex] = correct;

    return {
      id: `q_${i + 1}`,
      prompt: `Which option best matches the meaning of "${cap}" in your notes?`,
      options: reordered,
      correctIndex,
    };
  };

  const n = Math.max(5, Math.min(maxQuestions, 50));
  return Array.from({ length: n }, (_, i) => make(i));
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [active, setActive] = React.useState<ActiveNav>("Dashboard");
  const [notesText, setNotesText] = React.useState("");
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const [extracting, setExtracting] = React.useState(false);

  const pdfjsRef = React.useRef<any>(null);

  const [loading, setLoading] = React.useState<null | "summary" | "quiz">(null);
  const [summary, setSummary] = React.useState<StudySummary | null>(null);
  const [quiz, setQuiz] = React.useState<null | MCQQuestion[]>(null);
  const [quizAnswers, setQuizAnswers] = React.useState<Record<string, number>>({});
  const [quizIndex, setQuizIndex] = React.useState(0);
  const [quizReveal, setQuizReveal] = React.useState(false);
  const [quizCount, setQuizCount] = React.useState(10);
  const [quizDifficulty, setQuizDifficulty] = React.useState("easy");

  const canGenerate = notesText.trim().length > 0 || Boolean(fileName);

  async function getPdfJs() {
    if (pdfjsRef.current) return pdfjsRef.current;
    // Dynamic import ensures pdf.js code (which touches browser APIs like DOMMatrix)
    // runs only in the client.
    const pdfjs = await import("pdfjs-dist");
    // Configure worker only on client.
    (pdfjs as any).GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();
    pdfjsRef.current = pdfjs;
    return pdfjs;
  }

  function resetOutputs() {
    setSummary(null);
    setQuiz(null);
    setQuizAnswers({});
    setQuizIndex(0);
    setQuizReveal(false);
  }

  async function extractTextFromPdf(file: File) {
    const pdfjsLib = await getPdfJs();
    const data = new Uint8Array(await file.arrayBuffer());
    const pdf = await pdfjsLib.getDocument({ data }).promise;

    const pageTexts: string[] = [];
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const strings = content.items
      .map((it: any) => ("str" in it ? it.str : ""))
        .filter(Boolean);
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
        const text = await file.text();
        setNotesText(text);
        setFileName(name);
        return;
      }

      if (ext === "pdf" || type === "application/pdf") {
        const text = await extractTextFromPdf(file);
        setNotesText(text);
        setFileName(name);
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
    await new Promise((r) => setTimeout(r, 1100));
    setSummary(fakeSummaryFromText(notesText || "Uploaded notes"));
    setLoading(null);
  }

  async function runQuiz() {
    if (!canGenerate) return;
    resetOutputs();
    setLoading("quiz");
    await new Promise((r) => setTimeout(r, 1300));
    setQuiz(fakeQuizFromText(notesText || "Uploaded notes", 50));
    setLoading(null);
  }

  const quizScore =
    quiz?.reduce((acc, q) => {
      const picked = quizAnswers[q.id];
      if (picked === undefined) return acc;
      return acc + (picked === q.correctIndex ? 1 : 0);
    }, 0) ?? 0;

  const quizAnsweredCount = quiz
    ? quiz.reduce((acc, q) => acc + (quizAnswers[q.id] === undefined ? 0 : 1), 0)
    : 0;

  const quizComplete = Boolean(quiz) && quizAnsweredCount === (quiz?.length ?? 0);
  const currentQuestion = quiz ? quiz[quizIndex] : null;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-260px] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute -left-24 top-40 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[130px]" />
        <div className="absolute -right-24 top-64 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[130px]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(59,130,246,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.12)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.10),transparent_55%,rgba(0,0,0,0.92))]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-[280px] border-r border-white/10 bg-black/40 backdrop-blur-xl transition-transform duration-300 md:sticky md:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-col p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-3">
                <div className="relative grid h-10 w-10 place-items-center rounded-2xl bg-blue-500/15 text-blue-200 ring-1 ring-blue-400/25">
                  <SparkIcon className="h-5 w-5" />
                  <span className="pointer-events-none absolute -inset-2 rounded-3xl bg-blue-500/10 blur-xl" />
                </div>
                <div>
                  <div className="text-sm font-semibold tracking-wide">
                    AI Study Assistant
                  </div>
                  <div className="text-xs text-gray-400">Dashboard</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-colors hover:bg-white/10 md:hidden"
                aria-label="Close sidebar"
              >
                <span className="text-lg leading-none text-gray-200">x</span>
              </button>
            </div>

            <div className="mt-6 space-y-2">
              <NavItem
                label="Dashboard"
                active={active === "Dashboard"}
                onClick={() => setActive("Dashboard")}
                icon={<SparkIcon className="h-5 w-5" />}
              />
              <NavItem
                label="Notes"
                active={active === "Notes"}
                onClick={() => setActive("Notes")}
                icon={<UploadIcon className="h-5 w-5" />}
              />
              <NavItem
                label="Summaries"
                active={active === "Summaries"}
                onClick={() => setActive("Summaries")}
                icon={<SummaryIcon className="h-5 w-5" />}
              />
              <NavItem
                label="Quizzes"
                active={active === "Quizzes"}
                onClick={() => setActive("Quizzes")}
                icon={<QuizIcon className="h-5 w-5" />}
              />
              <NavItem
                label="Settings"
                active={active === "Settings"}
                onClick={() => setActive("Settings")}
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M19.4 15a7.97 7.97 0 0 0 .1-1 7.97 7.97 0 0 0-.1-1l2-1.5-2-3.5-2.4.8a7.94 7.94 0 0 0-1.7-1L15 3h-6l-.3 2.8c-.6.3-1.2.6-1.7 1L4.6 6.1l-2 3.5 2 1.5a7.97 7.97 0 0 0-.1 1c0 .34.03.67.1 1l-2 1.5 2 3.5 2.4-.8c.5.4 1.1.8 1.7 1L9 21h6l.3-2.8c.6-.3 1.2-.6 1.7-1l2.4.8 2-3.5-2-1.5z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                      opacity="0.9"
                    />
                  </svg>
                }
              />
            </div>

            <div className="mt-auto pt-6">
              <div className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="text-xs font-semibold tracking-wide text-blue-200/90">
                  Focus mode
                </div>
                <div className="mt-1 text-xs leading-relaxed text-gray-400">
                  Paste notes, generate outputs, and review in one clean space.
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile overlay */}
        <div
          className={cn(
            "fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden",
            sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
          )}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <header className="sticky top-0 z-20 border-b border-white/10 bg-black/30 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-colors hover:bg-white/10 md:hidden"
                  aria-label="Open sidebar"
                >
                  <span className="relative block h-5 w-5">
                    <span className="absolute left-0 top-1 h-[2px] w-full bg-blue-200" />
                    <span className="absolute left-0 top-3 h-[2px] w-full bg-blue-200/90" />
                    <span className="absolute left-0 top-5 h-[2px] w-full bg-blue-200" />
                  </span>
                </button>
                <div>
                  <div className="text-sm font-semibold tracking-tight">
                    {active}
                  </div>
                  <div className="text-xs text-gray-400">
                    Dark, futuristic study workspace
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden sm:block">
                  <div className="relative">
                    <input
                      className="w-56 rounded-2xl bg-white/5 px-4 py-2.5 text-sm text-gray-200 placeholder:text-gray-500 ring-1 ring-white/10 outline-none transition-all focus:ring-blue-400/30"
                      placeholder="Search (UI only)"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      /
                    </span>
                  </div>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-500/15 text-blue-200 ring-1 ring-blue-400/25">
                  <span className="text-sm font-semibold">AI</span>
                </div>
              </div>
            </div>
          </header>

          <div className="px-5 py-6 md:px-8 md:py-8">
            {/* Dashboard grid */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-5">
                <GlassCard
                  title="Upload notes"
                  subtitle="Add a file or paste text. Generate summary or quiz instantly."
                  icon={<UploadIcon className="h-5 w-5" />}
                  right={
                    <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200">
                      <SparkIcon className="h-4 w-4" />
                      AI ready
                    </span>
                  }
                >
                  <div className="grid gap-4">
                    <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-stretch">
                      <div
                        className={cn(
                          "relative overflow-hidden rounded-2xl bg-white/5 p-4 ring-1 backdrop-blur-xl transition-all duration-200",
                          isDragging
                            ? "ring-blue-400/35 bg-blue-500/10"
                            : "ring-white/10 hover:bg-white/10 hover:ring-blue-400/25"
                        )}
                        onDragEnter={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsDragging(true);
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsDragging(true);
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsDragging(false);
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
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
                          aria-label="Upload notes file"
                        />

                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <div className="text-sm font-semibold">
                              {fileName ? (
                                <span className="truncate">{fileName}</span>
                              ) : extracting ? (
                                "Extracting text..."
                              ) : (
                                "Drag and drop a PDF/TXT, or click to browse"
                              )}
                            </div>
                            <div className="mt-1 text-xs text-gray-400">
                              PDF and TXT supported. Extracted text will auto-fill the notes box.
                            </div>
                            {uploadError ? (
                              <div className="mt-2 text-xs font-semibold text-rose-200">
                                {uploadError}
                              </div>
                            ) : null}
                          </div>

                          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-500/15 text-blue-200 ring-1 ring-blue-400/20">
                            {extracting ? (
                              <Spinner className="h-5 w-5" />
                            ) : (
                              <UploadIcon className="h-5 w-5" />
                            )}
                          </div>
                        </div>
                      </div>

                      <label
                        className={cn(
                          "relative overflow-hidden rounded-2xl px-5 py-4 text-sm font-semibold ring-1 transition-all duration-300 sm:flex sm:items-center sm:justify-center",
                          extracting
                            ? "bg-white/5 text-gray-500 ring-white/10"
                            : "bg-blue-500 text-black ring-blue-400/25 hover:-translate-y-0.5 hover:bg-blue-400"
                        )}
                      >
                        <input
                          id="notes-file-input"
                          type="file"
                          accept=".pdf,.txt,application/pdf,text/plain"
                          className="absolute inset-0 cursor-pointer opacity-0"
                          onChange={(e) => {
                            const f = e.currentTarget.files?.[0];
                            if (f) void handleIncomingFile(f);
                            e.currentTarget.value = "";
                          }}
                          aria-label="Upload PDF or TXT"
                          disabled={extracting}
                        />
                        {extracting ? (
                          <span className="inline-flex items-center gap-2">
                            <Spinner className="h-5 w-5" />
                            Uploading
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2">
                            <UploadIcon className="h-5 w-5" />
                            Upload
                          </span>
                        )}
                      </label>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="text-sm font-semibold">Paste notes</div>
                        <div className="text-xs text-gray-500">
                          {notesText.trim().length} chars
                        </div>
                      </div>
                      <textarea
                        value={notesText}
                        onChange={(e) => setNotesText(e.target.value)}
                        rows={10}
                        placeholder="Paste your notes here. Example: definitions, key points, lecture notes..."
                        className="w-full resize-none rounded-2xl bg-white/5 p-4 text-sm leading-relaxed text-gray-200 placeholder:text-gray-500 ring-1 ring-white/10 outline-none transition-all focus:ring-blue-400/30"
                      />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={runSummary}
                        disabled={!canGenerate || loading !== null}
                        className={cn(
                          "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300",
                          !canGenerate || loading !== null
                            ? "bg-white/5 text-gray-500 ring-1 ring-white/10 cursor-not-allowed"
                            : "bg-blue-500 text-black shadow-[0_0_0_1px_rgba(59,130,246,0.35),0_18px_50px_rgba(59,130,246,0.25)] hover:-translate-y-0.5 hover:bg-blue-400"
                        )}
                      >
                        {loading === "summary" ? (
                          <>
                            <Spinner className="h-5 w-5" />
                            Generating summary
                          </>
                        ) : (
                          <>
                            <SummaryIcon className="h-5 w-5" />
                            Generate Summary
                          </>
                        )}
                      </button>
                      <div className="mb-4 flex flex-wrap gap-3">
  <select
    value={quizCount}
    onChange={(e) => setQuizCount(Number(e.target.value))}
    className="rounded-xl bg-white/5 px-4 py-2 text-sm text-white ring-1 ring-white/10"
  >
    <option value={10}>10 Questions</option>
    <option value={20}>20 Questions</option>
    <option value={30}>30 Questions</option>
    <option value={40}>40 Questions</option>
    <option value={50}>50 Questions</option>
  </select>

  <select
    value={quizDifficulty}
    onChange={(e) => setQuizDifficulty(e.target.value)}
    className="rounded-xl bg-white/5 px-4 py-2 text-sm text-white ring-1 ring-white/10"
  >
    <option value="easy">Easy</option>
    <option value="depth">Depth</option>
    <option value="exam">Exam Level</option>
    <option value="extreme">Extreme</option>
  </select>
</div>

                      <button
                        type="button"
                        onClick={runQuiz}
                        disabled={!canGenerate || loading !== null}
                        className={cn(
                          "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300",
                          !canGenerate || loading !== null
                            ? "bg-white/5 text-gray-500 ring-1 ring-white/10 cursor-not-allowed"
                            : "border border-white/15 bg-white/5 text-white/90 backdrop-blur-xl hover:-translate-y-0.5 hover:bg-white/10 hover:border-blue-300/30"
                        )}
                      >
                        {loading === "quiz" ? (
                          <>
                            <Spinner className="h-5 w-5 text-blue-200" />
                            Generating quiz
                          </>
                        ) : (
                          <>
                            <QuizIcon className="h-5 w-5" />
                            Generate Quiz
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard
                  title="AI output"
                  subtitle="Your generated content appears here."
                  icon={<SparkIcon className="h-5 w-5" />}
                  right={
                    <button
                      type="button"
                      onClick={() => {
                        setNotesText("");
                        setFileName(null);
                        resetOutputs();
                        setLoading(null);
                      }}
                      className="rounded-xl bg-white/5 px-3 py-2 text-xs font-semibold text-gray-200 ring-1 ring-white/10 transition-colors hover:bg-white/10"
                    >
                      Clear
                    </button>
                  }
                >
                  <div className="grid gap-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="relative overflow-hidden rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-semibold">Summary</div>
                          <div className="text-xs text-gray-500">Card</div>
                        </div>

                        {loading === "summary" ? (
                          <div className="mt-4 space-y-3">
                            <div className="h-3 w-3/4 rounded-full bg-white/10 animate-pulse" />
                            <div className="h-3 w-full rounded-full bg-white/10 animate-pulse" />
                            <div className="h-3 w-5/6 rounded-full bg-white/10 animate-pulse" />
                            <div className="mt-4 h-10 w-full rounded-2xl bg-blue-500/10 ring-1 ring-blue-400/15 animate-pulse" />
                          </div>
                        ) : summary ? (
                          <div className="mt-4">
                            <div className="space-y-4">
                              <div>
                                <div className="text-sm font-semibold text-blue-200">
                                  {summary.title}
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-gray-200">
                                  {summary.overview}
                                </p>
                              </div>

                              <div className="rounded-2xl bg-blue-500/10 p-4 ring-1 ring-blue-400/15">
                                <div className="text-xs font-semibold tracking-wide text-blue-200">
                                  Important
                                </div>
                                <div className="mt-1 text-sm text-gray-200">
                                  Focus on the definitions and how to apply them in common exam-style questions.
                                </div>
                              </div>

                              <div>
                                <div className="text-xs font-semibold tracking-widest text-gray-300">
                                  KEY CONCEPTS
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {summary.keyConcepts.slice(0, 10).map((c) => (
                                    <span
                                      key={c}
                                      className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-gray-200 ring-1 ring-white/10"
                                    >
                                      {c}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                                  <div className="text-xs font-semibold tracking-widest text-gray-300">
                                    DEFINITIONS
                                  </div>
                                  {summary.definitions.length ? (
                                    <ul className="mt-3 space-y-2">
                                      {summary.definitions.map((d) => (
                                        <li key={d.term} className="text-sm text-gray-200">
                                          <span className="font-semibold text-blue-200">
                                            {d.term}:
                                          </span>{" "}
                                          <span className="text-gray-300">{d.meaning}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <div className="mt-3 text-sm text-gray-400">
                                      Tip: add lines like "Term: meaning" in your notes for richer definitions.
                                    </div>
                                  )}
                                </div>

                                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                                  <div className="text-xs font-semibold tracking-widest text-gray-300">
                                    SIMPLIFIED EXPLANATION
                                  </div>
                                  <ul className="mt-3 space-y-2">
                                    {summary.simplified.map((s) => (
                                      <li key={s} className="flex items-start gap-2 text-sm text-gray-300">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-blue-400/70" />
                                        <span>{s}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                                  <div className="text-xs font-semibold tracking-widest text-gray-300">
                                    EXAM FOCUS
                                  </div>
                                  <ul className="mt-3 space-y-2">
                                    {summary.examFocus.map((p) => (
                                      <li key={p} className="flex items-start gap-2 text-sm text-gray-300">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300/70" />
                                        <span>{p}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                                  <div className="text-xs font-semibold tracking-widest text-gray-300">
                                    QUICK RECALL
                                  </div>
                                  <ul className="mt-3 space-y-2">
                                    {summary.quickRecall.map((p) => (
                                      <li key={p} className="flex items-start gap-2 text-sm text-gray-300">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300/70" />
                                        <span>{p}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-4 text-sm text-gray-400">
                            Generate a summary to see results.
                          </div>
                        )}
                      </div>

                      <div className="relative overflow-hidden rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-semibold">Quiz</div>
                          <div className="text-xs text-gray-500">Card</div>
                        </div>

                        {loading === "quiz" ? (
                          <div className="mt-4 space-y-3">
                            <div className="h-3 w-2/3 rounded-full bg-white/10 animate-pulse" />
                            <div className="h-3 w-full rounded-full bg-white/10 animate-pulse" />
                            <div className="h-3 w-4/5 rounded-full bg-white/10 animate-pulse" />
                            <div className="mt-4 h-10 w-full rounded-2xl bg-blue-500/10 ring-1 ring-blue-400/15 animate-pulse" />
                          </div>
                        ) : quiz ? (
                          <div className="mt-4 space-y-4">
                            {/* Progress */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs text-gray-300">
                                <span>
                                  Question{" "}
                                  <span className="font-semibold text-white">
                                    {Math.min(quizIndex + 1, quiz.length)}/{quiz.length}
                                  </span>
                                </span>
                                <span className="text-gray-400">
                                  Score{" "}
                                  <span className="font-semibold text-white">
                                    {quizScore}
                                  </span>
                                </span>
                              </div>
                              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-blue-400/80 via-blue-500/80 to-cyan-300/80 transition-all duration-500"
                                  style={{
                                    width: `${Math.round(
                                      ((quizIndex + (quizReveal ? 1 : 0)) / quiz.length) * 100
                                    )}%`,
                                  }}
                                />
                              </div>
                            </div>

                            {/* Final results */}
                            {quizComplete ? (
                              <div className="rounded-2xl bg-blue-500/10 p-4 ring-1 ring-blue-400/15">
                                <div className="text-sm font-semibold text-blue-200">
                                  Results
                                </div>
                                <div className="mt-1 text-sm text-gray-300">
                                  Final score:{" "}
                                  <span className="font-extrabold text-white">
                                    {quizScore}/{quiz.length}
                                  </span>
                                </div>
                                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setQuizAnswers({});
                                      setQuizIndex(0);
                                      setQuizReveal(false);
                                    }}
                                    className="inline-flex items-center justify-center rounded-2xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-black transition-all hover:-translate-y-0.5 hover:bg-blue-400"
                                  >
                                    Restart quiz
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => runQuiz()}
                                    disabled={loading !== null}
                                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/90 transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:border-blue-300/30"
                                  >
                                    Generate new quiz
                                  </button>
                                </div>
                              </div>
                            ) : currentQuestion ? (
                              <div className="space-y-3">
                                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition-all duration-300">
                                  <div className="text-sm font-semibold leading-relaxed text-gray-200">
                                    {currentQuestion.prompt}
                                  </div>
                                  <div className="mt-2 text-xs text-gray-400">
                                    Pick an option - we will auto-advance.
                                  </div>
                                </div>

                                <div className="grid gap-2">
                                  {currentQuestion.options.map((opt, optIdx) => {
                                    const picked = quizAnswers[currentQuestion.id];
                                    const locked = picked !== undefined;
                                    const selected = picked === optIdx;
                                    const isCorrect = optIdx === currentQuestion.correctIndex;
                                    const showCorrectness = locked;

                                    let style = "bg-white/5 ring-white/10 text-gray-200";
                                    if (showCorrectness && selected && isCorrect) {
                                      style =
                                        "bg-emerald-500/15 ring-emerald-400/30 text-emerald-200";
                                    } else if (showCorrectness && selected && !isCorrect) {
                                      style = "bg-rose-500/15 ring-rose-400/30 text-rose-200";
                                    } else if (showCorrectness && !selected && isCorrect) {
                                      style = "bg-emerald-500/10 ring-emerald-400/20 text-gray-200";
                                    } else if (selected) {
                                      style = "bg-blue-500/15 ring-blue-400/30 text-blue-100";
                                    }

                                    return (
                                      <button
                                        key={opt}
                                        type="button"
                                        disabled={locked}
                                        onClick={async () => {
                                          if (locked) return;
                                          setQuizReveal(true);
                                          setQuizAnswers((prev) => ({
                                            ...prev,
                                            [currentQuestion.id]: optIdx,
                                          }));

                                          // Give a short moment for feedback colors to register,
                                          // then advance automatically.
                                          await new Promise((r) => setTimeout(r, 700));
                                          setQuizReveal(false);
                                          setQuizIndex((v) => Math.min(v + 1, quiz.length - 1));
                                        }}
                                        className={cn(
                                          "w-full rounded-2xl px-3 py-3 text-left text-sm ring-1 transition-all duration-200 active:scale-[0.99]",
                                          locked ? "cursor-not-allowed" : "hover:-translate-y-0.5 hover:bg-white/10",
                                          style
                                        )}
                                      >
                                        <div className="flex items-center justify-between gap-3">
                                          <div className="flex items-center gap-3">
                                            <span className="grid h-7 w-7 place-items-center rounded-xl bg-black/20 text-xs font-bold ring-1 ring-white/10">
                                              {String.fromCharCode(65 + optIdx)}
                                            </span>
                                            <span className="leading-relaxed">{opt}</span>
                                          </div>
                                          {quizReveal && selected ? (
                                            <span
                                              className={cn(
                                                "rounded-full px-2 py-1 text-[10px] font-semibold ring-1",
                                                isCorrect
                                                  ? "bg-emerald-500/15 text-emerald-200 ring-emerald-400/25"
                                                  : "bg-rose-500/15 text-rose-200 ring-rose-400/25"
                                              )}
                                            >
                                              {isCorrect ? "Correct" : "Wrong"}
                                            </span>
                                          ) : null}
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : (
                              <div className="text-sm text-gray-400">
                                Generating quiz state...
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="mt-4 text-sm text-gray-400">
                            Generate a quiz to see questions.
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-blue-500/10 p-4 ring-1 ring-blue-400/15">
                      <div className="flex items-center gap-2 text-sm font-semibold text-blue-200">
                        <SparkIcon className="h-4 w-4" />
                        Tip
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-gray-300">
                        Paste a full chapter or lecture notes for better coverage. Then generate a quiz and review your weak spots.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>

              <div className="lg:col-span-5 space-y-5">
                <GlassCard
                  title="Quick stats"
                  subtitle="A premium overview (UI only)."
                  icon={<SparkIcon className="h-5 w-5" />}
                >
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      { label: "Summaries", value: "12" },
                      { label: "Quizzes", value: "7" },
                      { label: "Uploads", value: fileName ? "1" : "0" },
                      { label: "Focus score", value: "A-" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/10 hover:ring-blue-400/25"
                      >
                        <div className="text-xs text-gray-400">{s.label}</div>
                        <div className="mt-1 text-2xl font-extrabold tracking-tight text-blue-200">
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard
                  title="Recent activity"
                  subtitle="Keep momentum with clean review loops."
                  icon={<SummaryIcon className="h-5 w-5" />}
                >
                  <div className="space-y-3">
                    {[
                      { t: "Generated summary", d: "Physics - Motion notes" },
                      { t: "Created quiz", d: "Biology - Cell structure" },
                      { t: "Uploaded notes", d: "History - WW2 overview" },
                    ].map((a) => (
                      <div
                        key={a.t + a.d}
                        className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/10"
                      >
                        <div>
                          <div className="text-sm font-semibold">{a.t}</div>
                          <div className="mt-0.5 text-xs text-gray-400">
                            {a.d}
                          </div>
                        </div>
                        <div className="h-9 w-9 rounded-2xl bg-blue-500/15 ring-1 ring-blue-400/20" />
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard
                  title="Study mode"
                  subtitle="A lightweight workflow suggestion."
                  icon={<QuizIcon className="h-5 w-5" />}
                >
                  <ol className="space-y-3 text-sm text-gray-300">
                    {[
                      "Paste notes and generate a summary",
                      "Generate a quiz and answer without looking",
                      "Review mistakes and regenerate for a new set",
                    ].map((step, idx) => (
                      <li key={step} className="flex gap-3">
                        <span className="grid h-7 w-7 place-items-center rounded-2xl bg-blue-500/15 text-xs font-bold text-blue-200 ring-1 ring-blue-400/20">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </GlassCard>
              </div>
            </div>

            <footer className="mt-10 border-t border-white/10 pt-6 text-xs text-gray-500">
              {new Date().getFullYear()} AI Study Assistant - Dashboard UI
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}

