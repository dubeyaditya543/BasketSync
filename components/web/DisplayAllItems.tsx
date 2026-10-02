import { Item } from "@/lib/models/Item";
import { ItemContainer } from "./ItemContainer";
import { ShowListName } from "./ShowListName";

interface DisplayAllItemsProps {
  list: {
    _id: string;
    listName: string;
    group: string;
    createdBy: {
      fullName: string;
      avatarUrl: string;
    };
  };
}

export async function DisplayAllItems({ list }: DisplayAllItemsProps) {
  const rawItems = await Item.find({ list: list._id })
    .populate("addedBy", "fullName avatarUrl")
    .lean();

  const items = rawItems.map((item) => ({
    ...item,
    itemName: item.itemName.replace(
      /(^|[^a-zA-Z])([a-zA-Z])/g,
      (_, separator, letter) => separator + letter.toUpperCase(),
    ),
  }));

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
      {/* List header */}
      <div className="border-b border-slate-100 px-6 py-4">
        <ShowListName groupId={list.group} listId={list._id} listName={list.listName} />
      </div>

      {/* Items */}
      <div className="flex flex-col gap-3 p-5">
        {items.length === 0 ? (
          <div className="flex items-center justify-center rounded-xl border border-dashed border-slate-200 py-8 text-sm font-medium text-slate-400">
            No items yet — add one above
          </div>
        ) : (
          items.map((item) => (
            <ItemContainer key={item._id.toString()} item={JSON.parse(JSON.stringify(item))} />
          ))
        )}
      </div>
    </section>
  );
}
