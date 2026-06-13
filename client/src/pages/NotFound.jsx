import { Link } from "react-router-dom";
import Button from "../components/common/Button.jsx";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-center dark:bg-slate-950">
      <div>
        <p className="text-sm font-semibold text-brand-700 dark:text-brand-500">404</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">Page not found</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">The route you opened does not exist.</p>
        <Button as={Link} className="mt-6" to="/dashboard">
          Back to dashboard
        </Button>
      </div>
    </main>
  );
}
