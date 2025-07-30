"use client";

import { useState } from "react";
import styles from "./QuestionDisplay.module.css";
import { Question, Answer } from "@/types";
import { useQuiz } from "@/context/QuizContext";
import Countdown from "./Countdown";

interface QuestionDisplayProps {
  quizId: string;
  questionId: number;
  question: Question;
  answers: Answer[];
}

const QuestionDisplay = ({
  quizId,
  questionId,
  question,
  answers,
}: QuestionDisplayProps) => {
  const { answerQuestion } = useQuiz();
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);

  const answerLabels = ["A", "B", "C", "D"];

  const handleSelectAnswer = (answer: Answer) => {
    if (selectedAnswerId !== null) return;

    setSelectedAnswerId(answer.id);

    setTimeout(() => {
      answerQuestion(answer.is_correct);
    }, 1500);
  };

  const handleTimeUp = () => {
    if (selectedAnswerId === null) {
      setSelectedAnswerId(-1);
      answerQuestion(false);
    }
  };

  return (
    <>
      <div className={styles.backgroundImage}></div>

      <Countdown onTimeUp={handleTimeUp} keyTrigger={questionId} />

      <div className={styles.questionContainer}>
        <h2 className={styles.questionTitle}>{question.question}</h2>
      </div>

      <div className={styles.answersContainer}>
        {answers.map((answer, index) => (
          <div key={answer.id} className={styles.answerItem}>
            <span className={styles.answerLabel}>{answerLabels[index]}</span>
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
