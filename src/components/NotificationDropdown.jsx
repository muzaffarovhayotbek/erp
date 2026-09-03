import { useEffect, useRef, useState } from "react";

export default function NotificationDropdown({ api, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const ref = useRef();

  useEffect(() => {
    api.get("/api/notification/")
      .then((res) => setNotifications(res.data.results.slice(0, 8)))
      .catch(() => {});
  }, [api]);

  // outside click
  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="fixed top-20 right-6 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
    >
      <div className="p-4 border-b font-semibold">Notifications</div>

      <div className="max-h-80 overflow-y-auto">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 border-b text-sm ${
              !n.read ? "bg-gray-50 font-medium" : ""
            }`}
          >
            {n.message}
            <div className="text-xs text-gray-400 mt-1">
              {n.created_at}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 text-center">
        <a href="/notifications" className="text-blue-600 text-sm">
          Barchasini ko‘rish
        </a>
      </div>
    </div>
  );
}