"use client";

import { useState } from "react";
import { RefreshCw, ExternalLink } from "lucide-react";

import { requestAdmin } from "@/lib/admin-api";

type SnapshotResponse = {
  success: boolean;
  message: string;
  actionsUrl?: string;
};

export default function SnapshotTriggerButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SnapshotResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (!confirm("This will regenerate the public data snapshot and redeploy the website. Continue?")) {
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await requestAdmin<SnapshotResponse>("/api/admin/snapshot", {
        method: "POST",
        body: JSON.stringify({}),
      });
      setResult(response);
    } catch (triggerError) {
      setError(
        triggerError instanceof Error
          ? triggerError.message
          : "Failed to trigger snapshot generation."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
      >
        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        {loading ? "Starting..." : "Generate Snapshot & Deploy"}
      </button>

      {result && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
          <p className="font-medium">{result.message}</p>
          {result.actionsUrl && (
            <a
              href={result.actionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-green-700 underline"
            >
              View GitHub Actions <ExternalLink size={13} />
            </a>
          )}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}
