import { redirect } from "next/navigation";
import { Question, Answer } from "@/types";
import QuizUI from "@/ui/QuizUI";
import QuestionDisplay from "@/ui/QuestionDisplay";

import styles from "./quizPage.module.css";

interface QuestionPageProps {
  params: {
    quizId: string;
    questionId: string;
  };
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { quizId, questionId: currentQuestionIdString } = params;
  const currentQuestionId = parseInt(currentQuestionIdString, 10);

  const totalQuestions = 10;

  const fetchQuestion = async (qId: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/quizzes/${quizId}/questions/${qId}`,
        { cache: "no-store" }
      );
      if (!res.ok) {
        if (res.status === 404) {
          redirect(`/quizzes/${quizId}/error`);
        }
        throw new Error(
          `Échec de la récupération de la question (Statut: ${res.status}).`
        );
      }
      return res.json();
    } catch (error) {
      console.error("Erreur lors de la récupération de la question :", error);
      return null;
    }
  };

  const fetchAnswers = async (qId: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/quizzes/${quizId}/questions/${qId}/answers`,
        { cache: "no-store" }
      );
      if (!res.ok) {
        throw new Error(
          `Échec de la récupération des réponses (Statut: ${res.status}).`
        );
      }
      const data = await res.json();
      return data.answers || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des réponses :", error);
      return [];
    }
  };

  const [questionData, answersData] = await Promise.all([
    fetchQuestion(currentQuestionId),
    fetchAnswers(currentQuestionId),
  ]);

  if (!questionData) {
    redirect(`/quizzes/${quizId}/error`);
  }

  if (!answersData || !Array.isArray(answersData) || answersData.length === 0) {
    console.warn(
      `Aucune réponse valide trouvée pour la question ${currentQuestionId}.`
    );
  }

  const question: Question = questionData;
  const answers: Answer[] = answersData;

  const shuffledAnswers: Answer[] = [...answers].sort(
    () => Math.random() - 0.5
  );

  return (
    <div className={styles.container}>
      <QuizUI questionId={currentQuestionId} totalQuestions={totalQuestions} />
      <QuestionDisplay
        quizId={quizId}
        questionId={currentQuestionId}
        question={question}
        answers={shuffledAnswers}
      />
    </div>
  );
}
