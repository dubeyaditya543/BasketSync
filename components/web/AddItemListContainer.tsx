"use client";

import { useAuth } from "@/contexts/AuthContext";
import { ItemFormValues, itemSchema } from "@/lib/validations/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { ListDropdown, ListDropdownProps } from "./ListDropdown";
import { createItemAction } from "@/lib/actions/item-action";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CreateListBtn } from "./CreateListBtn";
import { CreateListCard } from "./CreateListCard";
import { useSocket } from "@/contexts/SocketContext";
import { useAuthAction } from "@/lib/hooks/useAuthAction";

interface AddItemProps {
  groupId: string;
  lists: ListDropdownProps;
}

export function AddItemListContainer({ groupId, lists }: AddItemProps) {
  const { user } = useAuth();
  const authAction = useAuthAction()
  const { socket } = useSocket();
  const [serverError, setServerError] = useState<string | null>(null);
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema as any),
    values: {
      itemName: "",
      listId: "",
      quantity: 1,
    },
  });

  if (!user) {
    return null;
  }

  async function handleAddItem(data: ItemFormValues) {
    setServerError(null);

    try {
      const formData = new FormData();
      formData.append("itemName", data.itemName);
      formData.append("listId", data.listId);
      formData.append("quantity", (data.quantity ?? 1).toString());

      const res = await authAction(
        createItemAction,
        groupId,
        data.listId,
        { success: false },
        formData,
      );

      if (!res.success) {
        setServerError(res.error ?? "Something went wrong");
        return;
      }

      socket?.emit("group:update", groupId);

      form.reset();
    } catch {
      setServerError("Something went wrong");
    }
  }

  return (
    <>
      {serverError && (
        <div className="mb-3 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
          {serverError}
        </div>
      )}
      <form
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={form.handleSubmit(handleAddItem)}
      >
        {/* Item Name */}
        <div className="flex-1 space-y-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Item
          </label>
          <Controller
            name="itemName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="text"
                placeholder="What do you need?"
                className="h-10 rounded-xl border-slate-200 bg-slate-50/50 px-3.5 text-sm placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:bg-white focus-visible:ring-emerald-500/20"
                aria-invalid={fieldState.invalid}
              />
            )}
          />
        </div>

        {/* Quantity */}
        <div className="w-24 space-y-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Qty
          </label>
          <Controller
            name="quantity"
            control={form.control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="number"
                placeholder="1"
                className="h-10 rounded-xl border-slate-200 bg-slate-50/50 px-3.5 text-center text-sm placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:bg-white focus-visible:ring-emerald-500/20"
                aria-invalid={fieldState.invalid}
              />
            )}
          />
        </div>

        {/* List Selector */}
        <div className="w-44 space-y-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            List
          </label>
          <Controller
            name="listId"
            control={form.control}
            render={({ field, fieldState }) => (
              <ListDropdown
                lists={JSON.parse(JSON.stringify(lists))}
                value={field.value}
                onValueChange={field.onChange}
                invalid={fieldState.invalid}
              />
            )}
          />
        </div>

        {/* Actions */}
        <div className="flex items-end gap-2">
          <Button
            type="submit"
            className="h-10 gap-1.5 rounded-xl bg-[#0c5443] px-5 text-sm font-semibold text-white shadow-xs transition hover:cursor-pointer hover:bg-[#094738]"
          >
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </Button>
          <Popover>
            <PopoverTrigger render={<CreateListBtn />} />
            <PopoverContent>
              <CreateListCard groupId={groupId} />
            </PopoverContent>
          </Popover>
        </div>
      </form>
    </>
  );
}
