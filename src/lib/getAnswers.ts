import { apiRoutes } from "@/data/ROUTES";
import { AnswerModel } from "@/model/AnswerModel";
import { quizMessages } from "@/data/responseMessages";

export async function getAnswers(
  quizId: number,
  questionNumber: number
): Promise<AnswerModel[]> {
  const res = await fetch(apiRoutes.ANSWERS(quizId, questionNumber), {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(quizMessages.loadingErrorAnswers);
  }
  const data = await res.json();
  return data.answers.map(
    (a: AnswerModel) =>
      new AnswerModel(a.id, a.question_id, a.answer, a.is_correct)
  );
}
