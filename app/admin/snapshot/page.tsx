import type { Metadata } from "next";

import SnapshotTriggerButton from "@/components/admin/SnapshotTriggerButton";
import { publicDataGeneratedAt } from "@/lib/public-data";

export const metadata: Metadata = { title: "静态快照 - 后台" };

export default function SnapshotPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">静态快照</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl space-y-6">
        <div>
          <h2 className="font-semibold text-gray-900 mb-2">生成前台静态快照</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            前台页面使用静态化以提升访问速度。添加或修改产品、文章、横幅、导航或网站设置后，请点击下面按钮重新生成前台数据快照并部署最新页面。
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
          当前打包快照时间： <span className="font-medium text-gray-900">{publicDataGeneratedAt}</span>
        </div>

        <SnapshotTriggerButton />

        <div className="border-t pt-4 text-xs text-gray-400 leading-relaxed">
          此操作会触发 GitHub Actions，通常需要几分钟完成。如果配置缺失，按钮会显示需要补充的配置说明。
        </div>
      </div>
    </div>
  );
}

