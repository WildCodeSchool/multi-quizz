"use client";

import React from "react";
import QuestionTracker from "@/ui/QuestionTracker";
import LivesDisplay from "@/ui/LivesDisplay";
import ScoreDisplay from "@/ui/ScoreDisplay";
import styles from "./QuizUI.module.css";
import Countdown from "./Countdown";

interface QuizUIProps {
  questionId: number;
  totalQuestions: number;
}

const QuizUI = ({ questionId, totalQuestions }: QuizUIProps) => {
  return (
    <div className={styles.UIContainer}>
      <section className={styles.pv}>
        {" "}
        <LivesDisplay />
      </section>
      <section className={styles.tracker_ScoreDisplay}>
        <QuestionTracker
          currentQuestion={questionId}
          totalQuestions={totalQuestions}
        />
        <ScoreDisplay />
      </section>
    </div>
  );
};

export default QuizUI;
