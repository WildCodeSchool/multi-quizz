import { notFound, redirect } from "next/navigation";
import { Question, Answer } from "@/types";
import QuestionDisplay from "@/ui/QuestionDisplay";

interface QuestionPageProps {
  params: {
    quizId: string;
    questionNumber: string;
  };
}

const shuffleArray = (array: Answer[]): Answer[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

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

  const shuffledAnswers = shuffleArray(answers);

  return (
    <QuestionDisplay
      quizId={quizId}
      questionNumber={questionNumber}
      question={question!}
      answers={shuffledAnswers}
    />
  );
}
