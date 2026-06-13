import { Link } from "react-router-dom";
import { Link2 } from "lucide-react";

export default function EmptyState({
  actionHref,
  actionLabel = "Create short URL",
  description = "Create your first short link to see it here.",
  icon: Icon = Link2,
  title = "Nothing here yet",
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center dark:border-slate-700 dark:bg-slate-900/60">
      <div className="mb-4 rounded-full bg-white p-3 text-brand-600 shadow-sm dark:bg-slate-800 dark:text-brand-500">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-300">{description}</p>
      {actionHref ? (
        <Link
          className="focus-ring mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
          to={actionHref}
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
