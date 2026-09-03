import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import AddStudentModal from "../components/AddStudentModal";
import AddStudentButton from "../components/AddStudentButton";
import { apiFetch } from "../context/api";

export default function Oquvchilar() {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 Backenddan students olish
  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("access");
      if (!token) throw new Error("Access token mavjud emas");

      const res = await apiFetch("api/students/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Server xatosi: ${res.status}`);
      }

      const data = await res.json();
      console.log("Students API:", data);

      // DRF paginatsiya bo‘lsa results dan olamiz, aks holda array
      setStudents(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error("Students olishda xatolik:", err);
      setError(err.message);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 🔹 Search filter
  const filtered = students.filter((s) =>
    (s.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 ml-64">
        <Topbar title="O‘quvchilar" />

        <div className="pt-16 p-5">
          {/* SEARCH */}
          <div className="mb-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="O‘quvchi ismini yozing..."
              className="w-full md:w-1/3 border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* TABLE */}
          <div className="border border-gray-200 rounded bg-white overflow-x-auto">
            {/* Header */}
            <div className="grid grid-cols-12 p-3 text-xs text-gray-500 border-b font-semibold">
              <div className="col-span-1">#</div>
              <div className="col-span-4">Ism Familiya</div>
              <div className="col-span-3">Tel raqam</div>
              <div className="col-span-2">Guruh</div>
              <div className="col-span-2">Holat</div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="p-4 text-sm text-gray-400 text-center col-span-full">
                Yuklanmoqda...
              </div>
            )}

            {/* Error */}
            {error && !loading && (
              <div className="p-4 text-sm text-red-500 text-center col-span-full">
                {error}
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && filtered.length === 0 && (
              <div className="p-4 text-sm text-gray-400 text-center col-span-full">
                O‘quvchi topilmadi
              </div>
            )}

            {/* Students list */}
            {!loading &&
              !error &&
              filtered.map((s, i) => (
                <div
                  key={s.id}
                  className="grid grid-cols-12 p-3 text-sm border-b hover:bg-gray-50"
                >
                  <div className="col-span-1">{i + 1}</div>
                  <div className="col-span-4">{s.name ?? "—"}</div>
                  <div className="col-span-3">{s.phone ?? "—"}</div>
                  <div className="col-span-2">
                    <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                      {s.group_name ?? s.group ?? "—"}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        s.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {s.is_active === undefined
                        ? "—"
                        : s.is_active
                        ? "Aktiv"
                        : "Faol emas"}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          {/* + Tugma */}
          <AddStudentButton onClick={() => setOpenModal(true)} />

          {/* Modal */}
          <AddStudentModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            refreshStudents={fetchStudents} // modal qo‘shganda yangilash
          />
        </div>
      </div>
    </div>
  );
}