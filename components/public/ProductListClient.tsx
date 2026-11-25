"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

import type { Product, ProductCategory } from "@/types";

export default function ProductListClient({
  categories,
  products,
}: {
  categories: ProductCategory[];
  products: Product[];
}) {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category") ?? undefined;
  const filteredProducts = categorySlug
    ? products.filter((product) => product.category?.slug === categorySlug)
    : products;
  const activeCategory = categories.find((category) => category.slug === categorySlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="font-semibold text-gray-900 mb-3">Product Categories</h2>
            <nav className="space-y-1">
              <Link
                href="/products"
                className={`block px-3 py-2 rounded text-sm transition-colors ${
                  !categorySlug ? "bg-blue-700 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                All Products
                <span className="ml-1 text-xs opacity-70">({products.length})</span>
              </Link>
              {categories.map((category) => {
                const count = products.filter(
                  (product) => product.category?.slug === category.slug
                ).length;

                return (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.slug}`}
                    className={`block px-3 py-2 rounded text-sm transition-colors ${
                      categorySlug === category.slug
                        ? "bg-blue-700 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category.name}
                    <span className="ml-1 text-xs opacity-70">({count})</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-gray-900">
              {activeCategory ? activeCategory.name : "All Products"}
              <span className="ml-2 text-sm text-gray-400 font-normal">
                {filteredProducts.length} products
              </span>
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="text-5xl mb-4">No Image</div>
              <p>No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div className="h-44 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        width={300}
                        height={176}
                        className="w-full h-44 object-cover"
                      />
                    ) : (
                      <div className="text-sm text-blue-300">No Image</div>
                    )}
                  </div>
                  <div className="p-4">
                    {product.category && (
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {product.category.name}
                      </span>
                    )}
                    <h3 className="font-semibold text-gray-900 mt-2 group-hover:text-blue-700 transition-colors">
                      {product.name}
                    </h3>
                    {product.summary && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {product.summary}
                      </p>
                    )}
                    <div className="mt-3 flex items-center text-blue-600 text-sm">
                      View Details <ArrowRight size={14} className="ml-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
