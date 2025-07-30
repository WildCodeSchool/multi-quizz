"use client";

import React from "react";
import styles from "./ScoreDisplay.module.css";
import { useQuiz } from "@/context/QuizContext";

const ScoreDisplay = () => {
  const { score } = useQuiz();

  return <div className={styles.scoreContainer}> {score} pts</div>;
};

export default ScoreDisplay;
