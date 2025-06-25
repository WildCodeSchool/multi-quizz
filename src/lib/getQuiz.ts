import { quizMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { QuizModel } from "@/model/quizModel";

export async function getAllQuiz(): Promise<QuizModel[]> {
  const res = await fetch(apiRoutes.QUIZ, { method: "GET" });
  if (!res.ok) throw new Error(quizMessages.loadingErrorQuizzes);
  const data = await res.json();
  return data.quizzes.map((q: any) => new QuizModel(q.id, q.title, []));
}

export async function getQuizWithQuestions(id: number) {
  const res = await fetch(`${apiRoutes.QUIZ}/${id}`, { method: "GET" });
  if (!res.ok) throw new Error(quizMessages.loadingError);
  return await res.json();
}
