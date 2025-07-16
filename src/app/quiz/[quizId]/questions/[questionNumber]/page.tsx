"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface QuestionData {
  id: number;
  question: string;
  quiz_id: number;
  number: number;
}

interface AnswerData {
  id: number;
  answer: string;
  is_correct: boolean;
}

const QuestionPage = () => {
  const router = useRouter();
  const params = useParams();
  const quizId = params.quizId as string;
  const questionNumber = params.questionNumber as string;

  const [question, setQuestion] = useState<QuestionData | null>(null);
  const [answers, setAnswers] = useState<AnswerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      setIsLoading(true);
      setError(null);

      if (!quizId || !questionNumber) {
        setIsLoading(false);
        return;
      }

      try {
        const questionApiUrl = `/api/quizzes/${quizId}/questions/${questionNumber}`;
        const questionRes = await fetch(questionApiUrl);

        if (!questionRes.ok) {
          throw new Error(
            `Erreur lors de la récupération de la question: ${questionRes.statusText}`
          );
        }
        const questionData: QuestionData = await questionRes.json();
        setQuestion(questionData);

        const answersApiUrl = `/api/quizzes/${quizId}/questions/${questionNumber}/answers`;
        const answersRes = await fetch(answersApiUrl);

        if (!answersRes.ok) {
          throw new Error(
            `Erreur lors de la récupération des réponses: ${answersRes.statusText}`
          );
        }
        const answersData: { answers: AnswerData[] } = await answersRes.json();
        setAnswers(answersData.answers);
      } catch (err: any) {
        console.error("Erreur complète lors du fetch:", err);
        setError(err.message || "Une erreur inconnue est survenue.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestionAndAnswers();
  }, [quizId, questionNumber]);

  if (isLoading) {
    return (
      <div>
        <p>Chargement de la question et des réponses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Erreur: {error}</p>
        <p>Impossible de charger la question. Veuillez réessayer plus tard.</p>
      </div>
    );
  }

  if (!question) {
    return (
      <div>
        <p>Question non trouvée pour ce quiz et ce numéro.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>{question.question}</h2>

      <div>
        {answers.length > 0 ? (
          <ul>
            {answers.map((answer) => (
              <li key={answer.id}>{answer.answer}</li>
            ))}
          </ul>
        ) : (
          <p>Aucune option de réponse trouvée pour cette question.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
