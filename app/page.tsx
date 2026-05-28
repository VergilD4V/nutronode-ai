"use client";

import React from "react";
import Link from "next/link";

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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 7L10 17l-5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-[var(--panel)] p-6 backdrop-blur-xl ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)] transition-all duration-300 hover:-translate-y-1 hover:ring-blue-400/30">
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/20">
            {icon}
          </div>
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const stats = [
    {
      value: "10K+",
      label: "Summaries Generated",
      icon: <SparkIcon className="h-5 w-5" />,
    },
    {
      value: "95%",
      label: "Clarity Score",
      icon: <CheckIcon className="h-5 w-5" />,
    },
    {
      value: "1-Click",
      label: "Quiz Creation",
      icon: <SparkIcon className="h-5 w-5" />,
    },
    {
      value: "Adaptive",
      label: "Study Materials",
      icon: <CheckIcon className="h-5 w-5" />,
    },
  ];

  const features = [
    {
      title: "Upload & Understand",
      description:
        "Bring your notes, PDFs, or text. Our AI instantly extracts key concepts and definitions.",
      icon: <SparkIcon className="h-5 w-5 text-blue-200" />,
    },
    {
      title: "Smart Summaries",
      description:
        "Get concise, exam-ready summaries with structured takeaways and essential context.",
      icon: <CheckIcon className="h-5 w-5 text-blue-200" />,
    },
    {
      title: "Quizzes on Demand",
      description:
        "Generate custom quizzes that match your syllabus style - multiple choice, short answer, and more.",
      icon: <SparkIcon className="h-5 w-5 text-blue-200" />,
    },
    {
      title: "Study Plans That Adapt",
      description:
        "Transform content into a step-by-step study route. Review what matters most, when you need it.",
      icon: <CheckIcon className="h-5 w-5 text-blue-200" />,
    },
    {
      title: "Flashcards & Exports",
      description:
        "Convert learning outputs into shareable materials you can review anywhere.",
      icon: <SparkIcon className="h-5 w-5 text-blue-200" />,
    },
    {
      title: "Premium UX for Students",
      description:
        "A clean, modern interface designed for focus - fast generation, smooth flows, and clear results.",
      icon: <CheckIcon className="h-5 w-5 text-blue-200" />,
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-hidden scroll-smooth transition-colors duration-300">
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-260px] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute -left-24 top-40 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[130px]" />
        <div className="absolute -right-24 top-64 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[130px]" />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(59,130,246,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.12)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_38%,transparent_70%)]" />

        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.10),transparent_55%,rgba(0,0,0,0.9))]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-xl px-2 py-1 transition-colors hover:bg-[var(--chip)]"
          >
            <span className="relative grid h-10 w-10 place-items-center rounded-2xl bg-blue-500/15 ring-1 ring-blue-400/25 text-blue-200">
              <SparkIcon className="h-5 w-5" />
              <span className="pointer-events-none absolute -inset-1 rounded-3xl bg-blue-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </span>
            <span className="text-[15px] font-semibold tracking-wide">
            Nutronote AI
            </span>
          </Link>

          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle navigation"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--panel)] ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)] transition-all duration-300 hover:ring-blue-400/30"
            >
              <span className="relative block h-5 w-5">
                <span
                  className={
                    menuOpen
                      ? "absolute left-0 top-2 h-[2px] w-full origin-center rotate-45 bg-blue-200 transition-transform duration-300"
                      : "absolute left-0 top-1 h-[2px] w-full origin-center bg-blue-200 transition-transform duration-300"
                  }
                />
                <span
                  className={
                    menuOpen
                      ? "absolute left-0 top-3 h-[2px] w-full origin-center bg-blue-200/90 opacity-0 transition-opacity duration-200"
                      : "absolute left-0 top-3 h-[2px] w-full origin-center bg-blue-200/90 opacity-100 transition-opacity duration-200"
                  }
                />
                <span
                  className={
                    menuOpen
                      ? "absolute left-0 top-2 h-[2px] w-full origin-center -rotate-45 bg-blue-200 transition-transform duration-300"
                      : "absolute left-0 top-4 h-[2px] w-full origin-center bg-blue-200 transition-transform duration-300"
                  }
                />
              </span>
            </button>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              Features
            </a>
            <a
              href="#stats"
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              Stats
            </a>
            <a
              href="#get-started"
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              Get Started
            </a>
          </div>

          <div className="hidden md:flex">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-2xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(59,130,246,0.35),0_16px_40px_rgba(59,130,246,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-400 hover:shadow-[0_0_0_1px_rgba(147,197,253,0.55),0_18px_50px_rgba(59,130,246,0.35)]"
            >
              Start Now
            </Link>
          </div>
        </div>

        <div className="relative z-10 md:hidden">
          <div className="mx-auto max-w-6xl px-6 pb-5">
            <div className="overflow-hidden rounded-2xl bg-[var(--panel)] ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)] backdrop-blur-xl">
              <div
                className={
                  menuOpen
                    ? "max-h-96 opacity-100 pointer-events-auto transition-all duration-300"
                    : "max-h-0 opacity-0 pointer-events-none transition-all duration-300"
                }
              >
                <div className="flex flex-col gap-2 p-4">
                  <a
                    href="#features"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm text-gray-200 transition-colors hover:bg-white/10"
                  >
                    Features
                  </a>
                  <a
                    href="#stats"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm text-gray-200 transition-colors hover:bg-white/10"
                  >
                    Stats
                  </a>
                  <a
                    href="#get-started"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm text-gray-200 transition-colors hover:bg-white/10"
                  >
                    Get Started
                  </a>

                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 inline-flex items-center justify-center rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(59,130,246,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-400"
                  >
                    Start Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="top" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-24">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-medium tracking-wide text-blue-200">
              <SparkIcon className="h-4 w-4 text-blue-200" />
              Students can upload notes, generate summaries, quizzes, and study materials using AI
            </div>

            <h1 className="mt-7 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">
              Study smarter with{" "}
              <span className="relative whitespace-nowrap bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                AI-powered learning
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Turn your notes into premium summaries, quizzes, and adaptive study plans.
              Upload content, get clear understanding fast, and stay exam-ready.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-blue-500 to-blue-600 px-7 py-3.5 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(59,130,246,0.35),0_18px_60px_rgba(59,130,246,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                Start Learning
                <span className="grid h-6 w-6 place-items-center rounded-xl bg-blue-500/15 text-blue-50 ring-1 ring-blue-400/20">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h12"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-2xl border border-[var(--panel-border)] bg-[var(--panel)] px-7 py-3.5 text-sm font-semibold text-[var(--foreground)] shadow-[var(--panel-shadow)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:ring-1 hover:ring-blue-400/30"
              >
                Explore Features
              </a>
            </div>

            {/* Hero supporting panel */}
            <div className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14">
              <div className="relative overflow-hidden rounded-3xl bg-[var(--panel)] p-6 backdrop-blur-xl ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)] transition-all duration-300 hover:ring-blue-400/30">
                <div className="absolute -left-8 -top-10 h-28 w-28 rounded-full bg-blue-500/20 blur-2xl" />
                <div className="relative">
                  <div className="text-sm font-semibold text-blue-200">
                    Upload notes
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    Add text or content and let AI do the heavy lifting.
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-3xl bg-[var(--panel)] p-6 backdrop-blur-xl ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)] transition-all duration-300 hover:ring-blue-400/30">
                <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-cyan-400/15 blur-2xl" />
                <div className="relative">
                  <div className="text-sm font-semibold text-blue-200">
                    Generate study assets
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    Summaries, quizzes, and materials that match your learning goals.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pt-14 md:pt-20">
          <div className="flex flex-col items-center text-center">
            <div className="text-xs font-semibold tracking-widest text-blue-200/90">
              RESULTS YOU CAN FEEL
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Built to turn effort into understanding
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              Premium outputs for modern students: clarity, retention, and actionable practice.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.value}
                className="group relative rounded-3xl bg-[var(--panel)] p-6 ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:ring-blue-400/30"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-3xl font-extrabold tracking-tight text-blue-200">
                      {s.value}
                    </div>
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-500/15 text-blue-200 ring-1 ring-blue-400/20 transition-all duration-300 group-hover:scale-105">
                      {s.icon}
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-medium text-[var(--muted)]">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pt-14 md:pt-20">
          <div className="flex flex-col items-center text-center">
            <div className="text-xs font-semibold tracking-widest text-blue-200/90">
              DESIGNED FOR STUDY FLOW
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              From notes to mastery, in minutes
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              Upload. Summarize. Quiz. Practice. Repeat. The whole process feels fast, focused, and premium.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <IconCard
                key={f.title}
                title={f.title}
                description={f.description}
                icon={f.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Get started */}
      <section id="get-started" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pt-14 pb-16 md:pt-20">
          <div className="relative overflow-hidden rounded-3xl bg-[var(--panel)] p-7 backdrop-blur-xl ring-1 ring-[var(--panel-border)] shadow-[var(--panel-shadow)] sm:p-10">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="relative grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold tracking-wide text-blue-200">
                  <SparkIcon className="h-4 w-4" />
                  Nutronote AI
                </div>
                <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                  Ready to level up your studying?
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  Start by uploading your notes. Get a high-quality summary, generate quizzes, and build a study plan that actually fits your timeline.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-500 px-7 py-3.5 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(59,130,246,0.35),0_18px_60px_rgba(59,130,246,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-400"
                >
                  Start Now
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-2xl border border-[var(--panel-border)] bg-[var(--panel)] px-7 py-3.5 text-sm font-semibold text-[var(--foreground)] shadow-[var(--panel-shadow)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:ring-1 hover:ring-blue-400/30"
                >
                  See a Demo
                </Link>
                <p className="text-xs text-[var(--muted)]">
                  No clutter. Just study-ready outputs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--panel-border)] bg-[var(--panel)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-[var(--muted)]">
            {new Date().getFullYear()} Nutronote AI
          </div>
          <div className="flex gap-4 text-sm">
            <a href="#features" className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
              Features
            </a>
            <a href="#stats" className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
              Stats
            </a>
            <a href="#get-started" className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
              Start
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}