import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Analytics from "./pages/Analytics.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import History from "./pages/History.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Register from "./pages/Register.jsx";
import Shortener from "./pages/Shortener.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shorten" element={<Shortener />} />
          <Route path="/history" element={<History />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
