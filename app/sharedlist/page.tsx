import {
  Search,
  ListTodo,
  Filter,
  ChevronDown,
  Check,
  Users,
  ShoppingBag,
  ArrowUpRight,
  LayoutGrid,
  List,
  Sparkles,
  Package,
  TrendingUp,
  Star,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/web/Sidebar";

const dummyUser = {
  fullName: "Aditya D.",
  avatarUrl: "",
  email: "aditya@email.com",
  avatarPublicId: "",
};

export default function SharedListPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#f4f7f6] text-slate-900">
      {/* ── Left Sidebar ──────────────────────────────────────────────── */}
      <Sidebar loggedInUser={dummyUser} />

      {/* ── Main Container ─────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* ── Top Header Bar ──────────────────────────────────────────── */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white px-6">
          {/* Search */}
          <div className="relative w-full max-w-md">
            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search lists, items, groups…"
              className="h-10 rounded-xl border-slate-200 bg-slate-50 pr-24 pl-10 text-sm placeholder:text-slate-400 focus-visible:ring-emerald-500/20"
            />
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-400">
              ⌘ K
            </span>
          </div>

          {/* View toggle + filter */}
          <div className="flex items-center gap-2">
            {/* View mode toggle */}
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-0.5">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-900 shadow-xs">
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:text-slate-600">
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Filter button */}
            <Button className="h-10 gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 shadow-xs transition hover:bg-slate-50">
              <Filter className="h-3.5 w-3.5" />
              <span>Filters</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </Button>
          </div>
        </header>

        {/* ── Content Body ────────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* Page heading */}
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-[#0c5443]">
                  <ListTodo className="h-4 w-4" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Shared Lists
                </h1>
              </div>
              <p className="text-xs text-slate-500">
                A unified view of every list across all your groups
              </p>
            </div>

            {/* Quick stat pills */}
            <div className="hidden items-center gap-2 sm:flex">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-xs">
                12 Lists
              </span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                47 Items
              </span>
            </div>
          </div>

          {/* ── Summary Stat Cards ─────────────────────────────────────── */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 – Total Lists */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-md">
              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-emerald-50 opacity-60 transition-transform duration-300 group-hover:scale-125" />
              <div className="relative">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-[#0c5443]">
                  <ListTodo className="h-5 w-5" />
                </div>
                <p className="text-2xl font-bold text-slate-900">12</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500">Total Lists</p>
              </div>
            </div>

            {/* Card 2 – Total Items */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-md">
              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-sky-50 opacity-60 transition-transform duration-300 group-hover:scale-125" />
              <div className="relative">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                  <Package className="h-5 w-5" />
                </div>
                <p className="text-2xl font-bold text-slate-900">47</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500">Total Items</p>
              </div>
            </div>

            {/* Card 3 – Completed */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-md">
              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-violet-50 opacity-60 transition-transform duration-300 group-hover:scale-125" />
              <div className="relative">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                  <Check className="h-5 w-5" />
                </div>
                <p className="text-2xl font-bold text-slate-900">31</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500">Items Collected</p>
              </div>
            </div>

            {/* Card 4 – Completion Rate */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-md">
              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-amber-50 opacity-60 transition-transform duration-300 group-hover:scale-125" />
              <div className="relative">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <p className="text-2xl font-bold text-slate-900">66%</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500">Completion Rate</p>
              </div>
            </div>
          </div>

          {/* ── List Groups ────────────────────────────────────────────── */}
          <div className="space-y-6">
            {/* ── Group Section 1 ────────────────────────────────────── */}
            <section className="rounded-2xl border border-slate-200/80 bg-white shadow-xs">
              {/* Group header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-[#0c5443]">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Home Essentials</h2>
                    <p className="text-[11px] text-slate-500">3 lists · 18 items</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Mini member avatars */}
                  <div className="flex -space-x-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">
                      S
                    </div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white ring-2 ring-white">
                      M
                    </div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white ring-2 ring-white">
                      A
                    </div>
                  </div>
                  <button className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50">
                    Open <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Lists inside group */}
              <div className="divide-y divide-slate-100">
                {/* List row 1 */}
                <div className="flex items-center justify-between px-6 py-4 transition hover:bg-slate-50/50">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-[#0c5443]">
                      <ShoppingBag className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">Weekly Groceries</h3>
                      <p className="text-[11px] text-slate-500">8 items · Updated 2h ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Progress pill */}
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-3/4 rounded-full bg-emerald-500" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">6/8</span>
                    </div>
                    {/* Priority */}
                    <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> High
                    </span>
                  </div>
                </div>

                {/* List row 2 */}
                <div className="flex items-center justify-between px-6 py-4 transition hover:bg-slate-50/50">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">Cleaning Supplies</h3>
                      <p className="text-[11px] text-slate-500">5 items · Updated 5h ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-2/5 rounded-full bg-sky-500" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">2/5</span>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                      Normal
                    </span>
                  </div>
                </div>

                {/* List row 3 */}
                <div className="flex items-center justify-between px-6 py-4 transition hover:bg-slate-50/50">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">Personal Care</h3>
                      <p className="text-[11px] text-slate-500">5 items · Updated 1d ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-full rounded-full bg-violet-500" />
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-600">5/5 ✓</span>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                      Done
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Group Section 2 ────────────────────────────────────── */}
            <section className="rounded-2xl border border-slate-200/80 bg-white shadow-xs">
              {/* Group header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Weekend BBQ</h2>
                    <p className="text-[11px] text-slate-500">2 lists · 14 items</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white ring-2 ring-white">
                      R
                    </div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white ring-2 ring-white">
                      A
                    </div>
                  </div>
                  <button className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50">
                    Open <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Lists inside group */}
              <div className="divide-y divide-slate-100">
                {/* List row 1 */}
                <div className="flex items-center justify-between px-6 py-4 transition hover:bg-slate-50/50">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-700">
                      <ShoppingBag className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">Meats & Marinades</h3>
                      <p className="text-[11px] text-slate-500">6 items · Updated 30m ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-1/3 rounded-full bg-rose-500" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">2/6</span>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> High
                    </span>
                  </div>
                </div>

                {/* List row 2 */}
                <div className="flex items-center justify-between px-6 py-4 transition hover:bg-slate-50/50">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">Drinks & Desserts</h3>
                      <p className="text-[11px] text-slate-500">8 items · Updated 1h ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-5/8 rounded-full bg-amber-500" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">5/8</span>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                      Normal
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Group Section 3 – Empty State ──────────────────────── */}
            <section className="rounded-2xl border border-dashed border-slate-300 bg-white shadow-xs">
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-[#0c5443] ring-8 ring-emerald-50/50">
                  <ListTodo className="h-7 w-7" />
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#0c5443] shadow-xs ring-1 ring-slate-200">
                    <Sparkles className="h-3 w-3" />
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  More lists will appear here
                </h3>
                <p className="mt-1 max-w-xs text-xs leading-relaxed text-slate-500">
                  As you join more groups and create lists, they'll all show up in this
                  unified view for easy access.
                </p>
              </div>
            </section>
          </div>
        </main>

        {/* ── Floating Bottom Summary Bar ────────────────────────────── */}
        <div className="fixed bottom-6 left-1/2 z-30 w-[90%] max-w-2xl -translate-x-1/2 rounded-2xl border border-slate-200/80 bg-white/95 p-3.5 shadow-2xl backdrop-blur-md md:left-[calc(50%+8rem)]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <ShoppingBag className="h-5 w-5 text-[#0c5443]" />
              <span>Overview</span>
            </div>

            <div className="flex items-center gap-4 text-center text-xs text-slate-600">
              <div>
                <span className="font-semibold text-slate-900">31</span>
                <span className="text-slate-400"> / </span>
                <span className="font-semibold text-slate-900">47</span>
                <span className="ml-1 text-slate-500">collected</span>
              </div>
              <Separator orientation="vertical" className="h-5" />
              <div>
                <span className="font-semibold text-slate-900">5</span>
                <span className="ml-1 text-slate-500">groups</span>
              </div>
            </div>

            <Button className="h-9 rounded-xl bg-[#0c5443] px-4 text-xs font-semibold text-white shadow-xs transition hover:bg-[#094738]">
              View All Items
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
