import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import Guruhlar from "./pages/Guruhlar";
import Oquvchilar from "./pages/Oquvchilar";
import Sozlamalar from "./pages/Sozlamalar";
import CardBatafsil from "./pages/Cardbatafsil";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Guruhlar />
            </ProtectedRoute>
          }
        />

        <Route path="/guruhlar/:id" element={<CardBatafsil />} />

        <Route
          path="/oquvchilar"
          element={
            <ProtectedRoute>
              <Oquvchilar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sozlamalar"
          element={
            <ProtectedRoute>
              <Sozlamalar />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}