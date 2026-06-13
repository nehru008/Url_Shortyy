export default function Input({ className = "", error, label, ...props }) {
  return (
    <label className="block">
      {label ? <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span> : null}
      <input
        className={`focus-ring w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-white ${className}`}
        {...props}
      />
      {error ? <span className="mt-1.5 block text-sm text-rose-600 dark:text-rose-400">{error}</span> : null}
    </label>
  );
}
