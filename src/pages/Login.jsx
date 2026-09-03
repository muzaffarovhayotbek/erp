
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfiGermanLogo from "../assets/logo_erp.jpg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            username: username.trim(),
            password: password,
          }),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        throw new Error("Serverdan noto'g'ri javob keldi");
      }

      console.log("Login status:", response.status);
      console.log("Login response:", data);

      if (!response.ok) {
        const message =
          data.detail ||
          data.message ||
          data.error ||
          data.non_field_errors?.[0] ||
          data.username?.[0] ||
          data.password?.[0] ||
          "Login yoki parol xato";

        throw new Error(message);
      }

      // Django SimpleJWT odatda access qaytaradi
      if (!data.access) {
        console.error("Access token topilmadi:", data);
        throw new Error("Server access token yubormadi");
      }

      // Tokenlarni saqlash
      localStorage.setItem("access", data.access);

      if (data.refresh) {
        localStorage.setItem("refresh", data.refresh);
      }

      // AuthContext
      login(data.access);

      // Bosh sahifaga o'tish
      navigate("/", { replace: true });
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      if (err.name === "TypeError") {
        setError(
          "Serverga ulanib bo'lmadi. Django server ishlayotganini tekshiring."
        );
      } else {
        setError(err.message || "Login qilishda xatolik yuz berdi");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">

        <div className="flex flex-col md:flex-row">

          {/* RASM */}
          <div className="hidden md:flex md:w-1/2">
            <img
              src={ProfiGermanLogo}
              alt="Profi German"
              className="w-full h-full object-cover"
            />
          </div>

          {/* LOGIN */}
          <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Login
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Hisobingizga kirish uchun login va parolingizni kiriting.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* USERNAME */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  autoComplete="username"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>

              {/* ERROR */}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Kirish..." : "Kirish"}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
