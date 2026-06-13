import { Link, Navigate, Outlet } from "react-router-dom";
import { Link2 } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import ThemeToggle from "../components/theme/ThemeToggle.jsx";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link to="/login" className="focus-ring inline-flex items-center gap-2 rounded-lg font-bold">
          <span className="rounded-lg bg-brand-600 p-2 text-white">
            <Link2 className="h-5 w-5" />
          </span>
          Url Shortyy
        </Link>
        <ThemeToggle />
      </header>
      <section className="mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-6xl items-center gap-10 px-4 pb-10 sm:px-6 lg:grid-cols-[1fr_440px]">
        <div className="hidden lg:block">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-500">Link management</p>
          <h1 className="mt-4 max-w-xl text-5xl font-bold leading-tight text-slate-950 dark:text-white">
            Short links, click insight, and history in one calm workspace.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 dark:text-slate-300">
            Sign in to create branded-looking short URLs, track usage, and keep your links organized across devices.
          </p>
        </div>
        <Outlet />
      </section>
    </main>
  );
}
