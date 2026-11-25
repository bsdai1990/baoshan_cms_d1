import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";
import { getPublicNavItems, getPublicSettingsMap } from "@/lib/public-data";




export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settingsMap, navItems] = await Promise.all([
    getPublicSettingsMap(),
    getPublicNavItems({ visibleOnly: true }),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header settings={settingsMap} navItems={navItems} />
      <main className="flex-grow">{children}</main>
      <Footer settings={settingsMap} navItems={navItems} />
    </div>
  );
}

