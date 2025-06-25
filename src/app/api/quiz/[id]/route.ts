import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { quizMessages } from "@/data/responseMessages";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const quizId = Number(params.id);
  if (isNaN(quizId)) {
    return NextResponse.json(
      { error: quizMessages.invalidQuizzId },
      { status: 400 }
    );
  }

  const [quizRows]: any[] = await db.query(
    "SELECT id, title FROM Quizzes WHERE id = ?",
    [quizId]
  );
  const quiz = quizRows[0];
  if (!quiz) {
    return NextResponse.json({ error: quizMessages.notFound }, { status: 404 });
  }

  const [questionsRows]: any[] = await db.query(
    "SELECT id, question FROM Questions WHERE quiz_id = ?",
    [quizId]
  );

  const questionsWithAnswers = await Promise.all(
    questionsRows.map(async (q: any) => {
      const [answersRows]: any[] = await db.query(
        "SELECT id, answer, is_correct FROM answer WHERE question_id = ?",
        [q.id]
      );
      return {
        id: q.id,
        question: q.question,
        answers: answersRows,
      };
    })
  );

  return NextResponse.json({
    id: quiz.id,
    title: quiz.title,
    questions: questionsWithAnswers,
  });
}
