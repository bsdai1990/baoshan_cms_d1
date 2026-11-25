import type { Metadata } from "next";

import SettingsForm from "@/components/admin/SettingsForm";
import { getSiteSettings } from "@/lib/cms-data";

export const metadata: Metadata = { title: "Settings - Admin" };

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
