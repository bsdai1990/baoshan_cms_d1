import { NextRequest, NextResponse } from "next/server";
import { updateNavItem, deleteNavItem } from "@/lib/nav-data";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

async function ensureAdmin(req: NextRequest) {
  const admin = await getAdminSessionFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }
  return null;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await ensureAdmin(req);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const navItem = await updateNavItem(id, body);
    if (!navItem) {
      return NextResponse.json({ error: "导航项不存在" }, { status: 404 });
    }
    return NextResponse.json(navItem);
  } catch (error) {
    console.error("Error updating nav item:", error);
    return NextResponse.json({ error: "更新导航项失败" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await ensureAdmin(req);
  if (authError) return authError;

  try {
    const { id } = await params;
    await deleteNavItem(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting nav item:", error);
    return NextResponse.json({ error: "删除导航项失败" }, { status: 500 });
  }
}

