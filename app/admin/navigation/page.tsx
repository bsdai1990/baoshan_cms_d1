"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, Eye, EyeOff } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  sort_order: number;
  is_visible: boolean;
}

type FormItem = Omit<NavItem, "id" | "sort_order"> & { id?: string };

export default function NavigationPage() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [formItem, setFormItem] = useState<FormItem>({
    label: "",
    href: "",
    is_visible: true,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadNavItems();
  }, []);

  const loadNavItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/navigation");
      if (res.ok) {
        const data = await res.json();
        setNavItems(data);
      }
    } catch (error) {
      console.error("Error loading nav items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formItem.label || !formItem.href) return;

    setSubmitting(true);
    try {
      const url = editingId
        ? `/api/admin/navigation/${editingId}`
        : "/api/admin/navigation";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formItem),
      });

      if (res.ok) {
        setFormItem({ label: "", href: "", is_visible: true });
        setEditingId(null);
        loadNavItems();
      }
    } catch (error) {
      console.error("Error saving nav item:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item: NavItem) => {
    setFormItem({
      id: item.id,
      label: item.label,
      href: item.href,
      is_visible: item.is_visible,
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this navigation item?")) return;

    try {
      const res = await fetch(`/api/admin/navigation/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        loadNavItems();
      }
    } catch (error) {
      console.error("Error deleting nav item:", error);
    }
  };

  const handleToggleVisibility = async (id: string, is_visible: boolean) => {
    const item = navItems.find((i) => i.id === id);
    if (!item) return;

    try {
      const res = await fetch(`/api/admin/navigation/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label: item.label,
          href: item.href,
          sort_order: item.sort_order,
          is_visible: !is_visible,
        }),
      });
      if (res.ok) {
        loadNavItems();
      }
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  const moveItem = async (id: string, direction: "up" | "down") => {
    const index = navItems.findIndex((i) => i.id === id);
    if (index === -1) return;

    const newNavItems = [...navItems];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newNavItems.length) return;

    // Swap sort orders
    const temp = newNavItems[index].sort_order;
    newNavItems[index].sort_order = newNavItems[targetIndex].sort_order;
    newNavItems[targetIndex].sort_order = temp;

    // Swap positions
    [newNavItems[index], newNavItems[targetIndex]] = [
      newNavItems[targetIndex],
      newNavItems[index],
    ];

    try {
      const res = await fetch("/api/admin/navigation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: newNavItems[index].id,
          sort_order: newNavItems[index].sort_order,
        }),
      });

      const res2 = await fetch("/api/admin/navigation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: newNavItems[targetIndex].id,
          sort_order: newNavItems[targetIndex].sort_order,
        }),
      });

      if (res.ok && res2.ok) {
        setNavItems(newNavItems);
      }
    } catch (error) {
      console.error("Error reordering:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Navigation</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage site navigation menu items
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Navigation Item" : "Add New Navigation Item"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Label
              </label>
              <input
                type="text"
                value={formItem.label}
                onChange={(e) =>
                  setFormItem({ ...formItem, label: e.target.value })
                }
                placeholder="e.g., Products"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL
              </label>
              <input
                type="text"
                value={formItem.href}
                onChange={(e) =>
                  setFormItem({ ...formItem, href: e.target.value })
                }
                placeholder="e.g., /products"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formItem.is_visible}
                onChange={(e) =>
                  setFormItem({ ...formItem, is_visible: e.target.checked })
                }
                className="rounded"
              />
              <span className="text-sm text-gray-700">Visible</span>
            </label>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting
                ? "Saving..."
                : editingId
                ? "Update"
                : "Add Item"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setFormItem({ label: "", href: "", is_visible: true });
                  setEditingId(null);
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Navigation Items List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Current Navigation</h2>
        </div>
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : navItems.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No navigation items yet
          </div>
        ) : (
          <div className="divide-y">
            {navItems.map((item, index) => (
              <div
                key={item.id}
                className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveItem(item.id, "up")}
                      disabled={index === 0}
                      className="text-gray-400 hover:text-blue-600 disabled:opacity-30"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      onClick={() => moveItem(item.id, "down")}
                      disabled={index === navItems.length - 1}
                      className="text-gray-400 hover:text-blue-600 disabled:opacity-30"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.label}</div>
                    <div className="text-sm text-gray-500">{item.href}</div>
                  </div>
                  <button
                    onClick={() => handleToggleVisibility(item.id, item.is_visible)}
                    className="p-2 text-gray-400 hover:text-blue-600"
                    title={item.is_visible ? "Hide" : "Show"}
                  >
                    {item.is_visible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm px-3 py-1 rounded hover:bg-blue-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
