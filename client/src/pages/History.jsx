import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import Card from "../components/common/Card.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import Input from "../components/common/Input.jsx";
import { TableSkeleton } from "../components/common/Skeleton.jsx";
import UrlTable from "../components/urls/UrlTable.jsx";
import { useUrls } from "../hooks/useUrls.js";
import { getShortUrl } from "../utils/formatters.js";

export default function History() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const { error, isLoading, urls } = useUrls();

  const filteredUrls = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return urls.filter((item) => {
      const matchesSearch =
        !normalized ||
        item.originalUrl?.toLowerCase().includes(normalized) ||
        getShortUrl(item).toLowerCase().includes(normalized) ||
        item.shortCode?.toLowerCase().includes(normalized);
      const matchesFilter = filter === "all" || (filter === "clicked" ? Number(item.clicks || 0) > 0 : Number(item.clicks || 0) === 0);
      return matchesSearch && matchesFilter;
    });
  }, [filter, query, urls]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">URL history</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Search, filter, and copy previously generated links.</p>
      </div>

      <Card>
        <div className="mb-5 grid gap-3 md:grid-cols-[1fr_220px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-9 h-4 w-4 text-slate-400" />
            <Input className="pl-9" label="Search URLs" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search original or short URL" />
          </div>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Filter</span>
            <select
              className="focus-ring w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              <option value="all">All URLs</option>
              <option value="clicked">Clicked</option>
              <option value="unclicked">No clicks</option>
            </select>
          </label>
        </div>
        {isLoading ? <TableSkeleton /> : error ? <EmptyState title="Could not load history" description={error} /> : <UrlTable urls={filteredUrls} />}
      </Card>
    </div>
  );
}
