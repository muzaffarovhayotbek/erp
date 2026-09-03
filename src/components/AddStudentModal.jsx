import { useState } from "react";
import { X } from "lucide-react";
import { apiFetch } from "../context/api";

export default function AddStudentModal({
  isOpen,
  onClose,
  refreshStudents,
  groupId,
}) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("access");
      const userId = localStorage.getItem("userId"); // sen saqlayotgan id

      const payload = {
        full_name: fullName,
        phone: phone,
        user: Number(userId),
        group: Number(groupId),
      };

      const res = await apiFetch("api/students/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(payload),
});

const data = await res.json();

if (!res.ok) {
  console.log("BACKEND ERROR:", data); // 🔥 MUHIM
  setError(JSON.stringify(data));
  return;
}

      if (!res.ok) {
        const err = await res.json();
        throw new Error(JSON.stringify(err));
      }

      // tozalash
      setFullName("");
      setPhone("");

      refreshStudents();
      onClose();
    } catch (err) {
      setError("Ma'lumot noto‘g‘ri yoki server xatosi");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/40"></div>

      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
        >
          <X />
        </button>

        <h2 className="text-lg font-semibold mb-4">Yangi o‘quvchi qo‘shish</h2>

        <div className="space-y-3">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ism Familiya"
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefon raqami"
            className="w-full border rounded-lg px-3 py-2"
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
            disabled={loading}
          >
            Bekor qilish
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? "Yuklanmoqda..." : "Saqlash"}
          </button>
        </div>
      </div>
    </div>
  );
}