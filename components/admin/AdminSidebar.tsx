"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Globe,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Newspaper,
  Package,
  RefreshCw,
  Settings,
} from "lucide-react";

import { requestAdmin } from "@/lib/admin-api";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/news", icon: Newspaper, label: "News" },
  { href: "/admin/banners", icon: ImageIcon, label: "Banners" },
  { href: "/admin/contacts", icon: MessageSquare, label: "Messages" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
  { href: "/admin/snapshot", icon: RefreshCw, label: "Snapshot" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await requestAdmin("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-56 bg-gray-900 text-gray-300 flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">B</span>
          </div>
          <div>
            <div className="text-white font-semibold text-sm">Baoshan Optical</div>
            <div className="text-xs text-gray-500">CMS Admin</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
              }`}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-700 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition-colors"
        >
          <Globe size={16} />
          <span>View Website</span>
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition-colors"
        >
          <LogOut size={16} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
