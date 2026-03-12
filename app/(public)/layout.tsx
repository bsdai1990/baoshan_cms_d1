import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";
import { getSettingsMap } from "@/lib/cms-data";
import { getNavItems } from "@/lib/nav-data";

export const dynamic = "force-dynamic";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settingsMap, navItems] = await Promise.all([
    getSettingsMap(),
    getNavItems({ visibleOnly: true }),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header settings={settingsMap} navItems={navItems} />
      <main className="flex-grow">{children}</main>
      <Footer settings={settingsMap} navItems={navItems} />
    </div>
  );
}
