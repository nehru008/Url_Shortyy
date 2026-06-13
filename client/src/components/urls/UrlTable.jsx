import { ExternalLink } from "lucide-react";
import CopyButton from "../common/CopyButton.jsx";
import EmptyState from "../common/EmptyState.jsx";
import { formatDate, getShortUrl, truncateMiddle } from "../../utils/formatters.js";

export default function UrlTable({ urls }) {
  if (!urls.length) {
    return <EmptyState actionHref="/shorten" title="No matching URLs" description="Create a link or adjust your filters." />;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">Original URL</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">Short URL</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">Clicks</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">Created</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-600 dark:text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
            {urls.map((item) => {
              const shortUrl = getShortUrl(item);
              return (
                <tr key={item._id || item.shortCode}>
                  <td className="max-w-[320px] px-4 py-3">
                    <a
                      className="focus-ring inline-flex max-w-full items-center gap-2 rounded-md text-slate-700 hover:text-brand-700 dark:text-slate-200 dark:hover:text-brand-500"
                      href={item.originalUrl}
                      target="_blank"
                      rel="noreferrer"
                      title={item.originalUrl}
                    >
                      <span className="truncate">{truncateMiddle(item.originalUrl)}</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                    </a>
                  </td>
                  <td className="px-4 py-3 text-brand-700 dark:text-brand-500">{truncateMiddle(shortUrl, 36)}</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{item.clicks || 0}</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{formatDate(item.createdAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <CopyButton value={shortUrl} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
