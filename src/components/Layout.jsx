import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import NotificationDropdown from "./NotificationDropdown";

export default function Layout({ children }) {
  const { api } = useAuth();

  const [openNotif, setOpenNotif] = useState(false);
  const [unread, setUnread] = useState(0);

  // unread count shu yerda olinadi
  useEffect(() => {
    api.get("/api/notification/")
      .then((res) => {
        const count = res.data.results.filter((n) => !n.read).length;
        setUnread(count);
      })
      .catch(() => {});
  }, [api]);

  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-64 h-screen overflow-y-auto bg-gray-50">
        <Topbar
          title="Dashboard"
          unread={unread}
          onBellClick={() => setOpenNotif(!openNotif)}
        />

        <div className="p-6">{children}</div>
      </main>

      {openNotif && (
        <NotificationDropdown
          api={api}
          onClose={() => setOpenNotif(false)}
        />
      )}
    </div>
  );
}