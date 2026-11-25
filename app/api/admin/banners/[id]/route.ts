import { NextResponse } from "next/server";

import { getCurrentAdminSession } from "@/lib/admin-auth";
import { deleteBanner, type BannerInput, updateBanner } from "@/lib/cms-data";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await getCurrentAdminSession())) {
    return NextResponse.json({ error: "Not logged in or session expired" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const payload = (await request.json()) as BannerInput;
    const banner = await updateBanner(id, payload);
    return NextResponse.json({ success: true, data: banner });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update banner";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await getCurrentAdminSession())) {
    return NextResponse.json({ error: "Not logged in or session expired" }, { status: 401 });
  }

  const { id } = await context.params;
  await deleteBanner(id);
  return NextResponse.json({ success: true });
}
