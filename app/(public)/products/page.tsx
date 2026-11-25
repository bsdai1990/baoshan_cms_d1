import { Suspense } from "react";
import type { Metadata } from "next";

import ProductListClient from "@/components/public/ProductListClient";
import {
  getPublicProductCategories as getProductCategories,
  getPublicProducts as getProducts,
} from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore our full range of optical communication products, including optical transceivers, AOC cables, DAC cables and related network solutions.",
};

export const revalidate = false;

export default function ProductsPage() {
  const categories = getProductCategories();
  const products = getProducts({ publishedOnly: true });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-blue-200 mt-2">
            Full range of optical communication products for multiple network applications
          </p>
        </div>
      </div>

      <Suspense fallback={null}>
        <ProductListClient categories={categories} products={products} />
      </Suspense>
    </div>
  );
}
