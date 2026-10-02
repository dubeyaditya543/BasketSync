"use client";

import { CheckCircle2, MoreVertical, Copy, ArrowUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { deleteGroupAction, patchGroupAction } from "@/lib/actions/group-action";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { AvatarPic } from "@/components/web/AvatarPic";
import { Progress } from "../ui/progress";
import { toast } from "../ui/toast";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useAuthAction } from "@/lib/hooks/useAuthAction";

export interface GroupCardProps {
  group: {
    _id: string;
    groupName: string;
    members: Array<{
      _id: string;
      fullName: string;
      avatarUrl: string;
    }>;
    createdBy: {
      _id: string;
      fullName: string;
      avatarUrl: string;
    };
    joinCode: string;
  };
  totalItems: number;
  purchasedItems: number;
}

export function GroupCard({ group, purchasedItems, totalItems }: GroupCardProps) {
  const { user } = useAuth();
  const authAction = useAuthAction()
  const [isGroupEditable, setIsGroupEditable] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>(group.groupName);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsGroupEditable(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsGroupEditable]);

  if (!user) {
    return null;
  }

  const isCreator = group.createdBy._id && group.createdBy._id === user.userId;

  async function handleGroupEdit() {
    try {
      const formData = new FormData();
      formData.append("groupName", groupName);

      const response = await authAction(patchGroupAction, group._id, { success: false }, formData);

      if (!response.success) {
        console.error(response.error ?? "Something went wrong");
        return;
      }

      setIsGroupEditable(false)
    } catch {
      console.error("Something went wrong internally while updating group name");
    }
  }

  async function handleDelete() {
    const response = await authAction(deleteGroupAction, group._id);
    if (!response.success) {
      console.error(response.error ?? "Something went wrong");
      return;
    }
  }

  const progressPercent = totalItems > 0 ? Math.round((purchasedItems / totalItems) * 100) : 0;

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-0 shadow-xs transition-all duration-200 hover:shadow-md">
      {/* Card Header */}
      <div className="space-y-3 p-5 pb-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            {isGroupEditable ? (
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={groupName}
                  className="h-9 w-full rounded-xl border-slate-200 text-sm font-semibold focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                  onChange={(e) => setGroupName(e.target.value)}
                  autoFocus
                />
                <Button
                  className="h-9 shrink-0 cursor-pointer rounded-lg bg-[#0c5443] px-3.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#094738]"
                  onClick={() => handleGroupEdit()}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div
                className="flex cursor-pointer items-center gap-1.5 transition hover:opacity-80"
                onClick={() => router.push(`/dashboard/group/${group._id}`)}
              >
                <h3 className="truncate text-base font-bold tracking-tight text-slate-900">
                  {group.groupName}
                </h3>
                <ArrowUp className="h-4 w-4 shrink-0 rotate-45 text-slate-400" />
              </div>
            )}
          </div>

          {!isGroupEditable && (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                }
              />
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="cursor-pointer gap-2"
                  onClick={() => setIsGroupEditable(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer gap-2 text-red-500 focus:text-red-500"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Creator Badge */}
        {isCreator && (
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
            <CheckCircle2 className="h-3 w-3 fill-emerald-200 text-emerald-600" />
            Creator
          </div>
        )}
      </div>

      {/* Member Avatars */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 overflow-hidden">
            {group.members &&
              group.members.length > 0 &&
              group.members
                .slice(0, 4)
                .map((member, index) => (
                  <AvatarPic
                    key={index}
                    fullName={member.fullName}
                    avatarUrl={member.avatarUrl}
                    _id={member._id}
                    className="h-8 w-8 ring-2 ring-white"
                  />
                ))}
          </div>
          {group.members && group.members.length > 4 && (
            <span className="text-xs font-semibold text-slate-500">
              +{group.members.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Progress + Join Code Footer */}
      <div className="rounded-b-2xl border-t border-slate-100 bg-slate-50/50 px-5 py-4">
        {/* Progress */}
        <div className="mb-3 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            {totalItems === 0 ? (
              <span className="font-medium text-slate-400">No items yet</span>
            ) : (
              <>
                <span className="font-semibold text-slate-700">
                  {purchasedItems}/{totalItems} collected
                </span>
                <span className="font-bold tabular-nums text-slate-500">{progressPercent}%</span>
              </>
            )}
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Join Code */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white px-3 py-2">
          <span className="font-mono text-xs text-slate-500">
            Code: <span className="font-bold text-slate-800">{group.joinCode}</span>
          </span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(group.joinCode);
              toast.add({ type: "success", description: "Copied" });
            }}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            title="Copy Join Code"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
