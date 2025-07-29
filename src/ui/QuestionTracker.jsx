"use client";

import React from "react";
import styles from "./QuestionTracker.module.css";

const QuestionTracker = ({ currentQuestion, totalQuestions }) => {
  return (
    <div className={styles.trackerContainer}>
      <span className={styles.currentQuestion}>{currentQuestion}</span>
      <span className={styles.separator}>/</span>
      <span className={styles.totalQuestions}>{totalQuestions}</span>
    </div>
  );
};

export default QuestionTracker;
