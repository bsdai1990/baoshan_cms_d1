import { NextResponse } from "next/server";

import { createContactSubmission } from "@/lib/cms-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    if (message.length > 2000) {
      return NextResponse.json({ error: "Message cannot exceed 2000 characters" }, { status: 400 });
    }

    await createContactSubmission({
      name: String(name).slice(0, 100),
      email: String(email).slice(0, 200),
      phone: phone ? String(phone).slice(0, 50) : null,
      company: company ? String(company).slice(0, 200) : null,
      message: String(message).slice(0, 2000),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json({ error: "Server error. Please try again later." }, { status: 500 });
  }
}
