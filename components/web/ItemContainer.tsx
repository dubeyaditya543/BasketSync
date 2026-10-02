"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Check } from "lucide-react";
import { ItemContainerVerticalBtn } from "./ItemContainerVerticalBtn";
import { AvatarPic } from "./AvatarPic";
import { useState } from "react";
import { Input } from "../ui/input";
import { patchItemAction } from "@/lib/actions/item-action";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useSocket } from "@/contexts/SocketContext";
import { useAuthAction } from "@/lib/hooks/useAuthAction";

interface ItemContainerProps {
  item: {
    _id: string;
    itemName: string;
    purchased: boolean;
    addedBy: {
      _id: string;
      fullName: string;
      avatarUrl: string;
    };
    list: string;
    quantity: number;
  };
}

export function ItemContainer({ item }: ItemContainerProps) {
  const params = useParams<{groupId: string}>()
  const { user } = useAuth();
  const authAction = useAuthAction()
  const {socket} = useSocket()
  const [newItemName, setNewItemName] = useState<string | null>(null);
  const [newQuantity, setQuantity] = useState<number | null>(null);
  const [isItemNameEditable, setIsItemNameEditable] = useState<boolean>(false);
  const [isQuantityEditable, setIsQuantityEditable] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null)

  if (!user) {
    return;
  }

  async function handleEdit(){
    if(!newItemName && !newQuantity){
      return;
    }

    setServerError(null)

    try{
      const formData = new FormData()
      formData.append("itemName", newItemName ?? "")
      formData.append("quantity", (newQuantity ?? 0).toString())

      const res = await authAction(patchItemAction, params.groupId, item.list, item._id, {success: false}, formData)

      if(!res.success){
        setServerError(res.error ?? "Soemthing went wrong while updating")
        return
      }

      socket?.emit("group:update", params.groupId)

      setIsItemNameEditable(false)
      setIsQuantityEditable(false)
      setNewItemName(null)
      setQuantity(null)
    }catch {
      setServerError("Something went wrong. Try again")
    }
  }

  async function handlePurchase(value: boolean){
    setServerError(null)

    try{
      const formData = new FormData()
      formData.append("purchased", value.toString())

      const res = await authAction(patchItemAction, params.groupId, item.list, item._id, {success: false}, formData)

      if(!res.success){
        setServerError(res.error ?? "Something went wrong")
        return
      }

      socket?.emit("group:update", params.groupId)
    }catch {
      setServerError("Something went wrong. Please try again")
    }
  }

  return (
    <div
      className={`group/item relative flex items-center justify-between rounded-2xl border bg-white px-5 py-4 transition-all duration-200 hover:shadow-md ${
        item.purchased
          ? "border-emerald-200/80 bg-emerald-50/30"
          : "border-slate-200/80 shadow-xs hover:border-slate-300"
      }`}
    >
      {/* Left: Checkbox + Name */}
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <Checkbox
          checked={item.purchased}
          onCheckedChange={(checked) => handlePurchase(Boolean(checked))}
          className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-white transition-colors"
        >
          {item.purchased && <Check className="h-4 w-4 stroke-4" />}
        </Checkbox>

        {isItemNameEditable ? (
          <Input
            value={newItemName ?? item.itemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="h-9 max-w-xs rounded-xl border-slate-200 text-sm focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
            autoFocus
          />
        ) : (
          <span
            className={`truncate text-sm font-medium transition-all duration-200 ${
              item.purchased ? "text-slate-400 line-through" : "text-slate-800"
            }`}
          >
            {item.itemName}
          </span>
        )}
      </div>

      {/* Right: Quantity, Avatar, Actions */}
      <div className="flex shrink-0 items-center gap-3">
        {item.quantity ? (
          isQuantityEditable ? (
            <Input
              type="number"
              value={newQuantity ?? item.quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="h-9 w-20 rounded-xl border-slate-200 text-center text-sm focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
              autoFocus
            />
          ) : (
            <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold tabular-nums text-slate-600">
              ×{item.quantity}
            </span>
          )
        ) : null}

        {(isItemNameEditable || isQuantityEditable) && (
          <Button
            onClick={handleEdit}
            className="h-8 cursor-pointer rounded-lg bg-[#0c5443] px-3.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#094738]"
          >
            Save
          </Button>
        )}

        {item.addedBy?._id !== user.userId && item.addedBy && (
          <div className="flex items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50 py-0.5 pr-2.5 pl-0.5">
            <AvatarPic
              _id={item.addedBy._id}
              fullName={item.addedBy.fullName}
              avatarUrl={item.addedBy.avatarUrl}
              className="h-6 w-6 text-[10px]"
            />
            <span className="text-[11px] font-medium text-slate-500">
              {item.addedBy.fullName.split(" ")[0]}
            </span>
          </div>
        )}

        <ItemContainerVerticalBtn
          itemId={item._id}
          listId={item.list}
          setIsItemNameEditable={setIsItemNameEditable}
          setIsQuantityEditable={setIsQuantityEditable}
        />
      </div>
    </div>
  );
}
