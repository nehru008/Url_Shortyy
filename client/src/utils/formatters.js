export const formatDate = (value) => {
  if (!value) return "Unknown";
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

export const compactNumber = (value) =>
  new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(Number(value || 0));

export const getShortUrl = (item) => {
  if (item?.shortUrl) return item.shortUrl;
  if (!item?.shortCode) return "";
  const base = import.meta.env.VITE_PUBLIC_SHORT_URL_BASE || window.location.origin;
  return `${base.replace(/\/$/, "")}/${item.shortCode}`;
};

export const truncateMiddle = (value = "", max = 58) => {
  if (value.length <= max) return value;
  const half = Math.floor((max - 3) / 2);
  return `${value.slice(0, half)}...${value.slice(-half)}`;
};
