"use client";

import { useSocket } from "@/contexts/SocketContext";
import { useUtilStore } from "@/lib/store/utils-store";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { toast } from "../ui/toast";

export function NotificationBtn({ children }: { children: ReactNode }) {
  const isNotificationOpen = useUtilStore((state) => state.isNotificationOpen);
  const setIsNotificationOpen = useUtilStore((state) => state.setIsNotificationOpen);
  const { socket } = useSocket();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsNotificationOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsNotificationOpen]);

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (data: { message: string }) => {
      toast.add({ type: "success", description: `🔔 ${data.message}` });
      router.refresh();
    };

    socket.on("notification:new", handleNewNotification);

    return () => {
      socket.off("notification:new", handleNewNotification)
    }
  }, [socket, router]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
        className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-500 shadow-xs transition hover:bg-slate-50 hover:text-slate-800"
      >
        <Bell className="h-4.5 w-4.5" />
        <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white">
          2
        </span>
      </button>
      {isNotificationOpen && (
        <div className="absolute top-full right-0 z-50 mt-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}
