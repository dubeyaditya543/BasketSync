"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { deleteListAction, patchListAction } from "@/lib/actions/list-action";
import { useSocket } from "@/contexts/SocketContext";
import { useAuthAction } from "@/lib/hooks/useAuthAction";

interface ShowListNameProps {
  listName: string;
  groupId: string;
  listId: string;
}

export function ShowListName({ listName, groupId, listId }: ShowListNameProps) {
  const authAction = useAuthAction()
  const {socket} = useSocket()
  const [isListEditable, setIsListEditable] = useState<boolean>(false);
  const [newListName, setNewListName] = useState<string>(listName);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsListEditable(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsListEditable]);

  async function handleListEdit() {
    try {
      const formData = new FormData();
      formData.append("listName", newListName);

      const response = await authAction(
        patchListAction,
        groupId,
        listId,
        { success: false },
        formData,
      );

      if (!response.success) {
        return;
      }

      socket?.emit("group:update", groupId)

      setIsListEditable(false)
    } catch {
      console.error("Something went wrong");
    }
  }

  async function handleDelete(){
    try{
      const response = await authAction(deleteListAction, groupId, listId)
      if(!response.success){
        return
      }
      socket?.emit("group:update", groupId)
    }catch {
      console.error("Something went wrong")
    }
  }

  return (
    <>
      {isListEditable ? (
        <div className="flex items-center gap-2.5">
          <Input
            type="text"
            className="h-9 w-52 rounded-xl border-slate-200 text-sm font-semibold focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            autoFocus
          />
          <Button
            className="h-9 cursor-pointer rounded-lg bg-[#0c5443] px-3.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#094738]"
            onClick={handleListEdit}
          >
            Save
          </Button>
          <Button
            className="h-9 cursor-pointer rounded-lg border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-600 shadow-xs transition hover:bg-slate-50"
            onClick={() => setIsListEditable(false)}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-[#0c5443]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M15 3v4a2 2 0 0 0 2 2h4"/></svg>
          </div>
          <h3 className="text-lg font-bold tracking-tight text-slate-900">{listName}</h3>
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
                className="cursor-pointer"
                onClick={() => setIsListEditable(true)}
              >
                Edit Name
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500" onClick={handleDelete}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  );
}
