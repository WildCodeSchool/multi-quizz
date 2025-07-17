"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "./page.module.css";
import { Quiz, Question, Answer } from "@/types";

const QuestionPage = () => {
  const router = useRouter();
  const params = useParams();
  const quizId = params.quizId as string;
  const questionNumber = parseInt(params.questionNumber as string, 10);

  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const answerLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setSelectedAnswerId(null);

      if (!quizId || isNaN(questionNumber)) {
        setError("ID du quiz ou numéro de question invalide.");
        setLoading(false);
        return;
      }

      try {
        const [questionRes, answersRes] = await Promise.all([
          fetch(`/api/quizzes/${quizId}/questions/${questionNumber}`),
          fetch(`/api/quizzes/${quizId}/questions/${questionNumber}/answers`),
        ]);

        if (!questionRes.ok) {
          throw new Error(
            `Erreur lors de la récupération de la question (Statut: ${questionRes.status}).`
          );
        }
        if (!answersRes.ok) {
          throw new Error(
            `Erreur lors de la récupération des réponses (Statut: ${answersRes.status}).`
          );
        }

        const questionData: Question = await questionRes.json();
        const { answers: answersData }: { answers: Answer[] } =
          await answersRes.json();

        setQuestion(questionData);
        setAnswers(answersData);
      } catch (err: any) {
        console.error("Erreur lors du chargement des données :", err);
        setError(
          err.message ||
            "Une erreur inconnue est survenue lors du chargement des données."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quizId, questionNumber]);

  const handleSelectAnswer = (answer: Answer) => {
    if (selectedAnswerId !== null) return;
    setSelectedAnswerId(answer.id);

    setTimeout(() => {
      if (questionNumber < 10) {
        router.push(`/quizzes/${quizId}/questions/${questionNumber + 1}`);
      }
    }, 1500);
  };

  const getAnswerButtonClass = (answer: Answer): string => {
    const base = styles.answerButton;

    if (selectedAnswerId === null) return base;

    if (selectedAnswerId === answer.id) {
      return answer.is_correct
        ? `${base} ${styles.correct}`
        : `${base} ${styles.wrong}`;
    }

    return `${base} ${styles.disabled}`;
  };

  if (loading) return <p>Chargement du quiz...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!question) return <p>Question introuvable.</p>;

  return (
    <>
      <div className={styles.backgroundImage}></div>

      <div className={styles.questionContainer}>
        <h2 className={styles.questionTitle}>{question.question}</h2>
      </div>

      <div className={styles.answersContainer}>
        {answers.map((answer, index) => (
          <div key={answer.id} className={styles.answerItem}>
            {answerLabels[index] && (
              <span className={styles.answerLabel}>{answerLabels[index]}</span>
            )}
            <button
              className={getAnswerButtonClass(answer)}
              onClick={() => handleSelectAnswer(answer)}
              disabled={selectedAnswerId !== null}
            >
              {answer.answer}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default QuestionPage;
