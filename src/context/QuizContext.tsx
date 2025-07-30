"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface QuizContextType {
  lives: number;
  score: number;
  answerQuestion: (isCorrect: boolean) => void;
  currentQuestion: number;
  totalQuestions: number;
}

const QuizContext = createContext<QuizContextType | null>(null);

interface QuizProviderProps {
  children: ReactNode;
  quizId: string;
  totalQuestions: number;
}

export const QuizProvider = ({
  children,
  quizId,
  totalQuestions,
}: QuizProviderProps) => {
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const router = useRouter();

  const answerQuestion = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      setLives((prev) => prev - 1);
    }

    const updatedLives = isCorrect ? lives : lives - 1;
    const nextQuestion = currentQuestion + 1;

    if (updatedLives <= 0) {
      router.push(`/quizzes/${quizId}/game_over`);
      return;
    }

    if (nextQuestion >= totalQuestions) {
      router.push(`/quizzes/${quizId}/congratulation`);
    } else {
      setCurrentQuestion(nextQuestion);
      router.push(`/quizzes/${quizId}/questions/${nextQuestion + 1}`);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        lives,
        score,
        answerQuestion,
        currentQuestion,
        totalQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
