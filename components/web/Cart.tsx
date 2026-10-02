"use client"

import { Loader2, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useSocket } from "@/contexts/SocketContext";
import { useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "../ui/toast";
import { completeAllAction } from "@/lib/actions/item-action";
import { useAuthAction } from "@/lib/hooks/useAuthAction";

interface CartProps {
  totalItems: number;
  purchasedItems: number
}

export function Cart({totalItems, purchasedItems}: CartProps) {
  const authAction = useAuthAction()
  const params = useParams<{groupId: string}>()
  const {socket} = useSocket()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function handleCompleteAll() {
    if(purchasedItems === 0){
      toast.add({type: "error", description: "No items have been collected yet"})
      return
    }
    setIsLoading(true)
    try{
      const res = await authAction(completeAllAction, params.groupId)

      if(!res.success){
        toast.add({type: "error", description: res.error ?? "Failed to complete trip"})
        return
      }

      socket?.emit("group:update", params.groupId)
      
      toast.add({type: "success", description: `Trip completed ${res.count ?? 0} purchased item cleared`})
    }catch {
      toast.add({type: "error", description: "Something went wrong"})
    }finally {
      setIsLoading(false)
    }
  }

  const progressPercent = totalItems > 0 ? Math.round((purchasedItems / totalItems) * 100) : 0;

  return (
    <div className="fixed bottom-6 left-1/2 z-30 w-[92%] max-w-2xl -translate-x-1/2 rounded-2xl border border-slate-200/60 bg-white/95 px-5 py-3.5 shadow-2xl ring-1 ring-black/[0.03] backdrop-blur-lg md:left-[calc(50%+8rem)]">
      <div className="flex items-center justify-between gap-5">
        {/* Left: Icon + Label */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-[#0c5443]">
            <ShoppingCart className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Shopping Cart</p>
            <p className="text-[11px] text-slate-500">
              {purchasedItems} of {totalItems} collected
            </p>
          </div>
        </div>

        {/* Center: Mini progress */}
        <div className="hidden flex-1 items-center gap-3 sm:flex">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-bold tabular-nums text-slate-600">{progressPercent}%</span>
        </div>

        {/* Right: CTA */}
        <Button
          onClick={handleCompleteAll}
          disabled={isLoading || purchasedItems === 0}
          className="h-9 cursor-pointer rounded-xl bg-[#0c5443] px-5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#094738] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              Completing…
            </>
          ) : (
            "Complete Trip"
          )}
        </Button>
      </div>
    </div>
  );
}
