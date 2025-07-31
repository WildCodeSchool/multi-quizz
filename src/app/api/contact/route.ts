import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { quizMessages } from "@/data/responseMessages";

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();
    if (!email || !message) {
      return NextResponse.json(
        { error: quizMessages.errorMailMessage },
        { status: 400 }
      );
    }
    await db.query("INSERT INTO contact (email, message) VALUES (?, ?)", [
      email,
      message,
    ]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur POST /api/contact :", err);
    return NextResponse.json(
      { error: quizMessages.errorServer },
      { status: 500 }
    );
  }
}
