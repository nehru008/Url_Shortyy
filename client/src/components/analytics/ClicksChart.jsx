import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import EmptyState from "../common/EmptyState.jsx";

export default function ClicksChart({ urls }) {
  const data = urls
    .filter((item) => Number(item.clicks || 0) > 0)
    .slice(0, 8)
    .map((item) => ({
      name: item.shortCode || "Link",
      clicks: Number(item.clicks || 0),
    }));

  if (!data.length) {
    return <EmptyState title="No chart data yet" description="Links with clicks will appear in this chart." actionHref="/history" actionLabel="View history" />;
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
          <Tooltip />
          <Bar dataKey="clicks" fill="#059669" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
