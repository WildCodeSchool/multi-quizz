"use client";

import React from "react";
import Image from "next/image";
import styles from "./LivesDisplay.module.css";
import { useQuiz } from "@/context/QuizContext";

const LivesDisplay = () => {
  const { lives } = useQuiz();

  const livesIcons = [];
  for (let i = 0; i < lives; i++) {
    livesIcons.push(
      <Image
        key={i}
        src="/Live.png"
        alt="Vie restante"
        width={30}
        height={30}
        className={styles.heartIcon}
      />
    );
  }

  return <div className={styles.livesContainer}>{livesIcons}</div>;
};

export default LivesDisplay;
