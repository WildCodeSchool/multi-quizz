import { getQuizWithQuestions } from "@/lib/getQuiz";

export default async function QuizPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return <div>Quiz invalide</div>;

  const quiz = await getQuizWithQuestions(id);

  return (
    <div>
      <h1>{quiz.title}</h1>
      {quiz.questions.map((q: any) => (
        <div key={q.id}>
          <h2>{q.question}</h2>
          <ul>
            {q.answers.map((a: any) => (
              <li key={a.id}>{a.answer}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
