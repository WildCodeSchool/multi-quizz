import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { quizMessages } from "@/data/responseMessages";
import { AnswerModel } from "@/model/AnswerModel";

export async function GET(
  _req: Request,
  { params }: { params: { quizId: string; questionNumber: string } }
) {
  const { quizId, questionNumber } = await params;
  console.log(quizId, questionNumber);
  const quizIdInt = parseInt(quizId, 10);
  const questionNumberInt = parseInt(questionNumber, 10);

  if (isNaN(quizIdInt) || isNaN(questionNumberInt)) {
    return NextResponse.json(
      { error: quizMessages.invalidQuizzId },
      { status: 400 }
    );
  }

  try {
    const [answerRows] = await db.query(
      "SELECT a.id, a.answer, a.is_correct FROM Answer AS a JOIN Questions AS q ON a.question_number = q.number WHERE q.quiz_id = ? AND a.question_number = ?",
      [quizIdInt, questionNumberInt]
    );

    const answers = Array.isArray(answerRows)
      ? (answerRows as AnswerModel[])
      : [];

    if (answers.length === 0) {
      return NextResponse.json(
        { error: quizMessages.notFoundQuestion },
        { status: 404 }
      );
    }

    return NextResponse.json({ answers });
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
