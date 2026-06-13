import { Check, Copy } from "lucide-react";
import { useState } from "react";
import Button from "./Button.jsx";

export default function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Button icon={copied ? Check : Copy} variant="secondary" onClick={copy} disabled={!value}>
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}
