import { notFound, redirect } from "next/navigation";
import { Question, Answer } from "@/types";
import styles from "./page.module.css";

interface QuestionPageProps {
  params: {
    quizId: string;
    questionNumber: string;
  };
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { quizId, questionNumber: questionNumberString } = params;
  const questionNumber = parseInt(questionNumberString, 10);

  if (!quizId || isNaN(questionNumber)) {
    notFound();
  }

  let question: Question | null = null;
  let answers: Answer[] = [];

  try {
    const [questionRes, answersRes] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/quizzes/${quizId}/questions/${questionNumber}`,
        { cache: "no-store" }
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/quizzes/${quizId}/questions/${questionNumber}/answers`,
        { cache: "no-store" }
      ),
    ]);

    if (!questionRes.ok || questionRes.status === 404) {
      redirect(`/quizzes/${quizId}/results`);
    }

    if (!answersRes.ok) {
      throw new Error(
        `Erreur lors de la récupération des réponses (Statut: ${answersRes.status}).`
      );
    }

    question = await questionRes.json();
    const { answers: answersData }: { answers: Answer[] } =
      await answersRes.json();
    answers = answersData;
  } catch (err: any) {
    console.error("Erreur lors du chargement des données côté serveur :", err);
    notFound();
  }

  const answerLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];

  return (
    <>
      <div className={styles.backgroundImage}></div>

      <div className={styles.questionContainer}>
        <h2 className={styles.questionTitle}>{question!.question}</h2>
      </div>

      <div className={styles.answersContainer}>
        {answers.map((answer, index) => (
          <div key={answer.id} className={styles.answerItem}>
            {answerLabels[index] && (
              <span className={styles.answerLabel}>{answerLabels[index]}</span>
            )}
            <button className={styles.answerButton}>{answer.answer}</button>
          </div>
        ))}
      </div>
    </>
  );
}
