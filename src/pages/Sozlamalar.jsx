import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Sozlamalar() {
  return (
    <div className="flex">
      <Sidebar />

      {/* CONTENT */}
      <div className="flex-1 ml-64">
        <Topbar title="Sozlamalar" />

        {/* BODY */}
        <div className="pt-16 p-5 bg-gray-50 min-h-screen">
          <div className="border border-gray-200 rounded bg-white p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Bildirishnomalar</div>
              <div className="w-12 h-6 rounded-full bg-gray-200 relative">
                <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white"></div>
              </div>
            </div>

            <div className="flex gap-3">
              <input
                className="w-full border border-gray-200 rounded p-2 text-sm"
                value="Id: 123456"
                readOnly
              />
              <button className="bg-white border border-gray-200 rounded px-4">
                O'zgartirish
              </button>
            </div>

            <div className="flex gap-3">
              <input
                className="w-full border border-gray-200 rounded p-2 text-sm"
                value="Password: profilgeman"
                readOnly
              />
              <button className="bg-white border border-gray-200 rounded px-4">
                O'zgartirish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
