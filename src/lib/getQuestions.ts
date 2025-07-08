import { apiRoutes } from "@/data/ROUTES";
import { QuestionModel } from "@/model/QuestionModel";
import { quizMessages } from "@/data/responseMessages";

export async function getQuestions(
  quizId: number,
  questionNumber: number
): Promise<QuestionModel[]> {
  const res = await fetch(apiRoutes.QUESTION(quizId, questionNumber), {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(quizMessages.loadingErrorQuestions);
  }
  const data = await res.json();
  return data.question.map(
    (q: QuestionModel) =>
      new QuestionModel(q.id, q.question, q.quiz_id, q.number)
  );
}
