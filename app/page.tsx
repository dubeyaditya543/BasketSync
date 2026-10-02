import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Check, Radio, Bell, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "BasketSync — Real-Time Collaborative Grocery Shopping",
  description:
    "Real-time collaborative grocery shopping SaaS application for coordinating effortlessly with family, roommates, and groups.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ── Navbar ─────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0c5443] text-white">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <span className="text-base font-semibold text-slate-900">
              Basket<span className="text-[#0c5443]">Sync</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-[13px] text-slate-500 hover:text-slate-900">
              Features
            </Link>
            <Link href="#how-it-works" className="text-[13px] text-slate-500 hover:text-slate-900">
              How it works
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-[13px] cursor-pointer font-medium text-slate-600 hover:text-slate-900"
            >
              Sign in
            </Link>
            <Link href="/signup">
              <Button className="h-8 rounded-md cursor-pointer bg-[#0c5443] px-3.5 text-[13px] font-medium text-white hover:bg-[#0a4839]">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="px-5 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Text */}
            <div className="max-w-xl">
              <h1 className="text-[2.75rem] leading-[1.1] font-bold tracking-tight text-slate-900 sm:text-[3.5rem]">
                Grocery shopping,
                <br />
                together.
              </h1>

              <p className="mt-5 text-lg leading-relaxed text-slate-500">
                Share a list with your household. When someone grabs the milk
                and checks it off at the store, everyone sees it update
                instantly.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <Link href="/signup">
                  <Button className="h-10 cursor-pointer rounded-lg bg-[#0c5443] px-5 text-sm font-medium text-white hover:bg-[#0a4839]">
                    Get started — it&apos;s free
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="h-10 rounded-lg border-slate-200 px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Join with code
                  </Button>
                </Link>
              </div>

              <p className="mt-5 text-[13px] text-slate-400">
                Free for everyone. No credit card, no app install.
              </p>
            </div>

            {/* Product mockup */}
            <div className="w-full max-w-md justify-self-center lg:justify-self-end">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">
                {/* List header */}
                <div className="flex items-center justify-between pb-4">
                  <div>
                    <p className="text-[11px] font-medium tracking-wide text-[#0c5443] uppercase">
                      Live
                    </p>
                    <h3 className="text-base font-semibold text-slate-900">
                      Weekly groceries
                    </h3>
                  </div>
                  <div className="flex -space-x-1.5">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                      className="h-6 w-6 rounded-full object-cover ring-2 ring-white"
                      alt="Member" width={48} height={48}
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                      className="h-6 w-6 rounded-full object-cover ring-2 ring-white"
                      alt="Member" width={48} height={48}
                    />
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[10px] font-medium text-slate-500 ring-2 ring-white">
                      +2
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  {/* Checked items */}
                  <div className="flex items-center gap-3 py-2">
                    <div className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded bg-[#0c5443]">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-400 line-through">
                      Greek yogurt
                    </span>
                  </div>
                  <div className="flex items-center gap-3 py-2">
                    <div className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded bg-[#0c5443]">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-400 line-through">
                      Oat milk
                    </span>
                  </div>

                  {/* Unchecked items */}
                  <div className="flex items-center gap-3 py-2">
                    <div className="h-4.5 w-4.5 shrink-0 rounded border-[1.5px] border-slate-300" />
                    <span className="text-sm text-slate-800">
                      Sourdough bread
                    </span>
                  </div>
                  <div className="flex items-center gap-3 py-2">
                    <div className="h-4.5 w-4.5 shrink-0 rounded border-[1.5px] border-slate-300" />
                    <span className="text-sm text-slate-800">
                      Avocados × 4
                    </span>
                  </div>
                  <div className="flex items-center gap-3 py-2">
                    <div className="h-4.5 w-4.5 shrink-0 rounded border-[1.5px] border-slate-300" />
                    <span className="text-sm text-slate-800">
                      Eggs (free range)
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-3 flex items-center gap-3 border-t border-slate-100 pt-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-2/5 rounded-full bg-[#0c5443]" />
                  </div>
                  <span className="text-xs text-slate-400">2 / 5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social proof — understated ─────────────────── */}
      <section className="border-t border-slate-100 px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <div className="flex -space-x-2">
            <Image
              className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              width={48} height={48} alt="User"
            />
            <Image
              className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
              width={48} height={48} alt="User"
            />
            <Image
              className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
              width={48} height={48} alt="User"
            />
            <Image
              className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
              width={48} height={48} alt="User"
            />
          </div>
          <p className="text-sm text-slate-400">
            Used by thousands of households every week
          </p>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────── */}
      <section id="features" className="px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Built for real households
          </h2>
          <p className="mt-2 max-w-lg text-base text-slate-500">
            Not another notes app. BasketSync is purpose-built for the
            particular chaos of shared grocery shopping.
          </p>

          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {/* Feature 1 */}
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <Radio className="h-5 w-5 text-[#0c5443]" />
              </div>
              <h3 className="text-[15px] font-semibold text-slate-900">
                Real-time sync
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                Items update across every connected device the moment someone
                checks one off. No refreshing, no conflicts.
              </p>
            </div>

            {/* Feature 2 */}
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <Bell className="h-5 w-5 text-[#0c5443]" />
              </div>
              <h3 className="text-[15px] font-semibold text-slate-900">
                Instant notifications
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                Get notified when someone arrives at the store so you can add
                last-minute items before they reach checkout.
              </p>
            </div>

            {/* Feature 3 */}
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <Users className="h-5 w-5 text-[#0c5443]" />
              </div>
              <h3 className="text-[15px] font-semibold text-slate-900">
                Groups for everything
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                Separate lists for the apartment, family home, weekend BBQ,
                or holiday dinner. Share with an 8-digit code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────── */}
      <section
        id="how-it-works"
        className="border-t border-slate-100 bg-slate-50/60 px-5 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Up and running in 30 seconds
          </h2>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            <div>
              <span className="mb-3 inline-block text-[13px] font-semibold text-[#0c5443]">
                01
              </span>
              <h3 className="text-[15px] font-semibold text-slate-900">
                Create a list
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                Name it &ldquo;Weekly groceries&rdquo; or &ldquo;Roommate
                pantry&rdquo; — whatever makes sense. Add items as you think
                of them.
              </p>
            </div>

            <div>
              <span className="mb-3 inline-block text-[13px] font-semibold text-[#0c5443]">
                02
              </span>
              <h3 className="text-[15px] font-semibold text-slate-900">
                Share the code
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                Send an 8-digit code to your household. They open it in any
                browser — no app download, no account linking.
              </p>
            </div>

            <div>
              <span className="mb-3 inline-block text-[13px] font-semibold text-[#0c5443]">
                03
              </span>
              <h3 className="text-[15px] font-semibold text-slate-900">
                Shop together
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                Split the aisles. As items get picked up and checked off, the
                list updates for everyone simultaneously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Stop texting grocery lists
          </h2>
          <p className="mt-3 text-base text-slate-500">
            Create a shared list in seconds. Free for everyone, forever.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/signup">
              <Button className="h-10 rounded-lg bg-[#0c5443] px-5 text-sm font-medium text-white hover:bg-[#0a4839]">
                Get started
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="h-10 rounded-lg border-slate-200 px-5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="border-t border-slate-100 px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0c5443] text-white">
              <ShoppingBag className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-semibold text-slate-900">
              Basket<span className="text-[#0c5443]">Sync</span>
            </span>
          </div>

          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} BasketSync. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link href="#features" className="hover:text-slate-900">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-slate-900">
              How it works
            </Link>
            <Link href="/login" className="hover:text-slate-900">
              Sign in
            </Link>
            <Link href="/signup" className="hover:text-slate-900">
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
