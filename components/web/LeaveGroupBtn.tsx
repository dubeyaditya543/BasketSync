"use client";

import { LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import { leaveGroupAction } from "@/lib/actions/group-action";
import { useRouter } from "next/navigation";
import { useAuthAction } from "@/lib/hooks/useAuthAction";

interface LeaveGroupBtnProps {
  groupId: string
}

export function LeaveGroupBtn({groupId}: LeaveGroupBtnProps) {
  const authAction = useAuthAction()
  const router = useRouter()

  async function handleLeaveGroup(){
    try{
      const response = await authAction(leaveGroupAction, groupId)
      if(!response.success){
        console.error(response.error ?? "Something went wrong")
      }
      router.push("/dashboard")
    }catch{
      console.error("Something went wrong while leaving group")
    }
  }

  return (
    <Button onClick={handleLeaveGroup} className={"bg-red-700 hover:bg-red-700/80 cursor-pointer text-white h-10"}>
      Leave Group <LogOutIcon />{" "}
    </Button>
  );
}
