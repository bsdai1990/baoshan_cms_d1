import type { Metadata } from "next";

import ArticleForm from "@/components/admin/ArticleForm";

export const metadata: Metadata = { title: "新建文章 - 后台" };

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">新建文章</h1>
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl"><ArticleForm /></div>
    </div>
  );
}

