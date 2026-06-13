import { compactNumber } from "../../utils/formatters.js";
import Card from "./Card.jsx";

export default function StatCard({ icon: Icon, label, value, helper }) {
  return (
    <Card className="flex items-start gap-4">
      <div className="rounded-lg bg-brand-50 p-3 text-brand-700 dark:bg-emerald-950 dark:text-brand-500">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">{compactNumber(value)}</p>
        {helper ? <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helper}</p> : null}
      </div>
    </Card>
  );
}
