import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AddButtonRight from "../components/AddButtonRight";
import CreateGroupModal from "../components/CreateGroupModal";
import { apiFetch } from "../context/api";

export default function Guruhlar() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [groups, setGroups] = useState([]);

  // 🔥 Backenddan guruhlarni olish
  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem("access");

      if (!token) throw new Error("Access token mavjud emas");

      const res = await apiFetch("api/groups/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Server xatosi: ${res.status}`);
      }

      const data = await res.json();
      console.log("API DATA:", data);

      // Har doim array bo‘lishi uchun
      setGroups(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error("Guruhlarni olishda xatolik:", err);
      setGroups([]);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  // 🔹 Formatlash funksiyalari
  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 flex-1 h-screen overflow-y-auto">
        <Topbar title="GURUHLAR" />

        {groups.length === 0 ? (
          <p className="p-5 text-gray-500">Guruhlar mavjud emas yoki yuklanmoqda...</p>
        ) : (
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {groups.map((group) => (
              <div
                key={group.id}
                onClick={() =>
                  navigate(`/guruhlar/${group.id}`, { state: group })
                }
                className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition"
              >
                <h2 className="font-medium text-lg">{group.group_name}</h2>

                <p className="text-sm text-gray-600">
                  🕒 Aktiv: {formatDate(group.activated_at)}
                </p>

                <p className="text-sm text-gray-600">
                  ⏳ Amal qilish muddati: {formatDate(group.expires_at)}
                </p>

                <p className="text-sm text-gray-600">
                  ✅ Holati: {group.is_active ? "Faol" : "Faol emas"}
                </p>

                <p className="text-sm text-gray-600">
                  👨‍🏫 Teacher ID: {group.teacher}
                </p>
              </div>
            ))}
          </div>
        )}

        <AddButtonRight onClick={() => setOpenModal(true)} />
        <CreateGroupModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          refreshGroups={fetchGroups}
        />
      </main>
    </div>
  );
}