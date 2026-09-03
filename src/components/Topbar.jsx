import { BellIcon } from "@heroicons/react/24/outline";

export default function Topbar({ title, unread, onBellClick }) {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between p-5 border-b border-gray-200 bg-white">
      <div className="text-sm font-medium">{title}</div>

      <div onClick={onBellClick} className="relative cursor-pointer">
        <BellIcon className="w-6 h-6 text-gray-600" />

        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-semibold text-white bg-red-500 rounded-full">
            {unread}
          </span>
        )}
      </div>
    </div>
  );
}