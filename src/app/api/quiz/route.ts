import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { quizMessages } from "@/data/responseMessages";

export async function GET() {
  try {
    const [quizzes] = await db.query("SELECT id, title FROM Quizzes");

    return NextResponse.json({ quizzes });
  } catch (error) {
    console.error("Erreur MySQL (GET quizzes):", error);
    return NextResponse.json(
      { error: quizMessages.errorServer },
      { status: 500 }
    );
  }
}
