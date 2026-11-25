"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";

import { requestAdmin } from "@/lib/admin-api";
import type { Banner } from "@/types";

type BannerForm = Omit<Banner, "id" | "created_at" | "updated_at">;

const emptyForm: BannerForm = {
  title: "",
  subtitle: "",
  image_url: "",
  link_url: "",
  link_text: "",
  sort_order: 0,
  is_active: true,
};

export default function BannerManager({ initialBanners }: { initialBanners: Banner[] }) {
  const [banners, setBanners] = useState(initialBanners);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<BannerForm>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleEdit = (banner: Banner) => {
    setEditingId(banner.id);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle ?? "",
      image_url: banner.image_url,
      link_url: banner.link_url ?? "",
      link_text: banner.link_text ?? "",
      sort_order: banner.sort_order,
      is_active: banner.is_active,
    });
    setShowForm(true);
    setError(null);
  };

  const handleNew = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
    setError(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((previous) => ({ ...previous, [name]: type === "checkbox" ? checked : value }));
  };

  const refreshList = async () => router.refresh();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      title: formData.title,
      subtitle: formData.subtitle || null,
      image_url: formData.image_url,
      link_url: formData.link_url || null,
      link_text: formData.link_text || null,
      sort_order: Number(formData.sort_order),
      is_active: formData.is_active,
    };

    try {
      const response = await requestAdmin<{ data: Banner }>(
        editingId ? `/api/admin/banners/${editingId}` : "/api/admin/banners",
        { method: editingId ? "PATCH" : "POST", body: JSON.stringify(payload) }
      );

      setShowForm(false);
      setEditingId(null);
      setFormData(emptyForm);
      setBanners((previous) => {
        if (!response.data) return previous;
        const next = editingId
          ? previous.map((banner) => (banner.id === editingId ? response.data : banner))
          : [...previous, response.data];
        return next.sort((left, right) => left.sort_order - right.sort_order);
      });
      await refreshList();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Save failed. Please try again later.");
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    try {
      await requestAdmin(`/api/admin/banners/${id}`, { method: "DELETE" });
      setBanners((previous) => previous.filter((banner) => banner.id !== id));
      await refreshList();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Delete failed. Please try again later.");
    }
  };

  const handleToggleActive = async (banner: Banner) => {
    try {
      const response = await requestAdmin<{ data: Banner }>(`/api/admin/banners/${banner.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: banner.title,
          subtitle: banner.subtitle,
          image_url: banner.image_url,
          link_url: banner.link_url,
          link_text: banner.link_text,
          sort_order: banner.sort_order,
          is_active: !banner.is_active,
        }),
      });

      setBanners((previous) => previous.map((item) => (item.id === banner.id ? response.data : item)));
      await refreshList();
    } catch (toggleError) {
      setError(toggleError instanceof Error ? toggleError.message : "Status update failed. Please try again later.");
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-medium text-gray-900">{banners.length} banners</span>
          <button onClick={handleNew} className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors">
            <Plus size={15} />
            Add Banner
          </button>
        </div>
        {banners.length === 0 ? (
          <div className="py-10 text-center text-gray-400">No banners yet. Click “Add Banner” to create one.</div>
        ) : (
          <div className="divide-y">
            {banners.map((banner) => (
              <div key={banner.id} className="flex items-center gap-4 p-4">
                <div className="w-20 h-12 bg-gradient-to-r from-blue-200 to-cyan-200 rounded flex-shrink-0 flex items-center justify-center text-xs text-blue-500 overflow-hidden">
                  {banner.image_url && !banner.image_url.startsWith("/") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover" />
                  ) : (
                    "Image"
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-gray-900">{banner.title}</div>
                  {banner.subtitle && <div className="text-xs text-gray-400 truncate">{banner.subtitle}</div>}
                  <div className="text-xs text-gray-400">Sort: {banner.sort_order}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleToggleActive(banner)} className={`p-1.5 rounded ${banner.is_active ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"}`} title={banner.is_active ? "Disable" : "Enable"}>
                    {banner.is_active ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                  <button onClick={() => handleEdit(banner)} className="p-1.5 rounded text-blue-600 hover:bg-blue-50" title="Edit">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => handleDelete(banner.id)} className="p-1.5 rounded text-red-500 hover:bg-red-50" title="Delete">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl">
          <h2 className="font-semibold text-gray-900 mb-4">{editingId ? "Edit Banner" : "Add Banner"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input type="text" name="subtitle" value={formData.subtitle ?? ""} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL <span className="text-red-500">*</span></label>
              <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} required placeholder="/images/banner.jpg or https://..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                <input type="text" name="link_url" value={formData.link_url ?? ""} onChange={handleChange} placeholder="/products" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <input type="text" name="link_text" value={formData.link_text ?? ""} onChange={handleChange} placeholder="View Products" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                <input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange} min={0} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <label className="flex items-center gap-2 mt-6 cursor-pointer">
                <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
            </div>

            {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">{error}</div>}

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={loading} className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold px-5 py-2 rounded-lg transition-colors">
                {loading ? "Saving..." : editingId ? "Save Changes" : "Create Banner"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2 rounded-lg transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
