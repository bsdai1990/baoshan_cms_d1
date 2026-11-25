"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { requestAdmin } from "@/lib/admin-api";
import type { Product, ProductCategory } from "@/types";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/--+/g, "-");
}

export default function ProductForm({
  categories,
  product,
}: {
  categories: ProductCategory[];
  product?: Product;
}) {
  const isEdit = !!product;
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    category_id: product?.category_id ?? "",
    summary: product?.summary ?? "",
    description: product?.description ?? "",
    image_url: product?.image_url ?? "",
    specifications: product?.specifications
      ? JSON.stringify(product.specifications, null, 2)
      : "{\n}",
    is_featured: product?.is_featured ?? false,
    is_published: product?.is_published ?? true,
    sort_order: product?.sort_order ?? 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = event.target;
    const checked =
      type === "checkbox" ? (event.target as HTMLInputElement).checked : undefined;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "name" && !isEdit ? { slug: slugify(value) } : {}),
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    let specs = null;
    try {
      specs = JSON.parse(formData.specifications);
    } catch {
      setError("Invalid specifications JSON. Please enter valid JSON.");
      setLoading(false);
      return;
    }

    const payload = {
      name: formData.name,
      slug: formData.slug,
      category_id: formData.category_id || null,
      summary: formData.summary || null,
      description: formData.description || null,
      image_url: formData.image_url || null,
      specifications: specs,
      is_featured: formData.is_featured,
      is_published: formData.is_published,
      sort_order: Number(formData.sort_order),
    };

    try {
      await requestAdmin(
        isEdit ? `/api/admin/products/${product.id}` : "/api/admin/products",
        {
          method: isEdit ? "PATCH" : "POST",
          body: JSON.stringify(payload),
        }
      );
      router.push("/admin/products");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Save failed. Please try again later."
      );
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL Slug <span className="text-red-500">*</span>
          </label>
          <input type="text" name="slug" value={formData.slug} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
        <select name="category_id" value={formData.category_id} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">-- No Category --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
        <input type="text" name="summary" value={formData.summary} onChange={handleChange} placeholder="Short product description" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Details</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
        <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="/uploads/products/example.jpg or https://..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Specifications (JSON)</label>
        <textarea name="specifications" value={formData.specifications} onChange={handleChange} rows={6} placeholder={'{\n  "Data Rate": "10Gbps",\n  "Connector": "LC"\n}'} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
          <input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange} min={0} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex items-end gap-2 pb-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Featured Product</span>
          </label>
        </div>
        <div className="flex items-end gap-2 pb-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="is_published" checked={formData.is_published} onChange={handleChange} className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Published</span>
          </label>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">{error}</div>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Product"}
        </button>
        <button type="button" onClick={() => router.push("/admin/products")} className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
