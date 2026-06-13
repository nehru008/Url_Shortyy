import { Crown, Link2, MousePointerClick } from "lucide-react";
import Card from "../components/common/Card.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import StatCard from "../components/common/StatCard.jsx";
import { TableSkeleton } from "../components/common/Skeleton.jsx";
import ClicksChart from "../components/analytics/ClicksChart.jsx";
import { useUrls } from "../hooks/useUrls.js";
import { getShortUrl, truncateMiddle } from "../utils/formatters.js";

export default function Analytics() {
  const { error, isLoading, stats, urls } = useUrls();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Analytics</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Track total links, clicks, and your strongest performers.</p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard icon={Link2} label="Total URLs created" value={stats.totalUrls} />
        <StatCard icon={MousePointerClick} label="Total clicks" value={stats.totalClicks} />
        <StatCard
          icon={Crown}
          label="Top link clicks"
          value={stats.mostClicked?.clicks || 0}
          helper={stats.mostClicked ? truncateMiddle(getShortUrl(stats.mostClicked), 30) : "No top link yet"}
        />
      </section>

      <Card>
        <h3 className="mb-4 text-lg font-bold text-slate-950 dark:text-white">Clicks by link</h3>
        {isLoading ? <TableSkeleton rows={6} /> : error ? <EmptyState title="Could not load analytics" description={error} /> : <ClicksChart urls={stats.topUrls} />}
      </Card>
    </div>
  );
}
