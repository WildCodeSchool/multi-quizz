import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { quizMessages } from "@/data/responseMessages";

export async function GET() {
  try {
    const [questions] = await db.query(
      "SELECT id, question, quiz_id FROM Questions"
    );

    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { message: quizMessages.errorServer },
      { status: 500 }
    );
  }
}
