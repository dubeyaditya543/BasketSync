import { Users, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateGroupForm } from "@/components/web/CreateGroupForm";
import { CreateGroupBtn } from "@/components/web/CreateGroupBtn";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { JoinGroupBtn } from "@/components/web/JoinGroupBtn";
import { JoinGroupCard } from "@/components/web/JoinGroupCard";
import { connectDB } from "@/lib/db";
import { getAutUserFromCookies } from "@/lib/serverAuth";
import { Group } from "@/lib/models/Group";
import { redirect } from "next/navigation";
import { GroupCard } from "@/components/web/GroupCard";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { User } from "@/lib/models/User";
import { Sidebar } from "@/components/web/Sidebar";
import mongoose from "mongoose";
import { NotificationBtn } from "@/components/web/NotificationBtn";
import { DisplayNotifications } from "@/components/web/DisplayNotifications";

export default async function DashboardPage() {
  await connectDB();

  const user = await getAutUserFromCookies();
  if (!user) {
    redirect("/login");
  }

  const rawGroups = await Group.find({ members: user.userId })
    .populate("createdBy", "fullName avatarUrl")
    .populate("members", "fullName avatarUrl")
    .lean();

  const groups = rawGroups.map((group) => ({
    ...group,
    groupName: group.groupName.replace(
      /(^|[^a-zA-Z])([a-zA-Z])/g,
      (_, separator, letter) => separator + letter.toUpperCase(),
    ),
  }));

  const groupsData = await Group.aggregate([
    {
      $match: {
        members: new mongoose.Types.ObjectId(user.userId),
      },
    },
    {
      $lookup: {
        from: "lists",
        localField: "_id",
        foreignField: "group",
        as: "lists",
      },
    },
    {
      $lookup: {
        from: "items",
        localField: "lists._id",
        foreignField: "list",
        as: "items",
      },
    },
    {
      $project: {
        _id: 0,
        groupId: "$_id",
        totalItems: { $size: "$items" },
        markedItems: {
          $size: {
            $filter: {
              input: "$items",
              as: "item",
              cond: { $eq: ["$$item.purchased", true] },
            },
          },
        },
      },
    },
  ]);

  const loggedInUser = await User.findById(user.userId).lean();
  if (!loggedInUser) {
    return null;
  }

  const totalGroupItems = groupsData.reduce((sum: number, g: { totalItems: number }) => sum + g.totalItems, 0);
  const totalCollected = groupsData.reduce((sum: number, g: { markedItems: number }) => sum + g.markedItems, 0);

  return (
    <div className="flex min-h-screen w-full bg-[#f4f7f6] text-slate-900">
      {/* Left Sidebar */}
      <Sidebar loggedInUser={JSON.parse(JSON.stringify(loggedInUser))} />

      {/* Main Container */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className="flex shrink-0 items-center justify-between border-b border-slate-200/80 bg-white px-6 py-4 sm:px-8">
          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search groups, lists, items…"
              className="h-10 rounded-xl border-slate-200 bg-slate-50 pr-24 pl-10 text-sm placeholder:text-slate-400 focus-visible:ring-emerald-500/20"
            />
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-400">
              ⌘ K
            </span>
          </div>

          <div className="flex items-center gap-3">
            <NotificationBtn>
              <DisplayNotifications userId={user.userId} />
            </NotificationBtn>

            <div className="h-6 w-px bg-slate-200" />

            {/* Create New Group Button */}
            <Popover>
              <PopoverTrigger render={<CreateGroupBtn />} />
              <PopoverContent>
                <CreateGroupForm />
              </PopoverContent>
            </Popover>

            {/* Join with Code Button */}
            <Popover>
              <PopoverTrigger render={<JoinGroupBtn />} />
              <PopoverContent>
                <JoinGroupCard />
              </PopoverContent>
            </Popover>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* Page Heading */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="mb-1.5 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-[#0c5443]">
                  <Users className="h-4.5 w-4.5" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Groups</h1>
              </div>
              <p className="text-xs text-slate-500">
                Manage all your collaborative shopping groups in one place
              </p>
            </div>

            {/* Quick stat pills */}
            <div className="hidden items-center gap-2 sm:flex">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-xs">
                {groups.length} {groups.length === 1 ? "Group" : "Groups"}
              </span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {totalCollected}/{totalGroupItems} Collected
              </span>
            </div>
          </div>

          {/* Group Cards or Empty State */}
          {groups.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => {
                const groupData = groupsData.find(
                  (grp: { groupId: mongoose.Types.ObjectId }) => grp.groupId.toString() === group._id.toString(),
                );
                const totalItems = groupData?.totalItems ?? 0;
                const purchasedItems = groupData?.markedItems ?? 0;
                return (
                  <GroupCard
                    group={JSON.parse(JSON.stringify(group))}
                    key={group._id.toString()}
                    totalItems={totalItems}
                    purchasedItems={purchasedItems}
                  />
                );
              })}
            </div>
          ) : (
            <div className="relative flex min-h-96 flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-xs">
              {/* Decorative blobs */}
              <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-50/60" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-sky-50/50" />

              <div className="relative z-10 mb-6 flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-[#0c5443] shadow-sm ring-8 ring-emerald-50/50">
                <Users className="h-8 w-8" />
              </div>

              <h2 className="relative z-10 text-xl font-bold text-slate-900">You are not in any group</h2>
              <p className="relative z-10 mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                Join an existing group with an 8-digit code or create a new group to start sharing
                real-time grocery lists with your household.
              </p>

              <div className="relative z-10 mt-7 flex flex-wrap items-center justify-center gap-3">
                <Dialog>
                  <DialogTrigger render={<CreateGroupBtn />} />
                  <DialogContent className="border-none bg-transparent p-0">
                    <CreateGroupForm />
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger render={<JoinGroupBtn />} />
                  <DialogContent className="border-none bg-transparent p-0">
                    <JoinGroupCard />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
