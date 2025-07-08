import { apiRoutes } from "@/data/ROUTES";
import { AnswerModel } from "@/model/AnswerModel";
import { quizMessages } from "@/data/responseMessages";

export async function getAnswers(): Promise<AnswerModel[]> {
  const res = await fetch(apiRoutes.ANSWERS, { method: "GET" });
  if (!res.ok) {
    throw new Error(quizMessages.loadingErrorAnswers);
  }
  const data = await res.json();
  return data.map(
    (a: AnswerModel) =>
      new AnswerModel(a.id, a.questionId, a.answer, a.is_correct)
  );
}
