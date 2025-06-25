import { getAllQuiz } from "@/lib/getQuiz";
import Link from "next/link";

export default async function QuizListPage() {
  const quizzes = await getAllQuiz();

  return (
    <div>
      <h1>Liste des quiz</h1>
      <ul>
        {quizzes.map((q) => (
          <li key={q.id}>
            <Link href={`/quiz/${q.id}`}>{q.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
