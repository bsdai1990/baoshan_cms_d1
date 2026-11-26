import type { Metadata } from "next";

import ProductForm from "@/components/admin/ProductForm";
import { getProductCategories } from "@/lib/cms-data";

export const metadata: Metadata = { title: "添加产品 - 后台" };

export default async function NewProductPage() {
  const categories = await getProductCategories();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">添加产品</h1>
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl"><ProductForm categories={categories} /></div>
    </div>
  );
}

