import { useLocation, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function CardBatafsil() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  // agar refresh bo‘lsa state yo‘qoladi
  if (!state) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-500">
          Ma’lumot topilmadi (refresh bo‘lgan bo‘lishi mumkin)
        </p>
        <button
          onClick={() => navigate("/guruhlar")}
          className="mt-4 text-blue-600"
        >
          Guruhlarga qaytish
        </button>
      </div>
    );
  }

  const group = state;

  // fake o‘quvchilar (keyin backend dan keladi)
  const students = Array.from({ length: group.studentsCount }).map((_, i) => ({
    id: i + 1,
    name: `O‘quvchi ${i + 1}`,
    phone: `99890${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")}`,
    status: i % 2 === 0 ? "Active" : "Inactive",
  }));

  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-64 flex-1 h-screen overflow-y-auto bg-gray-50">
        <Topbar title={`GURUH: ${group.name}`} />

        <div className="p-5 space-y-6">
          {/* Guruh ma’lumotlari */}
          <div className="bg-white rounded-lg p-5">
            <h2 className="text-lg font-semibold mb-3">Asosiy ma’lumotlar</h2>
            <p>🆔 ID: {id}</p>
            <p>🕘 Dars vaqti: {group.time}</p>
            <p>📅 Boshlangan: {group.startDate}</p>
            <p>👥 O‘quvchilar: {group.studentsCount}</p>
          </div>

          {/* O‘quvchilar jadvali */}
          <div className="bg-white rounded-lg p-5 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-3">O‘quvchilar ro‘yxati</h2>

            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Ism</th>
                  <th className="px-4 py-2 text-left">Telefon</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="px-4 py-2">{student.id}</td>
                    <td className="px-4 py-2">{student.name}</td>
                    <td className="px-4 py-2">{student.phone}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
