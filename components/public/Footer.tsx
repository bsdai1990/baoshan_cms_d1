import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import type { NavItem, ProductCategory } from "@/types";

export default function Footer({
  settings,
  navItems,
  productCategories,
}: {
  settings: Record<string, string | null>;
  navItems: NavItem[];
  productCategories: ProductCategory[];
}) {
  const siteName = settings.site_name ?? "Baoshan Optical";
  const companyName = settings.company_name ?? siteName;
  const phone = settings.company_phone;
  const email = settings.company_email;
  const address = settings.company_address;
  const icpNumber = settings.icp_number;
  const description = settings.footer_description ?? "";
  const visibleNavItems = navItems.filter((item) => item.is_visible);
  const visibleCategories = productCategories.slice(0, 5);
  const hasMoreCategories = productCategories.length > 5;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">Optical</span>
              </div>
              <span className="text-white font-bold text-lg">{siteName}</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">{description}</p>
            <div className="space-y-2 text-sm">
              {phone && (
                <div className="flex items-center space-x-2">
                  <Phone size={14} className="text-blue-400" />
                  <span>{phone}</span>
                </div>
              )}
              {email && (
                <div className="flex items-center space-x-2">
                  <Mail size={14} className="text-blue-400" />
                  <span>{email}</span>
                </div>
              )}
              {address && (
                <div className="flex items-center space-x-2">
                  <MapPin size={14} className="text-blue-400" />
                  <span>{address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {visibleNavItems.slice(0, 4).map((item) => (
                <li key={item.id}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {visibleCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              {hasMoreCategories && (
                <li>
                  <Link href="/products" className="hover:text-white transition-colors">
                    More
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} {companyName}. All Rights Reserved.
            {icpNumber && (
              <span className="ml-2">
                <a
                  href="https://beian.miit.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  {icpNumber}
                </a>
              </span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
