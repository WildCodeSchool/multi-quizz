"use client";
import styles from "./Countdown.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";

const Countdown = () => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <div className={styles.timerContainer}>
      <div className={styles.Timer}>{seconds}</div>
      <div>
        <Image
          src="/hourglass.png"
          alt="logo hourglass"
          width={140}
          height={140}
          className={styles.hourglassImage}
        />
      </div>
    </div>
  );
};

export default Countdown;
