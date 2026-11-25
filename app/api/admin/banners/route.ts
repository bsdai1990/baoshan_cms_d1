import { NextResponse } from "next/server";

import { getCurrentAdminSession } from "@/lib/admin-auth";
import { createBanner, type BannerInput } from "@/lib/cms-data";

export async function POST(request: Request) {
  if (!(await getCurrentAdminSession())) {
    return NextResponse.json({ error: "Not logged in or session expired" }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as BannerInput;
    const banner = await createBanner(payload);
    return NextResponse.json({ success: true, data: banner });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save banner";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
