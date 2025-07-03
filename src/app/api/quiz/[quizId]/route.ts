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
    "SELECT id, title, picture, slug FROM Quizzes WHERE id = ?",
    [quizId]
  );
  const quiz = quizRows[0];
  if (!quiz) {
    return NextResponse.json({ error: quizMessages.notFound }, { status: 404 });
  }

  return NextResponse.json({ quiz }, { status: 200 });
}
