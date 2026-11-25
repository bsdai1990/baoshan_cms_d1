import type { Metadata } from "next";

import BannerManager from "@/components/admin/BannerManager";
import { getBanners } from "@/lib/cms-data";

export const metadata: Metadata = { title: "Banners - Admin" };

export default async function AdminBannersPage() {
  const banners = await getBanners();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Banners</h1>
      <BannerManager initialBanners={banners} />
    </div>
  );
}
