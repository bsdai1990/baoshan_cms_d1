"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/types";

export default function Header({
  settings,
  navItems,
}: {
  settings: Record<string, string | null>;
  navItems: NavItem[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const siteName = settings.site_name ?? "Baoshan Optical";
  const tagline = settings.site_tagline ?? "";
  const visibleNavItems = navItems.filter((item) => item.is_visible);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">Optical</span>
            </div>
            <div>
              <div className="font-bold text-blue-800 text-lg leading-tight">
                {siteName}
              </div>
              {tagline && (
                <div className="text-xs text-gray-500 leading-tight">
                  {tagline}
                </div>
              )}
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            {visibleNavItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-gray-700 hover:text-blue-700 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-2">
          {visibleNavItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="block py-2 text-gray-700 hover:text-blue-700 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block mt-2 bg-blue-700 text-white px-4 py-2 rounded-md text-center text-sm font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Get Quote
          </Link>
        </div>
      )}
    </header>
  );
}

