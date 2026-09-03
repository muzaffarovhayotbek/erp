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
    const response = await fetch("/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Xatolik");
    }

    // ✅ Tokenlarni saqlash
    localStorage.setItem("access", data.access);

    // Agar AuthContext bo‘lsa
    login(data.access);

    // Bosh sahifaga
    navigate("/");
  } catch (err) {
    setError("Login yoki parol xato");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl transition-all duration-300">
        <div className="flex flex-col md:flex-row overflow-hidden rounded-2xl">

          {/* LEFT: RASM */}
          <div className="hidden md:flex w-1/2">
            <img
              src={ProfiGermanLogo}
              alt="Profi German"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT: INPUTLAR */}
          <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 active:scale-95 transition disabled:opacity-50"
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