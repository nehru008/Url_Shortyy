import { useCallback, useEffect, useMemo, useState } from "react";
import { messageFromError, urlApi } from "../services/api.js";

export function useUrls({ autoLoad = true } = {}) {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(autoLoad);
  const [error, setError] = useState("");

  const loadUrls = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await urlApi.history();
      setUrls(Array.isArray(data) ? data : []);
    } catch (requestError) {
      const message = messageFromError(requestError);
      if (requestError.response?.status === 404) {
        setUrls([]);
        setError("");
      } else {
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoLoad) loadUrls();
  }, [autoLoad, loadUrls]);

  const stats = useMemo(() => {
    const totalClicks = urls.reduce((sum, item) => sum + Number(item.clicks || 0), 0);
    const sortedByClicks = [...urls].sort((a, b) => Number(b.clicks || 0) - Number(a.clicks || 0));

    return {
      totalUrls: urls.length,
      totalClicks,
      mostClicked: sortedByClicks[0] || null,
      topUrls: sortedByClicks.slice(0, 6),
    };
  }, [urls]);

  return { error, isLoading, loadUrls, setUrls, stats, urls };
}
