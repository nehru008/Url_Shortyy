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

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8004/api/v1";
  const shortUrlBase = import.meta.env.VITE_PUBLIC_SHORT_URL_BASE || `${apiBaseUrl.replace(/\/$/, "")}/url`;

  return `${shortUrlBase.replace(/\/$/, "")}/${item.shortCode}`;
};

export const truncateMiddle = (value = "", max = 58) => {
  if (value.length <= max) return value;
  const half = Math.floor((max - 3) / 2);
  return `${value.slice(0, half)}...${value.slice(-half)}`;
};
