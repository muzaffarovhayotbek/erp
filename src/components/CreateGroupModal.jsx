import { useState } from "react";
import { apiFetch } from "../context/api";

export default function CreateGroupModal({ isOpen, onClose, refreshGroups }) {
  const [groupName, setGroupName] = useState("");
  const [activatedAt, setActivatedAt] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!groupName || !activatedAt || !expiresAt) {
      alert("Iltimos barcha maydonlarni to‘ldiring");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("access");

      const res = await apiFetch("api/groups/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          group_name: groupName,
          is_active: true,       // default true
          activated_at: activatedAt,
          expires_at: expiresAt,
          teacher: 1,            // hozir default, keyin auth user
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Server xatosi");
      }

      // Success
      setGroupName("");
      setActivatedAt("");
      setExpiresAt("");
      onClose();
      refreshGroups();
    } catch (err) {
      console.error("Guruh yaratishda xatolik:", err);
      alert("Xatolik yuz berdi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* overlay */}
      <div onClick={onClose} className="absolute inset-0 bg-black/40"></div>

      {/* modal */}
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Guruh yaratish</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Guruh nomi"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="datetime-local"
            value={activatedAt}
            onChange={(e) => setActivatedAt(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
            disabled={loading}
          >
            Bekor qilish
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Yuklanmoqda..." : "Saqlash"}
          </button>
        </div>
      </div>
    </div>
  );  
}