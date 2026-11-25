import { NextResponse } from "next/server";

import { getCurrentAdminSession } from "@/lib/admin-auth";
import { createArticle, type ArticleInput } from "@/lib/cms-data";

export async function POST(request: Request) {
  if (!(await getCurrentAdminSession())) {
    return NextResponse.json({ error: "Not logged in or session expired" }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as ArticleInput;
    const article = await createArticle(payload);
    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save article";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
