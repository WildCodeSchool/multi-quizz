import { quizMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { QuizModel } from "@/model/QuizModel";

export async function getAllQuizzes(): Promise<QuizModel[]> {
  const res = await fetch(apiRoutes.QUIZ, { method: "GET" });
  if (!res.ok) throw new Error(quizMessages.loadingErrorQuizzes);
  const data = await res.json();
  return data.quizzes.map(
    (q: QuizModel) => new QuizModel(q.id, q.title, q.picture, q.slug)
  );
}
