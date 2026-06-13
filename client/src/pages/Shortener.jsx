import { Link2 } from "lucide-react";
import { useState } from "react";
import Button from "../components/common/Button.jsx";
import Card from "../components/common/Card.jsx";
import CopyButton from "../components/common/CopyButton.jsx";
import Input from "../components/common/Input.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { messageFromError, urlApi } from "../services/api.js";
import { getShortUrl } from "../utils/formatters.js";
import { isValidHttpUrl } from "../utils/validators.js";

export default function Shortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setResult(null);

    if (!isValidHttpUrl(originalUrl)) {
      setError("Enter a valid URL that starts with http:// or https://.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await urlApi.shorten(originalUrl);
      setResult(data);
      toast.success("Short URL generated", "Your link is ready to share.");
      setOriginalUrl("");
    } catch (requestError) {
      setError(messageFromError(requestError));
    } finally {
      setIsLoading(false);
    }
  };

  const shortUrl = getShortUrl(result);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Create short URL</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Paste a destination URL and generate a compact link.</p>
      </div>

      <Card>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Original URL"
            placeholder="https://example.com/very/long/link"
            value={originalUrl}
            onChange={(event) => setOriginalUrl(event.target.value)}
            error={error}
          />
          <Button icon={Link2} isLoading={isLoading} type="submit">
            Generate short URL
          </Button>
        </form>
      </Card>

      {result ? (
        <Card>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Generated short URL</p>
          <div className="mt-3 flex flex-col gap-3 rounded-lg bg-slate-50 p-4 dark:bg-slate-800 sm:flex-row sm:items-center sm:justify-between">
            <a className="break-all font-semibold text-brand-700 dark:text-brand-500" href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
            <CopyButton value={shortUrl} />
          </div>
        </Card>
      ) : null}
    </div>
  );
}
