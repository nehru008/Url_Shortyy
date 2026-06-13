import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BarChart3, History, Home, Link2, LogOut, Menu, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import Button from "../components/common/Button.jsx";
import ThemeToggle from "../components/theme/ThemeToggle.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/shorten", label: "Shorten", icon: PlusCircle },
  { to: "/history", label: "History", icon: History },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
];

function SidebarContent({ onNavigate }) {
  return (
    <nav className="mt-8 space-y-1">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          className={({ isActive }) =>
            `focus-ring flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
              isActive
                ? "bg-brand-50 text-brand-700 dark:bg-emerald-950 dark:text-brand-500"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`
          }
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Signed out", "You have been logged out.");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 bg-white px-4 py-5 dark:border-slate-800 dark:bg-slate-900 lg:block">
        <div className="flex items-center gap-2 font-bold">
          <span className="rounded-lg bg-brand-600 p-2 text-white">
            <Link2 className="h-5 w-5" />
          </span>
          Url Shortyy
        </div>
        <SidebarContent />
        <div className="absolute bottom-5 left-4 right-4">
          <div className="mb-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
            <p className="truncate text-sm font-semibold">{user?.fullName || user?.username || "User"}</p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
          </div>
          <Button className="w-full" icon={LogOut} variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </aside>

      {isOpen ? (
        <div className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden" onClick={() => setIsOpen(false)}>
          <aside
            className="h-full w-80 max-w-[85vw] border-r border-slate-200 bg-white px-4 py-5 dark:border-slate-800 dark:bg-slate-900"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold">
                <span className="rounded-lg bg-brand-600 p-2 text-white">
                  <Link2 className="h-5 w-5" />
                </span>
                Url Shortyy
              </div>
              <Button icon={X} variant="ghost" onClick={() => setIsOpen(false)} aria-label="Close menu" />
            </div>
            <SidebarContent onNavigate={() => setIsOpen(false)} />
          </aside>
        </div>
      ) : null}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Button icon={Menu} variant="secondary" className="lg:hidden" onClick={() => setIsOpen(true)} aria-label="Open menu" />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-500">Workspace</p>
              <h1 className="truncate text-lg font-bold">Welcome back, {user?.fullName || user?.username || "there"}</h1>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <ThemeToggle />
              <Button icon={LogOut} variant="ghost" className="hidden sm:inline-flex" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
