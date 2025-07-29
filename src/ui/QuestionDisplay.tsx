"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./QuestionDisplay.module.css";
import { Question, Answer } from "@/types";

interface QuestionDisplayProps {
  quizId: string;
  questionNumber: number;
  question: Question;
  answers: Answer[];
}

const QuestionDisplay = ({
  quizId,
  questionNumber,
  question,
  answers,
}: QuestionDisplayProps) => {
  const router = useRouter();

  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);

  const totalQuestions = 10;
  const answerLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];

  const handleSelectAnswer = (answer: Answer) => {
    if (selectedAnswerId !== null) return;

    setSelectedAnswerId(answer.id);

    setTimeout(() => {
      const nextQuestionNumber = questionNumber + 1;

      if (nextQuestionNumber <= totalQuestions) {
        router.push(`/quizzes/${quizId}/questions/${nextQuestionNumber}`);
      }
    }, 1500);
  };

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
              className={`${styles.answerButton} ${
                selectedAnswerId !== null
                  ? selectedAnswerId === answer.id
                    ? answer.is_correct
                      ? styles.correct
                      : styles.wrong
                    : styles.disabled
                  : ""
              }`}
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

export default QuestionDisplay;
