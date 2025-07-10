import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { quizMessages } from "@/data/responseMessages";
import { AnswerModel } from "@/model/AnswerModel";
import { QuestionModel } from "@/model/QuestionModel";

export async function GET(
  _req: Request,
  { params }: { params: { quizId: string; questionNumber: string } }
) {
  const { quizId, questionNumber } = await params;
  const quizIdInt = parseInt(quizId, 10);
  const questionNumberInt = parseInt(questionNumber, 10);

  if (isNaN(quizIdInt) || isNaN(questionNumberInt)) {
    return NextResponse.json(
      { error: quizMessages.invalidQuizzId },
      { status: 400 }
    );
  }

  try {
    const [rows] = await db.query(
      "SELECT id, question, quiz_id, number FROM Questions WHERE quiz_id = ? AND number = ?",
      [quizIdInt, questionNumberInt]
    );
    const results = Array.isArray(rows) ? (rows as QuestionModel[]) : [];

    if (results.length === 0) {
      return NextResponse.json(
        { error: quizMessages.notFound },
        { status: 404 }
      );
    }

    const question = results[0];

    const [answerRows] = await db.query(
      "SELECT id, answer, is_correct, question_id FROM Answer WHERE question_id = ?",
      [question.id]
    );
    const answers = Array.isArray(answerRows)
      ? (answerRows as AnswerModel[])
      : [];

    return NextResponse.json({ question, answers });
  } catch (error) {
    console.error(
      "Error fetching question and answers(GET /api/quizzes/[quizId]/questions/[questionNumber]/answers) :",
      error
    );
    return NextResponse.json(
      { error: quizMessages.notFoundAnswer },
      { status: 500 }
    );
  }
}
