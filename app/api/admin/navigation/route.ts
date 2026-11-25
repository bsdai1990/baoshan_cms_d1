import { NextRequest, NextResponse } from "next/server";
import { getNavItems, createNavItem } from "@/lib/nav-data";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

async function ensureAdmin(req: NextRequest) {
  const admin = await getAdminSessionFromRequest(req);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET(req: NextRequest) {
  const authError = await ensureAdmin(req);
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const visibleOnly = searchParams.get("visible_only") === "1";

  const navItems = await getNavItems({ visibleOnly });
  return NextResponse.json(navItems);
}

export async function POST(req: NextRequest) {
  const authError = await ensureAdmin(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const navItem = await createNavItem(body);
    return NextResponse.json(navItem, { status: 201 });
  } catch (error) {
    console.error("Error creating nav item:", error);
    return NextResponse.json({ error: "Failed to create navigation item" }, { status: 500 });
  }
}

