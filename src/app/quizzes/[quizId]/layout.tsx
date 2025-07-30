"use client";

import { ReactNode, use } from "react";
import { QuizProvider } from "@/context/QuizContext";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ quizId: string }>;
}

export default function QuizLayout({ children, params }: LayoutProps) {
  const { quizId } = use(params);

  const totalQuestions = 10;

  return (
    <QuizProvider quizId={quizId} totalQuestions={totalQuestions}>
      {children}
    </QuizProvider>
  );
}
