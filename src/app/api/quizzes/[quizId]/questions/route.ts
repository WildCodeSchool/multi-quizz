import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { quizMessages } from "@/data/responseMessages";
import { QuestionModel } from "@/model/QuestionModel";

export async function GET(
  _req: Request,
  context: { params: { quizId: string } }
) {
  const { quizId } = await context.params;
  const quizIdInt = parseInt(quizId, 10);

  if (isNaN(quizIdInt)) {
    return NextResponse.json(
      { error: quizMessages.invalidQuizzId },
      { status: 400 }
    );
  }
  try {
    const [rows] = await db.query(
      "SELECT id, question, quiz_id, number FROM Questions WHERE quiz_id = ? ORDER BY number ASC LIMIT 1",
      [quizIdInt]
    );
    const questions = Array.isArray(rows) ? (rows as QuestionModel[]) : [];

    if (questions.length === 0) {
      return NextResponse.json(
        { error: quizMessages.notFoundQuestion },
        { status: 404 }
      );
    }
    return NextResponse.json({ question: questions[0] });
  } catch (error) {
    console.error(
      "Erreur MySQL (GET /api/quizzes/[quizId]/questions) :",
      error
    );
    return NextResponse.json(
      { error: quizMessages.errorServer },
      { status: 500 }
    );
  }
}
