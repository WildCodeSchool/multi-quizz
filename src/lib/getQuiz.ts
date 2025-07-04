import { quizMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { QuizListModel } from "@/model/QuizListModel";

export async function getAllQuiz(): Promise<QuizListModel[]> {
  const res = await fetch(apiRoutes.QUIZ, { method: "GET" });
  if (!res.ok) throw new Error(quizMessages.loadingErrorQuizzes);
  const data = await res.json();
  return data.quizzes.map(
    (q: any) => new QuizListModel(q.id, q.title, q.picture, q.slug)
  );
}
