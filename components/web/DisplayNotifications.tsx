import { Notification } from "@/lib/models/Notification";
import { NotificationItem } from "./NotificationItems";

interface DisplayNotificationsProps {
  userId: string;
}

export async function DisplayNotifications({ userId }: DisplayNotificationsProps) {
  const notifications = await Notification.find({ sentTo: userId });
  if (notifications.length === 0) {
    return (
      <div className="w-80 rounded-xl border border-slate-200 bg-white p-6 text-center shadow-lg">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        </div>
        <p className="text-sm font-semibold text-slate-700">All caught up!</p>
        <p className="mt-0.5 text-xs text-slate-400">No new notifications</p>
      </div>
    );
  }

  return (
    <div className="w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
      <div className="border-b border-slate-100 bg-slate-50/50 px-4 py-3">
        <p className="text-sm font-bold text-slate-800">Notifications</p>
        <p className="text-[11px] text-slate-400">{notifications.length} pending</p>
      </div>
      <div className="max-h-80 space-y-1 overflow-y-auto p-2">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification._id.toString()}
            notificationId={notification._id.toString()}
            message={notification.message}
            groupId={notification.groupId.toString()}
            link={notification?.link}
          />
        ))}
      </div>
    </div>
  );
}
