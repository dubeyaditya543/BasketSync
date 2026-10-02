import { getAutUserFromCookies } from "@/lib/serverAuth";
import { notFound, redirect } from "next/navigation";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { Group } from "@/lib/models/Group";
import { List } from "@/lib/models/List";
import { MemberStack } from "@/components/web/MemberStack";
import { AddItemListContainer } from "@/components/web/AddItemListContainer";
import { Sidebar } from "@/components/web/Sidebar";
import { User } from "@/lib/models/User";
import { DisplayAllLists } from "@/components/web/DisplayAllLists";
import { LeaveGroupBtn } from "@/components/web/LeaveGroupBtn";
import { AddMemberBtn } from "@/components/web/AddMemberBtn";
import { Cart } from "@/components/web/Cart";
import { GroupSocketListener } from "@/components/web/GroupSocketListener";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AddMemberCard } from "@/components/web/AddMemberCard";

interface Params {
  params: Promise<{ groupId: string }>;
}

export default async function GroupDetailsPage({ params }: Params) {
  const user = await getAutUserFromCookies();
  if (!user) {
    redirect("/login");
  }

  const { groupId } = await params;
  if (!mongoose.isValidObjectId(groupId)) {
    notFound();
  }

  await connectDB();
  const rawGroup = await Group.findOne({ _id: groupId, members: user.userId })
    .populate("members", "fullName avatarUrl")
    .populate("createdBy", "fullName avatarUrl")
    .lean();

  if (!rawGroup) {
    notFound();
  }

  const group = {
    ...rawGroup,
    groupName: rawGroup?.groupName.replace(
      /(^|[^a-zA-Z])([a-zA-Z])/g,
      (_, separtor, letter) => separtor + letter.toUpperCase(),
    ),
  };

  const rawLists = await List.find({ group: group._id })
    .populate("createdBy", "fullName avatarUrl")
    .lean();

  const lists = rawLists.map((list) => ({
    ...list,
    listName: list.listName.replace(
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

  const groupData = groupsData.find((grp) => grp.groupId.toString() === group._id!.toString());
  const totalItems = groupData?.totalItems ?? 0;
  const purchasedItems = groupData?.markedItems ?? 0;

  const loggedInUser = await User.findById(user.userId).lean();
  if (!loggedInUser) {
    return null;
  }

  const remainingItems = totalItems - purchasedItems;
  const completionPercent = totalItems > 0 ? Math.round((purchasedItems / totalItems) * 100) : 0;

  return (
    <div className="flex min-h-screen w-full bg-[#f4f7f6] text-slate-900">
      <Sidebar loggedInUser={JSON.parse(JSON.stringify(loggedInUser))} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* ── Top Header Bar ─────────────────────────────────────────── */}
        <header className="flex shrink-0 items-center justify-between border-b border-slate-200/80 bg-white px-6 py-4 sm:px-8">
          <div>
            <div className="mb-0.5 flex items-center gap-2 text-xs text-slate-400">
              <span className="font-medium text-slate-500 hover:text-slate-700">
                Groups
              </span>
              <span>/</span>
              <span className="font-semibold text-slate-700">{group.groupName}</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {group.groupName}
              </h1>
              <GroupSocketListener groupId={group._id!.toString()} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MemberStack members={JSON.parse(JSON.stringify(group.members))} />

            <div className="h-6 w-px bg-slate-200" />

            <Popover>
              <PopoverTrigger render={<AddMemberBtn />} />
              <PopoverContent>
                <AddMemberCard groupId={group._id.toString()} groupName={group.groupName} />
              </PopoverContent>
            </Popover>

            <LeaveGroupBtn groupId={group._id!.toString()} />
          </div>
        </header>

        {/* ── Content Body ───────────────────────────────────────────── */}
        <main className="relative flex-1 overflow-y-auto p-6 pb-28 sm:p-8 lg:p-10">
          {/* ── Summary Stat Cards ─────────────────────────────────── */}
          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {/* Card – Total Items */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-md">
              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-sky-50 opacity-60 transition-transform duration-300 group-hover:scale-125" />
              <div className="relative">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4 7.55 4.24" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" x2="12" y1="22" y2="12" /></svg>
                </div>
                <p className="text-2xl font-bold text-slate-900">{totalItems}</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500">Total Items</p>
              </div>
            </div>

            {/* Card – Collected */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-md">
              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-emerald-50 opacity-60 transition-transform duration-300 group-hover:scale-125" />
              <div className="relative">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-[#0c5443]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </div>
                <p className="text-2xl font-bold text-slate-900">{purchasedItems}</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500">Collected</p>
              </div>
            </div>

            {/* Card – Remaining */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-md">
              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-amber-50 opacity-60 transition-transform duration-300 group-hover:scale-125" />
              <div className="relative">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </div>
                <p className="text-2xl font-bold text-slate-900">{remainingItems}</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500">Remaining</p>
              </div>
            </div>

            {/* Card – Completion */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-md">
              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-violet-50 opacity-60 transition-transform duration-300 group-hover:scale-125" />
              <div className="relative">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
                </div>
                <p className="text-2xl font-bold text-slate-900">{completionPercent}%</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500">Completion</p>
              </div>
            </div>
          </div>

          {/* ── Add Item Bar ───────────────────────────────────────── */}
          <div className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
            <AddItemListContainer groupId={groupId} lists={JSON.parse(JSON.stringify(lists))} />
          </div>

          {/* ── Grocery Items List ─────────────────────────────────── */}
          <DisplayAllLists lists={JSON.parse(JSON.stringify(lists))} />
        </main>

        {/* ── Floating Bottom Cart Bar ────────────────────────────── */}
        <Cart totalItems={totalItems} purchasedItems={purchasedItems} />
      </div>
    </div>
  );
}

