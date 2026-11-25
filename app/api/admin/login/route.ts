import { NextResponse } from "next/server";

import { createSessionToken, setAdminSessionCookie } from "@/lib/admin-auth";
import { verifyAdminCredentials } from "@/lib/cms-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (!email || !password) {
      return NextResponse.json({ error: "Please enter admin email and password" }, { status: 400 });
    }

    const admin = await verifyAdminCredentials(email, password);
    if (!admin) {
      return NextResponse.json({ error: "Incorrect email or password. Please try again." }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    const token = await createSessionToken(admin.email);
    setAdminSessionCookie(response, token);
    return response;
  } catch {
    return NextResponse.json({ error: "Login failed. Please try again later." }, { status: 500 });
  }
}
