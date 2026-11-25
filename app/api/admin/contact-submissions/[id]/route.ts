import { NextResponse } from "next/server";

import { getCurrentAdminSession } from "@/lib/admin-auth";
import { markContactAsRead } from "@/lib/cms-data";

export async function PATCH(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await getCurrentAdminSession())) {
    return NextResponse.json({ error: "Not logged in or session expired" }, { status: 401 });
  }

  const { id } = await context.params;
  await markContactAsRead(id);
  return NextResponse.json({ success: true });
}
