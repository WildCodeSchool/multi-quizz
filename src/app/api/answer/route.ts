import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { quizMessages } from "@/data/responseMessages";

export async function GET() {
  try {
    const [answers] = await db.query(
      "SELECT id, answer, is_correct, question_id FROM Answer"
    );
    return NextResponse.json(answers);
  } catch (error) {
    console.error("Error fetching answers:", error);
    return NextResponse.json(
      { message: quizMessages.errorServer },
      { status: 500 }
    );
  }
}
