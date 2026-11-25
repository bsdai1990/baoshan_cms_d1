import type { Metadata } from "next";

import SnapshotTriggerButton from "@/components/admin/SnapshotTriggerButton";
import { publicDataGeneratedAt } from "@/lib/public-data";

export const metadata: Metadata = { title: "Snapshot - Admin" };

export default function SnapshotPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Static Snapshot</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl space-y-6">
        <div>
          <h2 className="font-semibold text-gray-900 mb-2">Generate storefront snapshot</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            The public storefront is statically generated for faster browsing. After you add or edit products,
            articles, banners, navigation, or site settings, click the button below to regenerate the public
            data snapshot and deploy the latest storefront.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
          Current bundled snapshot time: <span className="font-medium text-gray-900">{publicDataGeneratedAt}</span>
        </div>

        <SnapshotTriggerButton />

        <div className="border-t pt-4 text-xs text-gray-400 leading-relaxed">
          This action triggers GitHub Actions. The job usually takes a few minutes. If configuration is missing,
          the button will show the required setup instructions.
        </div>
      </div>
    </div>
  );
}
