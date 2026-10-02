"use client";

import { useAuth } from "@/contexts/AuthContext";
import { joinGroupAction } from "@/lib/actions/group-action";
import { toast } from "../ui/toast";
import { deleteJoinGroupNotification } from "@/lib/actions/notification-action";
import { useAuthAction } from "@/lib/hooks/useAuthAction";

interface NotificationItemProps {
  notificationId: string;
  message: string;
  groupId: string;
  link?: string;
}

export function NotificationItem({ notificationId, message, link, groupId }: NotificationItemProps) {
  const authAction = useAuthAction()

  async function handleAddMember() {
    try {
      const res = await authAction(joinGroupAction, groupId);
      if (!res.success) {
        toast.add({ type: "error", description: res.error ?? "Could not join you" });
        return;
      }
      await authAction(deleteJoinGroupNotification, notificationId)
      toast.add({type: "success", description: "Joined"})
    } catch {
      toast.add({ type: "error", description: "Something went wrong" });
      return;
    }
  }

  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-white p-3 text-xs transition hover:shadow-sm">
      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
      <div className="flex-1 space-y-1">
        <span className="font-semibold leading-snug text-slate-700 capitalize">{message}.</span>
        {link && (
          <span
            className="block cursor-pointer font-bold text-[#0c5443] transition hover:text-[#094738]"
            onClick={handleAddMember}
          >
            {link}
          </span>
        )}
      </div>
    </div>
  );
}
