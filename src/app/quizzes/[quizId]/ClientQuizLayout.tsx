"use client";
import { use } from "react";
import { QuizProvider } from "@/context//QuizContext";

export default function ClientQuizLayout({
  paramsPromise,
  children,
}: {
  paramsPromise: Promise<{ quizId: string }>;
  children: React.ReactNode;
}) {
  const params = use(paramsPromise);
  const quizId = params.quizId;

  const totalQuestions = 10;

  return (
    <QuizProvider quizId={quizId} totalQuestions={totalQuestions}>
      <div>{children}</div>
    </QuizProvider>
  );
}
