export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-slate-200 dark:bg-slate-800 ${className}`} />;
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} className="h-12 w-full" />
      ))}
    </div>
  );
}
