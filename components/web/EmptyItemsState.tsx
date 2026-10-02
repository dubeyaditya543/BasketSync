import { ShoppingBag, Sparkles } from "lucide-react";

interface EmptyItemsStateProps {
  title?: string;
  description?: string;
  hasLists?: boolean;
}

export function EmptyItemsState({
  title = "No items in your lists yet",
  description = "Your lists are currently empty. Add groceries, ingredients, or supplies above to start collaborating in real-time.",
  hasLists = true,
}: EmptyItemsStateProps) {
  return (
    <div className="relative flex min-h-80 flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-xs">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-50/60" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-sky-50/50" />

      {/* Icon Badge */}
      <div className="relative z-10 mb-6 flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-[#0c5443] shadow-sm ring-8 ring-emerald-50/50">
        <ShoppingBag className="h-8 w-8" />
        <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#0c5443] shadow-sm ring-1 ring-slate-200">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
      </div>

      {/* Text Content */}
      <h2 className="relative z-10 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{title}</h2>
      <p className="relative z-10 mt-2.5 max-w-sm text-sm leading-relaxed text-slate-500">
        {hasLists
          ? description
          : "You don't have any lists created yet. Create your first list using the selector above to begin adding items."}
      </p>

      {/* Helpful Hint */}
      <div className="relative z-10 mt-7 flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600 shadow-xs">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 11 12 6 7 11" /><polyline points="17 18 12 13 7 18" /></svg>
        <span>Type an item in the bar above to get started</span>
      </div>
    </div>
  );
}
