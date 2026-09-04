import Link from 'next/link';
import {
  ArrowUpRight,
  BookOpen,
  Headphones,
  Mic2,
  PenLine,
  Sparkles,
  Check,
} from 'lucide-react';

const skills = [
  {
    icon: Headphones,
    label: 'Listening',
    detail: 'Train your ear for every accent.',
    color: 'bg-sky-100 text-sky-700',
  },
  {
    icon: BookOpen,
    label: 'Reading',
    detail: 'Read with speed and precision.',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    icon: PenLine,
    label: 'Writing',
    detail: 'Structure answers that score.',
    color: 'bg-rose-100 text-rose-700',
  },
  {
    icon: Mic2,
    label: 'Speaking',
    detail: 'Build confidence out loud.',
    color: 'bg-violet-100 text-violet-700',
  },
];

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          <span className="text-lg">
            IELT<span className="text-primary">Star</span>
          </span>
        </Link>
        <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#method">Our method</a>
          <a href="#skills">Practice skills</a>
          <a href="#stories">Success stories</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="hidden text-sm font-medium sm:block">
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Start free <ArrowUpRight className="ml-1 inline size-4" />
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-14 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:pb-28 lg:pt-20">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" /> The
            smarter way to IELTS 2025
          </div>
          <h1 className="max-w-2xl text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.055em] md:text-7xl">
            Your best score is <span className="text-primary">closer</span> than
            you think.
          </h1>
          <p className="mt-7 max-w-lg text-pretty text-lg leading-8 text-muted-foreground">
            A focused practice platform that turns every study session into
            measurable progress. Prepare with purpose, walk in with confidence.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/sign-up"
              className="rounded-full bg-primary px-6 py-3.5 text-center text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15"
            >
              Create your free plan{' '}
              <ArrowUpRight className="ml-1 inline size-4" />
            </Link>
            <a
              href="#method"
              className="rounded-full border border-border px-6 py-3.5 text-center text-sm font-semibold"
            >
              See how it works
            </a>
          </div>
          <div className="mt-12 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              <span className="grid size-8 place-items-center rounded-full border-2 border-background bg-amber-200 text-xs font-semibold text-amber-900">
                JM
              </span>
              <span className="grid size-8 place-items-center rounded-full border-2 border-background bg-sky-200 text-xs font-semibold text-sky-900">
                AK
              </span>
              <span className="grid size-8 place-items-center rounded-full border-2 border-background bg-rose-200 text-xs font-semibold text-rose-900">
                SL
              </span>
            </div>
            <span>
              <strong className="text-foreground">12,000+</strong> learners
              preparing today
            </span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="rounded-[2rem] border border-border bg-card p-4 shadow-2xl shadow-primary/10">
            <div className="rounded-[1.4rem] bg-primary p-7 text-primary-foreground">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-primary-foreground/70">
                    Your next milestone
                  </p>
                  <p className="mt-1 text-3xl font-semibold">Band 7.5</p>
                </div>
                <span className="rounded-full bg-primary-foreground/15 px-3 py-1 text-xs">
                  In progress
                </span>
              </div>
              <div className="mt-10 flex items-end justify-between">
                <div>
                  <p className="text-6xl font-semibold tracking-tight">
                    68
                    <span className="text-2xl text-primary-foreground/60">
                      %
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-primary-foreground/70">
                    overall readiness
                  </p>
                </div>
                <div className="size-24 rounded-full border-[10px] border-primary-foreground/20 border-t-primary-foreground border-r-primary-foreground/80" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 p-3 pt-6">
              {skills.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-border p-3"
                >
                  <span
                    className={`grid size-9 place-items-center rounded-xl ${color}`}
                  >
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="text-xs text-muted-foreground">
                      Practice now
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-6 -left-5 hidden rounded-2xl border border-border bg-card p-4 shadow-xl sm:block">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                <Check className="size-4" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Last session</p>
                <p className="text-sm font-semibold">Reading · 8.0 band</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="mb-10 max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Practice with purpose
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Everything you need to feel ready.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {skills.map(({ icon: Icon, label, detail, color }) => (
              <div
                key={label}
                className="rounded-3xl border border-border bg-background p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  className={`grid size-11 place-items-center rounded-2xl ${color}`}
                >
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-8 font-semibold">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {detail}
                </p>
                <Link
                  href="/sign-up"
                  className="mt-6 inline-flex items-center text-sm font-semibold"
                >
                  Start practice <ArrowUpRight className="ml-1 size-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="method" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              A better loop
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Practice. Understand. Improve.
            </h2>
            <p className="mt-5 max-w-md leading-7 text-muted-foreground">
              IELTStar gives you a clear next step after every question, so you
              never study blindly.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-primary p-6 text-primary-foreground">
              <p className="text-4xl font-semibold">01</p>
              <h3 className="mt-14 font-semibold">Take a test</h3>
              <p className="mt-2 text-sm leading-6 text-primary-foreground/70">
                Start a focused skill session or the complete IELTS experience.
              </p>
            </div>
            <div className="rounded-3xl border border-border p-6">
              <p className="text-4xl font-semibold text-muted-foreground">02</p>
              <h3 className="mt-14 font-semibold">See the why</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Get instant explanations that make mistakes memorable.
              </p>
            </div>
            <div className="rounded-3xl border border-border p-6">
              <p className="text-4xl font-semibold text-muted-foreground">03</p>
              <h3 className="mt-14 font-semibold">Track the climb</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Watch your confidence and score move in the right direction.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <span>© 2025 IELTStar</span>
          <span>Designed for the next version of you.</span>
        </div>
      </footer>
    </main>
  );
}
