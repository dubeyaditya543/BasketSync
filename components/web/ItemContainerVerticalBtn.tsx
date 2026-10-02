"use client";

import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteItemAction } from "@/lib/actions/item-action";
import { useSocket } from "@/contexts/SocketContext";
import { useAuthAction } from "@/lib/hooks/useAuthAction";

interface ItemContainerVerticalBtnProps {
  listId: string;
  itemId: string;
  setIsItemNameEditable: (value: boolean) => void;
  setIsQuantityEditable: (value: boolean) => void;
}

export function ItemContainerVerticalBtn({
  listId,
  itemId,
  setIsItemNameEditable,
  setIsQuantityEditable,
}: ItemContainerVerticalBtnProps) {
  const params = useParams<{ groupId: string }>();
  const { user } = useAuth();
  const authAction = useAuthAction()
  const {socket} = useSocket()
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        setIsItemNameEditable(false);
        setIsQuantityEditable(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsItemNameEditable, setIsQuantityEditable]);

  

  if (!user) {
    return null;
  }

  async function handleDelete() {
    setServerError(null);
    try {
      const res = await authAction(deleteItemAction, params.groupId, listId, itemId);

      if (!res.success) {
        setServerError(res.error ?? "Something went wrong");
        return;
      }

      socket?.emit("group:update", params.groupId)
    } catch {
      setServerError("Something went wrong while deleting");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
            <MoreVertical className="h-4 w-4" />
          </button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onClick={() => setIsItemNameEditable(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>
          Edit Name
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onClick={() => setIsQuantityEditable(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="9" y2="9"/><line x1="5" x2="19" y1="15" y2="15"/><line x1="11" x2="11" y1="4" y2="20"/><line x1="15" x2="15" y1="4" y2="20"/></svg>
          Edit Quantity
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="cursor-pointer gap-2 text-red-500 focus:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
