import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { quizMessages } from "@/data/responseMessages";
import { QuestionModel } from "@/model/QuestionModel";

export async function GET(
  _req: Request,
  { params }: { params: { quizId: string; questionNumber: string } }
) {
  const quizId = parseInt(params.quizId, 10);
  const questionNumber = parseInt(params.questionNumber, 10);

  if (isNaN(quizId) || isNaN(questionNumber)) {
    return NextResponse.json(
      { error: quizMessages.invalidQuizzId },
      { status: 400 }
    );
  }

  try {
    const [rows] = await db.query(
      "SELECT id, question, quiz_id, number FROM Questions WHERE quiz_id = ? AND number = ?",
      [quizId, questionNumber]
    );
    const results = Array.isArray(rows) ? (rows as QuestionModel[]) : [];

    if (results.length === 0) {
      return NextResponse.json(
        { error: quizMessages.notFound },
        { status: 404 }
      );
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error(
      "Erreur MySQL (GET /api/quizzes/[quizId]/questions/[questionNumber]) :",
      error
    );
    return NextResponse.json(
      { error: quizMessages.errorServer },
      { status: 500 }
    );
  }
}
