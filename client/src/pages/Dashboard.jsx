import { BarChart3, Crown, Link2, MousePointerClick } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button.jsx";
import Card from "../components/common/Card.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import StatCard from "../components/common/StatCard.jsx";
import { TableSkeleton } from "../components/common/Skeleton.jsx";
import UrlTable from "../components/urls/UrlTable.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useUrls } from "../hooks/useUrls.js";
import { getShortUrl, truncateMiddle } from "../utils/formatters.js";

export default function Dashboard() {
  const { user } = useAuth();
  const { error, isLoading, stats, urls } = useUrls();
  const recentUrls = urls.slice(0, 4);

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-lg bg-slate-950 p-6 text-white sm:flex-row sm:items-center dark:bg-slate-900">
        <div>
          <p className="text-sm font-semibold text-brand-500">Signed in as {user?.username || "user"}</p>
          <h2 className="mt-2 text-2xl font-bold">Manage every short link from one place.</h2>
        </div>
        <Button as={Link} icon={Link2} to="/shorten">
          Create link
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard icon={Link2} label="Total URLs" value={stats.totalUrls} />
        <StatCard icon={MousePointerClick} label="Total clicks" value={stats.totalClicks} />
        <StatCard
          icon={Crown}
          label="Most clicked"
          value={stats.mostClicked?.clicks || 0}
          helper={stats.mostClicked ? truncateMiddle(getShortUrl(stats.mostClicked), 32) : "No clicks yet"}
        />
      </section>

      <Card>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">Recent URLs</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Latest links created by your account.</p>
          </div>
          <Link className="text-sm font-semibold text-brand-700 dark:text-brand-500" to="/history">
            View all
          </Link>
        </div>
        {isLoading ? <TableSkeleton rows={4} /> : error ? <EmptyState icon={BarChart3} title="Could not load URLs" description={error} /> : <UrlTable urls={recentUrls} />}
      </Card>
    </div>
  );
}
