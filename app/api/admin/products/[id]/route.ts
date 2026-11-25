import { NextResponse } from "next/server";

import { getCurrentAdminSession } from "@/lib/admin-auth";
import { deleteProduct, type ProductInput, updateProduct } from "@/lib/cms-data";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await getCurrentAdminSession())) {
    return NextResponse.json({ error: "Not logged in or session expired" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const payload = (await request.json()) as ProductInput;
    const product = await updateProduct(id, payload);
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update product";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await getCurrentAdminSession())) {
    return NextResponse.json({ error: "Not logged in or session expired" }, { status: 401 });
  }

  const { id } = await context.params;
  await deleteProduct(id);
  return NextResponse.json({ success: true });
}
