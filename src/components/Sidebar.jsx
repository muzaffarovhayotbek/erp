import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from"../assets/logo_erp.jpg"

export default function Sidebar() {
  const { logout } = useAuth();
  const { pathname } = useLocation();
  function HandleLogin(){
    useNavigate('/login')
  }
  const menu = [
    { name: "Guruhlar", path: "/" },
    { name: "O‘quvchilar", path: "/oquvchilar" },
    { name: "Sozlamalar", path: "/sozlamalar" },
  ];

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-200 flex flex-col z-40">
      
      {/* TOP */}
      <div className="p-5 hover" onClick={HandleLogin}>
        {/* <div className="w-14 h-14 rounded-full border border-gray-200 bg-gray-100" /> */}
        <img src={Logo} alt="" className="rounded-sm w-[120px] items-center bg-none" />
      </div>

      {/* MENU */}
      <nav className="px-3 space-y-1 flex-1 overflow-y-auto">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`block py-3 px-4 rounded-md text-sm transition ${
              pathname === item.path
                ? "bg-blue-50 border-l-4 border-blue-500 text-blue-600"
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* LOGOUT */}
      <div className="p-5">
        <button
          onClick={logout}
          className="w-full border border-gray-300 py-2 rounded-md text-sm hover:bg-red-50 hover:text-red-600 transition"
        >
          Chiqish
        </button>
      </div>
    </div>
  );
}
